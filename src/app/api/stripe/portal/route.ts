import { NextRequest, NextResponse } from 'next/server'
import { getTokenFromRequest } from '@/lib/auth.server'
import { currentUser } from '@/lib/auth'
import { updateUserStripeId } from '@/lib/stripe'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia',
})

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

    // Create a billing portal session
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `https://gimmedoc.com/dashboard/subscription`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Error creating portal session:', error)
    if (error instanceof Error) {
      return new NextResponse(error.message, { status: 400 })
    }
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
