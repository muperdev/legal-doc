import { PageContainer } from '@/components/dashboard/layout/page-container'
import { Pricing } from '@/components/subscription/pricing'

export default function SubscriptionPage() {
  return (
    <PageContainer title="Subscription Plans">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h2 className="text-xl text-white mb-2">Choose Your Plan</h2>
          <p className="text-gray-400">
            Select the plan that best fits your needs. All plans include our core features.
          </p>
        </div>
        <Pricing />
      </div>
    </PageContainer>
  )
}
