import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getPayload } from 'payload'
import config from '@payload-config'
import { currentUser } from '@/lib/auth'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia',
})

const payload = await getPayload({
  config: config,
})

export async function POST(req: Request) {
  try {
    const token = req.headers.get('authorization')?.split('Bearer ')[1]

    if (!token) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const user = await currentUser({ appliedToken: token })
    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    // Create or retrieve the Stripe customer
    let customerId = user.subscription?.stripeCustomerId

    // Verify if the customer exists in Stripe
    let customerExists = false
    if (customerId) {
      try {
        await stripe.customers.retrieve(customerId)
        customerExists = true
      } catch (error) {
        customerExists = false
      }
    }

    // Create new customer if doesn't exist or not found in Stripe
    if (!customerId || !customerExists) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          userId: user.id,
        },
      })
      customerId = customer.id

      // Update user with new Stripe customer ID
      await payload.update({
        collection: 'users',
        id: user.id,
        data: {
          subscription: {
            stripeCustomerId: customerId,
          },
        },
      })
    }

    const { searchParams } = new URL(req.url)
    const priceId = searchParams.get('priceId')

    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL?.startsWith('http')
      ? process.env.NEXT_PUBLIC_SERVER_URL
      : `https://${process.env.NEXT_PUBLIC_SERVER_URL}`

    if (priceId) {
      // Create Checkout session for subscription
      const session = await stripe.checkout.sessions.create({
        customer: customerId,
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        success_url: `${baseUrl}/dashboard/subscription/status?success=true`,
        cancel_url: `${baseUrl}/dashboard/subscription/status?canceled=true`,
        client_reference_id: user.id.toString(),
        metadata: {
          userId: user.id,
        },
      })

      return NextResponse.json({ url: session.url })
    } else {
      // Create Customer Portal session for subscription management
      const session = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: `${baseUrl}/dashboard`,
      })

      return NextResponse.json({ url: session.url })
    }
  } catch (error) {
    console.error('Stripe API Error:', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
