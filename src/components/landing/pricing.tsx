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
  free: {
    name: 'Free Plan',
    monthly: 0,
    features: [
      'Access to 10 most-used document templates',
      '5 documents per month',
      'Basic template customization',
      'PDF export option',
    ],
  },
  pro: {
    name: 'Get the Game Plan',
    monthly: 9.99,
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

export function Pricing() {
  const [isYearly, setIsYearly] = useState(false)

  const calculatePrice = (monthlyPrice: number) => {
    if (monthlyPrice === 0) return 0
    if (!isYearly) return monthlyPrice
    return 49.99 / 12 // Fixed yearly price divided by 12 for monthly display
  }

  return (
    <div className="bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-sm font-medium text-yellow-500">Pricing</span>
          <h2 className="mt-2 text-4xl font-bold text-white sm:text-5xl font-blackHanSans">
            Simple Pricing
          </h2>
          <p className="mt-4 text-xl text-gray-400">Start for free, upgrade when you need more</p>
        </div>

        {/* Pricing Toggle */}
        <div className="mt-12 flex flex-col items-center">
          <div className="inline-flex ">
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
                Save 50% with yearly billing
              </span>
            </div>
          )}
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 max-w-4xl mx-auto">
          {Object.entries(PRICING_PLANS).map(([key, plan]) => (
            <div
              key={key}
              className={`relative flex flex-col p-8 bg-black  ${
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
              <div className="mt-4 flex items-baseline text-white justify-center">
                <span className="text-5xl font-extrabold tracking-tight">
                  ${plan.monthly === 0 ? '0' : calculatePrice(plan.monthly).toFixed(2)}
                </span>
                <span className="ml-1 text-2xl">/{isYearly ? 'mo' : 'mo'}</span>
                {isYearly && plan.monthly !== 0 && (
                  <span className="ml-2 text-sm text-yellow-500">${49.99}/year</span>
                )}
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
                className={`mt-8 w-full py-2 px-4  transition-colors ${
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
