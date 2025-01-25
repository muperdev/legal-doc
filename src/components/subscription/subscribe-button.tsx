'use client'

import { useState } from 'react'
import { AnimatedButton } from '@/components/ui/animated-button'
import { CreditCard } from 'lucide-react'
import { cn } from '@/lib/utils'
import { usePathname, useRouter } from 'next/navigation'
import { toast } from 'sonner'

export type SubscriptionStatusTypes =
  | 'active'
  | 'canceled'
  | 'past_due'
  | 'trialing'
  | 'incomplete'
  | 'incomplete_expired'
  | 'inactive'
  | null

interface SubscribeButtonProps {
  isManageSubscription?: boolean
  plan?:
    | 'free'
    | 'pro_monthly'
    | 'pro_yearly'
    | 'appsumo_lifetime'
    | 'appsumo_monthly'
    | 'appsumo_yearly'
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
  plan = 'pro_monthly',
  userSubscriptionStatus,
  fullWidth = false,
  token,
}: SubscribeButtonProps) {
  const [loading, setLoading] = useState(false)
  const pathname = usePathname()
  const handleSubscription = async () => {
    try {
      setLoading(true)

      // Create portal session for active subscriptions or management
      if (userSubscriptionStatus === 'active' || isManageSubscription) {
        const response = await fetch('/api/stripe/portal', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error('Failed to create portal session')
        }

        const { url } = await response.json()
        if (url) {
          window.location.href = url
        }
        return
      }

      // For new subscriptions or reactivations, create checkout session
      const response = await fetch(
        `/api/stripe/checkout?priceId=${STRIPE_PRICES[plan as keyof typeof STRIPE_PRICES]}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )

      if (!response.ok) {
        throw new Error('Failed to create checkout session')
      }

      const { url } = await response.json()
      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('Failed to process subscription request')
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
        return 'Manage Subscription'
      case 'past_due':
        return 'Update Payment Method'
      case 'incomplete':
      case 'incomplete_expired':
        return 'Go Pro Now ⚡️'
      case 'canceled':
        return 'Reactivate Subscription ⚡️'
      default:
        return `Go Pro ${plan === 'pro_yearly' ? 'Yearly' : 'Monthly'} ⚡️`
    }
  }

  if (isManageSubscription) {
    return (
      <button
        onClick={handleSubscription}
        className={cn(
          'flex w-full items-center gap-x-4 md:gap-x-4 text-base font-medium py-1.5 md:py-2 px-3 md:px-4 transition-all duration-200',
          pathname === '/dashboard/subscription'
            ? 'text-black bg-primary'
            : 'text-gray-300 hover:text-white hover:bg-white/5',
        )}
      >
        <CreditCard
          className={cn('h-6 w-6 md:h-5 md:w-5', pathname === '/dashboard/subscription' ? 'text-black' : '')}
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
