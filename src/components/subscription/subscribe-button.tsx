'use client'

import { useState } from 'react'
import { AnimatedButton } from '@/components/ui/animated-button'
import { CreditCard } from 'lucide-react'
import { cn } from '@/lib/utils'
import { usePathname, useRouter } from 'next/navigation'

export type SubscriptionStatusTypes =
  | 'active'
  | 'canceled'
  | 'past_due'
  | 'trialing'
  | 'incomplete'
  | 'incomplete_expired'
  | null

interface SubscribeButtonProps {
  isManageSubscription?: boolean
  plan?: 'monthly' | 'yearly'
  userSubscriptionStatus?: SubscriptionStatusTypes
  fullWidth?: boolean
  token?: string | null
}

// Live mode price IDs
const STRIPE_PRICES = {
  monthly: 'price_1QijDuGEdf9C6VIlUuqNCPgk',
  yearly: 'price_1QijDuGEdf9C6VIlt9usUfwH',
}

// Test mode price IDs
// const STRIPE_PRICES = {
//   monthly: 'price_1QjQah4MPi0gofik6s2Gb3Rm',
//   yearly: 'price_1QjQb44MPi0gofik5WXjsEef',
// }

export function SubscribeButton({
  isManageSubscription,
  plan = 'monthly',
  userSubscriptionStatus,
  fullWidth = false,
  token,
}: SubscribeButtonProps) {
  const [loading, setLoading] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const handleSubscription = async () => {
    try {
      setLoading(true)

      if (!token) {
        router.push('/login')
        return
      }
      // Handle different subscription states
      if (userSubscriptionStatus === 'active') {
        router.push('/dashboard')
        return
      }

      // Go to customer portal for past_due
      if (isManageSubscription || userSubscriptionStatus === 'past_due') {
        const response = await fetch('/api/stripe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : '',
          },
        })
        const data = await response.json()
        if (data.url) {
          window.location.href = data.url
        }
        return
      }

      // For all other cases (incomplete, canceled, incomplete_expired, trialing, or no subscription)
      // proceed to checkout
      const response = await fetch(`/api/stripe?priceId=${STRIPE_PRICES[plan]}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
      })

      const data = await response.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  // Get button text based on subscription status
  const getButtonText = () => {
    if (loading) return 'Loading...'

    if (isManageSubscription) return 'Subscription'

    switch (userSubscriptionStatus) {
      case 'active':
        return 'Go to Dashboard'
      case 'past_due':
        return 'Update Payment Method'
      case 'incomplete':
      case 'incomplete_expired':
        return 'Go Pro Now ⚡️'
      case 'canceled':
        return 'Reactivate Subscription ⚡️'
      default:
        return `Go Pro ${plan === 'yearly' ? 'Yearly' : 'Monthly'} ⚡️`
    }
  }

  if (isManageSubscription) {
    return (
      <button
        onClick={handleSubscription}
        className={cn(
          'flex w-full items-center gap-x-4 text-base font-medium py-2 px-4 transition-all duration-200',
          pathname === '/dashboard/subscription'
            ? 'text-black bg-primary'
            : 'text-gray-300 hover:text-white hover:bg-white/5',
        )}
      >
        <CreditCard
          className={cn('h-5 w-5', pathname === '/dashboard/subscription' ? 'text-black' : '')}
        />
        {getButtonText()}
      </button>
    )
  }

  return (
    <AnimatedButton
      href="#"
      onClick={(e) => {
        e.preventDefault()
        handleSubscription()
      }}
      fullWidth={fullWidth}
    >
      <span>{getButtonText()}</span>
    </AnimatedButton>
  )
}
