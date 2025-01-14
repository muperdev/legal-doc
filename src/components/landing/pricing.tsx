import { PricingCard } from '@/components/cards/pricing-card'

export function Pricing() {
  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Pricing Plans</h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Choose the plan that fits your needs.
          </p>
        </div>

        <div className="mt-10 space-y-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0">
          <PricingCard
            title="Free"
            price="$0"
            description="Perfect for getting started"
            features={['1 user', '5 documents per month', 'Basic templates']}
          />
          <PricingCard
            title="Pro"
            price="$29"
            description="For growing businesses"
            features={['5 users', 'Unlimited documents', 'Advanced templates', 'Priority support']}
            highlighted={true}
          />
          <PricingCard
            title="Enterprise"
            price="Custom"
            description="For large organizations"
            features={[
              'Unlimited users',
              'Unlimited documents',
              'Custom templates',
              'Dedicated account manager',
            ]}
          />
        </div>
      </div>
    </div>
  )
}
