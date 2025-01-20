import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: Request) {
  const headersList = await headers()
  const body = await req.text()
  const signature = headersList.get('Stripe-Signature')

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature!, webhookSecret)
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 })
  }

  const session = event.data.object as any

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        const subscription = await stripe.subscriptions.retrieve(session.subscription)

        await updateUserSubscription(session.metadata.userId, {
          stripeSubscriptionId: subscription.id,
          stripePriceId: subscription.items.data[0].price.id,
          stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
          status: subscription.status,
        })
        break

      case 'invoice.payment_succeeded':
        if (session.billing_reason === 'subscription_cycle') {
          const subscription = await stripe.subscriptions.retrieve(session.subscription)

          await updateUserSubscription(subscription.metadata.userId, {
            stripePriceId: subscription.items.data[0].price.id,
            stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
            status: subscription.status,
          })
        }
        break

      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
        await updateUserSubscription(session.metadata.userId, {
          stripePriceId: session.items.data[0].price.id,
          stripeCurrentPeriodEnd: new Date(session.current_period_end * 1000),
          status: session.status,
        })
        break
    }

    return new NextResponse(null, { status: 200 })
  } catch (error) {
    console.error('Stripe webhook error:', error)
    return new NextResponse('Webhook handler failed', { status: 500 })
  }
}

async function updateUserSubscription(
  userId: string,
  subscription: {
    stripeSubscriptionId?: string
    stripePriceId: string
    stripeCurrentPeriodEnd: Date
    status: string
  },
) {
  await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${userId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      subscription: {
        ...subscription,
      },
    }),
  })
}
