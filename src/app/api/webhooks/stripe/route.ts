'use server'

import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getPayload } from 'payload'
import config from '@payload-config'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
})

const payload = await getPayload({
  config: config,
})

type SubscriptionStatus =
  | 'active'
  | 'canceled'
  | 'incomplete'
  | 'incomplete_expired'
  | 'past_due'
  | 'trialing'
  | 'inactive'

async function findUserByStripeCustomerId(customerId: string) {
  try {
    const users = await payload.find({
      collection: 'users',
      where: {
        'subscription.stripeCustomerId': {
          equals: customerId,
        },
      },
      limit: 1,
    })

    return users.docs[0]?.id?.toString()
  } catch (error) {
    console.error('Failed to find user by Stripe customer ID:', error)
    return null
  }
}

async function updateUserSubscription(
  userId: string,
  subscription: {
    stripeSubscriptionId?: string
    stripePriceId: string
    stripeCurrentPeriodEnd: Date
    status: SubscriptionStatus
  },
  stripeCustomerId?: string,
) {
  console.log(`🔵 Attempting to update subscription for user ${userId}`)

  try {
    // If the userId looks like a Stripe customer ID (starts with 'cus_'), try to find the actual user
    if (userId.startsWith('cus_')) {
      const actualUserId = await findUserByStripeCustomerId(userId)
      if (!actualUserId) {
        throw new Error(`No user found with Stripe customer ID: ${userId}`)
      }
      userId = actualUserId
    }

    await payload.update({
      collection: 'users',
      id: userId,
      data: {
        subscription: {
          stripeCustomerId: stripeCustomerId, // Store the Stripe customer ID if provided
          stripeSubscriptionId: subscription.stripeSubscriptionId,
          stripePriceId: subscription.stripePriceId,
          stripeCurrentPeriodEnd: subscription.stripeCurrentPeriodEnd.toISOString(),
          status: subscription.status,
        },
      },
    })
    console.log(`✅ Successfully updated subscription for user ${userId}`)
  } catch (error) {
    console.error(`❌ Failed to update subscription for user ${userId}:`, error)
    throw error
  }
}

export async function POST(req: Request) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  if (!sig) {
    return new NextResponse('No signature found', { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err: any) {
    console.error('❌ Webhook signature verification failed:', err.message)
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 })
  }

  console.log(`✅ Processing webhook event: ${event.type} [${event.id}]`)
  console.log('Event data:', JSON.stringify(event.data.object, null, 2))

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        console.log('Processing checkout session:', session.id)
        const subscription = await stripe.subscriptions.retrieve(session.subscription as string)

        await updateUserSubscription(
          session.metadata?.userId || session.client_reference_id!,
          {
            stripeSubscriptionId: subscription.id,
            stripePriceId: subscription.items.data[0].price.id,
            stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
            status: subscription.status as SubscriptionStatus,
          },
          session.customer as string,
        )
        break
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice
        if (invoice.billing_reason === 'subscription_cycle') {
          console.log(`🔄 Processing subscription renewal: ${invoice.subscription}`)
          const subscription = await stripe.subscriptions.retrieve(invoice.subscription as string)

          await updateUserSubscription(
            subscription.metadata?.userId || (invoice.customer as string),
            {
              stripePriceId: subscription.items.data[0].price.id,
              stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
              status: 'active',
            },
            invoice.customer as string,
          )
          console.log(`✅ Updated subscription renewal for user ${subscription.metadata?.userId}`)
        }
        break
      }

      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        console.log(`🔄 Processing subscription update/deletion: ${subscription.id}`)

        if (!subscription.customer) {
          throw new Error('No customer ID found in subscription')
        }

        const customerId =
          typeof subscription.customer === 'string'
            ? subscription.customer
            : subscription.customer.id

        await updateUserSubscription(
          subscription.metadata?.userId || customerId,
          {
            stripePriceId: subscription.items.data[0].price.id,
            stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
            status: subscription.status as SubscriptionStatus,
          },
          customerId,
        )
        break
      }

      default:
        console.log(`⚠️ Unhandled event type: ${event.type}`)
    }

    return new NextResponse(null, { status: 200 })
  } catch (error) {
    console.error('❌ Webhook processing error:', error)
    console.error('Event type:', event.type)
    console.error('Event ID:', event.id)
    if (error instanceof Error && error.message.includes('No user found with Stripe customer ID')) {
      // Log the error but return 200 to acknowledge receipt of the webhook
      // This prevents Stripe from retrying webhooks for users we can't find
      return new NextResponse(null, { status: 200 })
    }
    return new NextResponse(
      `Webhook Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      { status: 500 },
    )
  }
}
