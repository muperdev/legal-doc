import { getPayload } from 'payload'
import config from '@payload-config'

export async function updateUserStripeId(userId: string, stripeCustomerId: string): Promise<void> {
  try {
    const payload = await getPayload({ config })

    await payload.update({
      collection: 'users',
      id: userId,
      data: {
        subscription: {
          stripeCustomerId,
        },
      },
    })
  } catch (error) {
    console.error('Error updating user Stripe ID:', error)
    throw error
  }
}
