import { SubscriptionCard } from '@/components/dashboard/subscription-card'
import { PageContainer } from '@/components/dashboard/layout/page-container'
import { SubscriptionPlan } from '@/types/dashboard'

const subscriptionPlans: SubscriptionPlan[] = [
  {
    title: 'Free',
    price: '$0',
    description: 'For individuals just getting started',
    features: ['5 documents per month', 'Basic templates', 'Email support'],
  },
  {
    title: 'Pro',
    price: '$29',
    description: 'For growing businesses',
    features: [
      'Unlimited documents',
      'Advanced templates',
      'Priority support',
      'Team collaboration',
    ],
    highlighted: true,
  },
  {
    title: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations',
    features: [
      'Unlimited documents',
      'Custom templates',
      'Dedicated account manager',
      'API access',
      'SSO integration',
    ],
  },
]

export default function SubscriptionPage() {
  return (
    <PageContainer title="Subscription">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white">Choose Your Plan</h2>
        <p className="mt-4 text-xl text-gray-600">Compare our flexible pricing options</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {subscriptionPlans.map((plan) => (
          <SubscriptionCard key={plan.title} {...plan} />
        ))}
      </div>
    </PageContainer>
  )
}
