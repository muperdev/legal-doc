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
  try {
    const body = await req.json()
    const event = body as any
    const session = event.object
    console.log(`✅ Received webhook event: ${event.type}`)

    switch (event.type) {
      case 'checkout.session.completed':
        const subscription = await stripe.subscriptions.retrieve(session.subscription)

        await updateUserSubscription(session.metadata.userId || session.client_reference_id, {
          stripeSubscriptionId: subscription.id,
          stripePriceId: subscription.items.data[0].price.id,
          stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
          status: subscription.status as SubscriptionStatus,
        })
        break

      case 'invoice.payment_succeeded':
        if (session.billing_reason === 'subscription_cycle') {
          console.log(`🔄 Processing subscription renewal: ${session.subscription}`)
          const subscription = await stripe.subscriptions.retrieve(session.subscription)

          await updateUserSubscription(
            subscription.metadata.userId || session.client_reference_id,
            {
              stripePriceId: subscription.items.data[0].price.id,
              stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
              status: 'active',
            },
          )
          console.log(`✅ Updated subscription renewal for user ${subscription.metadata.userId}`)
        }
        break

      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
        console.log(`🔄 Processing subscription update/deletion: ${session.id}`)
        await updateUserSubscription(session.metadata.userId || session.client_reference_id, {
          stripePriceId: session.items.data[0].price.id,
          stripeCurrentPeriodEnd: new Date(session.current_period_end * 1000),
          status: session.status as SubscriptionStatus,
        })
        console.log(`✅ Updated subscription status for user ${session.metadata.userId}`)
        break

      default:
        console.log(`⚠️ Unhandled event type: ${session.type}`)
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
