import { redirect } from 'next/navigation'
import { AppSumoRedemption } from '@/components/auth/appsumo-redemption'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface LicenseData {
  license_key: string
  status: 'active' | 'inactive' | 'deactivated'
  email?: string
}

async function getLicenseData(code: string): Promise<LicenseData> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/oauth/appsumo/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code }),
  })

  if (!response.ok) {
    throw new Error('Failed to exchange code for token')
  }

  const { license } = await response.json()
  return license
}

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

interface PageProps {
  searchParams: SearchParams
}

export default async function AppSumoRedemptionPage(props: PageProps) {
  const searchParams = await props.searchParams
  const code = searchParams.code as string | undefined

  if (!code) {
    redirect('/')
  }

  try {
    const licenseData = await getLicenseData(code)

    if (licenseData.status === 'deactivated') {
      return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            <Card className="bg-black border border-neutral-800">
              <CardHeader>
                <CardTitle className="text-white">License Deactivated</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">This license has been deactivated.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    }

    return <AppSumoRedemption licenseData={licenseData} />
  } catch (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <Card className="bg-black border border-neutral-800">
            <CardHeader>
              <CardTitle className="text-white">Error</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">Failed to process AppSumo authentication.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }
}
