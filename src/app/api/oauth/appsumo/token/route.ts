import { NextResponse } from 'next/server'

const APPSUMO_TOKEN_URL = 'https://appsumo.com/openid/token/'
const APPSUMO_LICENSE_URL = 'https://appsumo.com/openid/license_key/'

export async function POST(req: Request) {
  try {
    const { code } = await req.json()

    // Exchange code for access token
    const tokenResponse = await fetch(APPSUMO_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.APPSUMO_CLIENT_ID,
        client_secret: process.env.APPSUMO_CLIENT_SECRET,
        code,
        redirect_uri: `${process.env.NEXT_PUBLIC_SERVER_URL}/oauth/appsumo`,
        grant_type: 'authorization_code',
      }),
    })

    if (!tokenResponse.ok) {
      console.error('AppSumo token error:', await tokenResponse.text())
      return new NextResponse('Failed to exchange code for token', { status: 400 })
    }

    const { access_token } = await tokenResponse.json()

    // Fetch license data using access token
    const licenseResponse = await fetch(`${APPSUMO_LICENSE_URL}?access_token=${access_token}`)

    if (!licenseResponse.ok) {
      console.error('AppSumo license error:', await licenseResponse.text())
      return new NextResponse('Failed to fetch license data', { status: 400 })
    }

    const license = await licenseResponse.json()

    return NextResponse.json({ license })
  } catch (error) {
    console.error('AppSumo token exchange error:', error)
    return new NextResponse('Token exchange failed', { status: 500 })
  }
}
