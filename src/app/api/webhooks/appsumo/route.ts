import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { AppSumoWebhookEvent } from '@/types/appsumo'

export async function POST(req: Request) {
  try {
    const body = await req.text()
    const event = JSON.parse(body)

    // Handle test webhook
    if (event.test === true) {
      return NextResponse.json({
        success: true,
        event: event.event || 'test',
      })
    }

    // Handle regular webhook
    const payload = await getPayload({ config })
    const { event_type, license_id, license_key, prev_license_key, tier, email } =
      event as AppSumoWebhookEvent

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
                appsumoLicenseKey: license_key,
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

    return NextResponse.json({
      success: true,
      event: event_type,
    })
  } catch (error) {
    console.error('AppSumo webhook error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Webhook handler failed',
      },
      { status: 500 },
    )
  }
}
