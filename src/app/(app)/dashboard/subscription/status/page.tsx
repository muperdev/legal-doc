import { PageContainer } from '@/components/dashboard/layout/page-container'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { currentUser } from '@/lib/auth'
import { CheckCircle2, XCircle } from 'lucide-react'
import { redirect } from 'next/navigation'

export default async function SubscriptionStatus({
  searchParams,
}: {
  searchParams: { success?: string; canceled?: string }
}) {
  const success = searchParams.success
  const canceled = searchParams.canceled

  // Redirect after rendering using a meta refresh
  const redirectHeader = <meta httpEquiv="refresh" content="5;url=/dashboard" />

  const user = await currentUser()
  if (!user) {
    return redirect('/login')
  }

  return (
    <>
      {redirectHeader}
      <PageContainer user={user} backUrl="/dashboard" title="Subscription Status">
        <div className="max-w-md mx-auto">
          <Card className="bg-black border border-neutral-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                {success ? (
                  <>
                    <CheckCircle2 className="h-6 w-6 text-green-500" />
                    Subscription Successful!
                  </>
                ) : canceled ? (
                  <>
                    <XCircle className="h-6 w-6 text-red-500" />
                    Subscription Canceled
                  </>
                ) : null}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                {success
                  ? 'Thank you for subscribing! You now have access to all premium features.'
                  : canceled
                    ? 'Your subscription was not completed. Please try again if you wish to subscribe.'
                    : 'Processing your subscription...'}
              </p>
              <p className="mt-4 text-sm text-gray-400">
                Redirecting you to the dashboard in a few seconds...
              </p>
            </CardContent>
          </Card>
        </div>
      </PageContainer>
    </>
  )
}
