'use client'

import { Box } from 'lucide-react'
import { useState } from 'react'
import {
  SubscribeButton,
  SubscriptionStatusTypes,
} from '@/components/subscription/subscribe-button'

interface PricingPlan {
  name: string
  monthly: number
  yearly: number
  features: string[]
  recommended?: boolean
}

const PRICING_PLANS: Record<string, PricingPlan> = {
  free: {
    name: 'Free Plan',
    monthly: 0,
    yearly: 0,
    features: [
      'Access to 10 most-used document templates',
      '5 documents Limit',
      'Basic template customization',
      'PDF export option',
    ],
  },
  pro: {
    name: 'Pro Plan',
    monthly: 9.99,
    yearly: 49.99,
    recommended: true,
    features: [
      'Unlimited document generation',
      'Access to all templates',
      'Enhanced customization options',
      'PDF/Word export options',
      'Priority email/chat support',
      'Document history & saved templates',
    ],
  },
}

export function Pricing({
  userSubscriptionStatus,
  token,
}: {
  userSubscriptionStatus: SubscriptionStatusTypes | null
  token: string | null
}) {
  const [isYearly, setIsYearly] = useState(false)
  console.log(token)
  return (
    <div className="bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Pricing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white/10 rounded-lg p-0.5">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                !isYearly ? 'bg-white text-black' : 'text-white hover:bg-white/5'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                isYearly ? 'bg-white text-black' : 'text-white hover:bg-white/5'
              }`}
            >
              Yearly
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 max-w-4xl mx-auto">
          {Object.entries(PRICING_PLANS).map(([key, plan]) => (
            <div
              key={key}
              className={`relative flex flex-col p-8 bg-black ${
                plan.recommended
                  ? 'border-2 border-primary shadow-[0_0_40px_-15px] shadow-primary/30'
                  : 'border border-white/20'
              }`}
            >
              {plan.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-black px-3 py-1 rounded-full text-sm font-medium">
                    Recommended
                  </span>
                </div>
              )}
              <div className="flex justify-end">
                <Box
                  className={`h-8 w-8 ${plan.recommended ? 'text-primary' : 'text-primary/50'}`}
                />
              </div>
              <h3 className="text-xl font-bold text-white">{plan.name}</h3>
              <div className="mt-4 flex items-baseline text-white">
                <span className="text-5xl font-extrabold tracking-tight">
                  ${isYearly ? plan.yearly : plan.monthly}
                </span>
                <span className="ml-1 text-2xl">/{isYearly ? 'yr' : 'mo'}</span>
                {isYearly && plan.recommended && (
                  <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary text-black">
                    Save 50%
                  </span>
                )}
              </div>
              <div className="mt-6 flex-grow">
                <div className="text-white font-medium mb-4">Includes:</div>
                <ul className="space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className={`h-6 w-6 mr-3 ${
                          plan.recommended ? 'text-primary' : 'text-primary/50'
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {key === 'free' ? (
                <button className="mt-8 w-full py-2 px-4 border-2 border-white text-white hover:bg-white hover:text-black transition-colors">
                  Get started
                </button>
              ) : (
                <div className="mt-8 w-full">
                  <SubscribeButton
                    plan={isYearly ? 'pro_yearly' : 'pro_monthly'}
                    userSubscriptionStatus={userSubscriptionStatus}
                    token={token}
                    fullWidth
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
