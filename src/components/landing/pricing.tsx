'use client'

import { Box } from 'lucide-react'
import { useState } from 'react'

interface PricingPlan {
  name: string
  monthly: number
  features: string[]
  recommended?: boolean
}

const PRICING_PLANS: Record<string, PricingPlan> = {
  starter: {
    name: 'Straight-Up Plan',
    monthly: 19,
    features: [
      'Customizable document templates',
      'Legal compliance assurance',
      'Quick document generation',
    ],
  },
  pro: {
    name: 'Get the Game Plan',
    monthly: 29,
    recommended: true,
    features: [
      'All Basic features',
      'Priority customer support',
      'Advanced customization options',
      'Collaboration tools included',
    ],
  },
  enterprise: {
    name: 'Entourage Plan',
    monthly: 49,
    features: [
      'All Business features',
      'Dedicated account manager',
      'Custom integrations available',
      'Extended storage options',
      'Monthly performance reports',
    ],
  },
}

export function Pricing() {
  const [isYearly, setIsYearly] = useState(false)

  const calculatePrice = (monthlyPrice: number) => {
    if (!isYearly) return monthlyPrice
    const yearlyPrice = monthlyPrice * 12 * 0.6 // 40% discount
    return Math.round(yearlyPrice / 12)
  }

  return (
    <div className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-sm font-medium text-yellow-500">Pricing</span>
          <h2 className="mt-2 text-4xl font-bold text-white sm:text-5xl">Cost Vibes</h2>
          <p className="mt-4 text-xl text-gray-400">
            Pick the plan that vibes with your startup&apos;s hustle.
          </p>
        </div>

        {/* Pricing Toggle */}
        <div className="mt-12 flex flex-col items-center">
          <div className="inline-flex rounded-md">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-4 py-2 text-sm font-medium rounded-l-md ${
                !isYearly ? 'bg-black text-white border-2 border-white' : 'bg-white text-black'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-4 py-2 text-sm font-medium rounded-r-md ${
                isYearly ? 'bg-black text-white border-2 border-white' : 'bg-white text-black'
              }`}
            >
              Yearly
            </button>
          </div>
          {isYearly && (
            <div className="mt-3">
              <span className="text-yellow-500 text-sm font-medium">
                Save 40% with yearly billing
              </span>
            </div>
          )}
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {Object.entries(PRICING_PLANS).map(([key, plan]) => (
            <div
              key={key}
              className={`relative flex flex-col p-8 bg-black rounded-lg ${
                plan.recommended
                  ? 'border-2 border-yellow-500 shadow-[0_0_40px_-15px] shadow-yellow-500/30'
                  : 'border-2 border-white'
              }`}
            >
              {plan.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-medium">
                    Recommended
                  </span>
                </div>
              )}
              <div className="flex justify-end">
                <Box
                  className={`h-8 w-8 ${plan.recommended ? 'text-yellow-500' : 'text-yellow-500'}`}
                />
              </div>
              <h3 className="text-xl font-bold text-white">{plan.name}</h3>
              <div className="mt-4 flex items-baseline text-white">
                <span className="text-5xl font-extrabold tracking-tight">
                  ${calculatePrice(plan.monthly)}
                </span>
                <span className="ml-1 text-2xl">/{isYearly ? 'mo' : 'mo'}</span>
                {isYearly && <span className="ml-2 text-sm text-yellow-500">billed yearly</span>}
              </div>
              <div className="mt-6 flex-grow">
                <div className="text-white font-medium mb-4">Includes:</div>
                <ul className="space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className={`h-6 w-6 mr-3 ${
                          plan.recommended ? 'text-yellow-500' : 'text-yellow-500'
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
              <button
                className={`mt-8 w-full py-2 px-4 rounded-md transition-colors ${
                  plan.recommended
                    ? 'bg-yellow-500 text-black hover:bg-yellow-400'
                    : 'bg-black text-white border-2 border-white hover:bg-white hover:text-black'
                }`}
              >
                Get started
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
