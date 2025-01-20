'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { PageContainer } from '@/components/dashboard/layout/page-container'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2, XCircle } from 'lucide-react'

export default function SubscriptionStatus() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const success = searchParams.get('success')
  const canceled = searchParams.get('canceled')

  useEffect(() => {
    // Redirect after 5 seconds
    const timer = setTimeout(() => {
      router.push('/dashboard')
    }, 5000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <PageContainer title="Subscription Status">
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
  )
}
