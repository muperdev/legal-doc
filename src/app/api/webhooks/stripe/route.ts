'use server'

import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getPayload } from 'payload'
import config from '@payload-config'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
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

  console.log(`✅ Received webhook event: ${event.type}`)

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const subscription = await stripe.subscriptions.retrieve(session.subscription as string)

        await updateUserSubscription(session.metadata?.userId || session.client_reference_id!, {
          stripeSubscriptionId: subscription.id,
          stripePriceId: subscription.items.data[0].price.id,
          stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
          status: subscription.status as SubscriptionStatus,
        })
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
          )
          console.log(`✅ Updated subscription renewal for user ${subscription.metadata?.userId}`)
        }
        break
      }

      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        console.log(`🔄 Processing subscription update/deletion: ${subscription.id}`)
        await updateUserSubscription(
          subscription.metadata?.userId || (subscription.customer as string),
          {
            stripePriceId: subscription.items.data[0].price.id,
            stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
            status: subscription.status as SubscriptionStatus,
          },
        )
        console.log(`✅ Updated subscription status for user ${subscription.metadata?.userId}`)
        break
      }

      default:
        console.log(`⚠️ Unhandled event type: ${event.type}`)
    }

    return new NextResponse(null, { status: 200 })
  } catch (error) {
    console.error('❌ Stripe webhook error:', error)
    return new NextResponse('Webhook handler failed', { status: 500 })
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
) {
  console.log(`🔵 Updating subscription for user ${userId}:`, subscription)

  try {
    await payload.update({
      collection: 'users',
      id: userId,
      data: {
        subscription: {
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
