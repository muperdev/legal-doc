import { PageContainer } from '@/components/dashboard/layout/page-container'
import { Pricing } from '@/components/landing/pricing'
import { cookies } from 'next/headers'
import { currentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function SubscriptionPage() {
  const user = await currentUser()
  const cookieStore = await cookies()
  const token = cookieStore.get('payload-token')?.value || null
  if (!user) {
    return redirect('/login')
  }
  return (
    <PageContainer user={user} title="Subscription Plans" token={token}>
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h2 className="text-xl text-white mb-2">Choose Your Plan</h2>
          <p className="text-gray-400">
            Select the plan that best fits your needs. All plans include our core features.
          </p>
        </div>
        <Pricing userSubscriptionStatus={user?.subscription?.status || null} token={token} />
      </div>
    </PageContainer>
  )
}
