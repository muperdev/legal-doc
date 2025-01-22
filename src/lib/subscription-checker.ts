import { User } from '@/payload-types'

export function isSubscribed(user: User): boolean {
  if (!user.subscription) return false

  const { status, plan } = user.subscription

  // Check if user has an active subscription
  if (status === 'active' || status === 'trialing') {
    return true
  }

  // Check if user has AppSumo lifetime plan
  if (plan === 'appsumo_lifetime' && user.subscription.appsumoLicenseKey) {
    return true
  }

  return false
}
