import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import crypto from 'crypto'
import type { AppSumoWebhookEvent } from '@/types/appsumo'

const APPSUMO_WEBHOOK_SECRET = process.env.APPSUMO_WEBHOOK_SECRET

export async function POST(req: Request) {
  try {
    const headersList = await headers()
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

    // Handle test webhook events
    if (event.test === true) {
      return new NextResponse(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const payload = await getPayload({ config })
    const { event_type, license_id, license_key, prev_license_key, tier, email } = event

    // Find user by current or previous license key
    const users = await payload.find({
      collection: 'users',
      where: {
        or: [
          {
            'subscription.appsumoLicenseId': {
              equals: license_id,
            },
          },
          {
            'subscription.appsumoLicenseKey': {
              equals: prev_license_key,
            },
          },
        ],
      },
    })

    let user = users.docs[0]
    const currentSubscription = user?.subscription || {}

    switch (event_type) {
      case 'purchase':
      case 'activate':
        // For purchase events, create a placeholder account if user doesn't exist
        if (!user && event_type === 'purchase') {
          const result = await payload.create({
            collection: 'users',
            data: {
              email: email || `placeholder-${license_id}@appsumo.user`,
              firstName: 'AppSumo',
              lastName: 'User',
              role: 'user',
              subscription: {
                status: 'inactive',
                plan: 'appsumo_lifetime',
                appsumoLicenseId: license_id,
                appsumoLicenseKey: license_key,
                appsumoTier: tier,
                appsumoWebhookData: JSON.stringify(event),
              },
            },
          })
          user = result
        } else if (user) {
          // Update existing user
          await payload.update({
            collection: 'users',
            id: user.id,
            data: {
              subscription: {
                ...currentSubscription,
                status: 'active',
                plan: 'appsumo_lifetime',
                appsumoLicenseId: license_id,
                appsumoLicenseKey: license_key,
                appsumoTier: tier,
                appsumoActivatedAt: new Date().toISOString(),
                appsumoWebhookData: JSON.stringify(event),
              },
            },
          })
        }
        break

      case 'deactivate':
        if (user) {
          await payload.update({
            collection: 'users',
            id: user.id,
            data: {
              subscription: {
                ...currentSubscription,
                status: 'canceled',
                appsumoWebhookData: JSON.stringify(event),
              },
            },
          })
        }
        break

      case 'upgrade':
      case 'downgrade':
        if (user) {
          await payload.update({
            collection: 'users',
            id: user.id,
            data: {
              subscription: {
                ...currentSubscription,
                appsumoLicenseKey: license_key, // Update to new license key
                appsumoTier: tier,
                appsumoWebhookData: JSON.stringify(event),
              },
            },
          })
        }
        break

      default:
        console.log('Unhandled AppSumo event type:', event_type)
    }

    // Return success response
    return new NextResponse(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('AppSumo webhook error:', error)
    return new NextResponse(JSON.stringify({ success: false, error: 'Webhook handler failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
