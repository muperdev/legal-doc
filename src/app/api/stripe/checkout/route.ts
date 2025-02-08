import { NextRequest, NextResponse } from 'next/server'
import { getTokenFromRequest } from '@/lib/auth.server'
import { currentUser } from '@/lib/auth'
import { updateUserStripeId } from '@/lib/stripe'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia',
})

// Ensure URL has proper scheme
function getBaseUrl() {
  const url = process.env.NEXT_PUBLIC_SERVER_URL || ''
  if (url.startsWith('http')) {
    return url
  }
  return `https://${url}`
}

export async function POST(req: Request) {
  try {
    // Get the token from the request
    const token = getTokenFromRequest(req as NextRequest)
    if (!token) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    // Get the current user
    const user = await currentUser({ appliedToken: token })
    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    // Get the price ID from the URL
    const { searchParams } = new URL(req.url)
    const priceId = searchParams.get('priceId')
    if (!priceId) {
      return new NextResponse('Price ID is required', { status: 400 })
    }

    // If user doesn't have a Stripe customer ID, create one
    let customerId = user.subscription?.stripeCustomerId
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: `${user.firstName} ${user.lastName}`,
        metadata: {
          userId: user.id,
        },
      })
      customerId = customer.id

      // Update user with new Stripe customer ID
      await updateUserStripeId(user.id.toString(), customerId)
    }

    // Create a checkout session
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
      success_url: `https://gimmedoc.com/dashboard/subscription?success=true`,
      cancel_url: `https://gimmedoc.com/dashboard/subscription?canceled=true`,
      allow_promotion_codes: true,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    if (error instanceof Error) {
      return new NextResponse(error.message, { status: 400 })
    }
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
