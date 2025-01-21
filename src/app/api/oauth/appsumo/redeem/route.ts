import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { currentUser } from '@/lib/auth'

export async function POST(req: Request) {
  try {
    const user = await currentUser()
    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { license_key } = await req.json()
    if (!license_key) {
      return new NextResponse('Missing license key', { status: 400 })
    }

    // Update user's subscription in your database
    const payload = await getPayload({ config })
    await payload.update({
      collection: 'users',
      id: user.id,
      data: {
        subscription: {
          status: 'active',
          plan: 'appsumo_lifetime',
          appsumoLicenseId: license_key,
          appsumoActivatedAt: new Date().toISOString(),
        },
      },
    })

    return NextResponse.json({
      success: true,
      message: 'License linked successfully',
    })
  } catch (error) {
    console.error('License linking error:', error)
    return new NextResponse('Internal server error', { status: 500 })
  }
}
