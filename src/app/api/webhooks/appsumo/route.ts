import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import crypto from 'crypto'
import type { AppSumoWebhookEvent } from '@/types/appsumo'

const APPSUMO_WEBHOOK_SECRET = process.env.APPSUMO_WEBHOOK_SECRET

export async function POST(req: Request) {
  try {
    const headersList = headers()
    const signature = headersList.get('X-AppSumo-Signature')
    const body = await req.text() // Get raw body for signature verification

    if (!signature || !APPSUMO_WEBHOOK_SECRET) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    // Verify webhook signature
    const hmac = crypto.createHmac('sha256', APPSUMO_WEBHOOK_SECRET)
    hmac.update(body)
    const calculatedSignature = hmac.digest('hex')

    if (calculatedSignature !== signature) {
      return new NextResponse('Invalid signature', { status: 401 })
    }

    const event = JSON.parse(body) as AppSumoWebhookEvent
    const payload = await getPayload({ config })

    const { event_type, license_id, activation_code, tier } = event

    // Find user by AppSumo license ID
    const users = await payload.find({
      collection: 'users',
      where: {
        'subscription.appsumoLicenseId': {
          equals: license_id,
        },
      },
    })

    const user = users.docs[0]
    if (!user) {
      return new NextResponse('User not found', { status: 404 })
    }

    // Get current subscription data to preserve other fields
    const currentSubscription = user.subscription || {}

    switch (event_type) {
      case 'activate':
        await payload.update({
          collection: 'users',
          id: user.id,
          data: {
            subscription: {
              ...currentSubscription,
              status: 'active',
              plan: 'appsumo_lifetime',
              appsumoLicenseId: license_id,
              appsumoActivationCode: activation_code,
              appsumoTier: tier,
              appsumoActivatedAt: new Date().toISOString(),
              appsumoWebhookData: event,
            },
          },
        })
        break

      case 'deactivate':
        await payload.update({
          collection: 'users',
          id: user.id,
          data: {
            subscription: {
              ...currentSubscription,
              status: 'canceled',
              appsumoWebhookData: event,
            },
          },
        })
        break

      case 'upgrade':
      case 'downgrade':
        await payload.update({
          collection: 'users',
          id: user.id,
          data: {
            subscription: {
              ...currentSubscription,
              appsumoTier: tier,
              appsumoWebhookData: event,
            },
          },
        })
        break

      default:
        console.log('Unhandled AppSumo event type:', event_type)
    }

    return new NextResponse(null, { status: 200 })
  } catch (error) {
    console.error('AppSumo webhook error:', error)
    return new NextResponse('Webhook handler failed', { status: 500 })
  }
}
