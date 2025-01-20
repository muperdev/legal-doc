'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { SubscribeButton } from './subscribe-button'
import { Check } from 'lucide-react'

const features = [
  'Unlimited document generation',
  'Priority support',
  'Advanced templates',
  'Custom branding',
  'API access',
]

export function Pricing() {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Monthly Plan */}
      <Card className="bg-black border border-neutral-800">
        <CardHeader>
          <CardTitle className="text-2xl text-white">Monthly Plan</CardTitle>
          <CardDescription>Perfect for getting started</CardDescription>
          <div className="mt-4">
            <span className="text-4xl font-bold text-white">$29</span>
            <span className="text-gray-400 ml-2">/month</span>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {features.map((feature) => (
              <li key={feature} className="flex items-center text-gray-300">
                <Check className="h-5 w-5 text-primary mr-2" />
                {feature}
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <SubscribeButton plan="monthly" />
        </CardFooter>
      </Card>

      {/* Yearly Plan */}
      <Card className="bg-black border-2 border-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-primary text-black px-3 py-1 text-sm font-medium">
          Save 20%
        </div>
        <CardHeader>
          <CardTitle className="text-2xl text-white">Yearly Plan</CardTitle>
          <CardDescription>Best value for long term</CardDescription>
          <div className="mt-4">
            <span className="text-4xl font-bold text-white">$279</span>
            <span className="text-gray-400 ml-2">/year</span>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {features.map((feature) => (
              <li key={feature} className="flex items-center text-gray-300">
                <Check className="h-5 w-5 text-primary mr-2" />
                {feature}
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <SubscribeButton plan="yearly" />
        </CardFooter>
      </Card>
    </div>
  )
}
