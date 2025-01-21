import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { state } = await req.json()
    const cookieStore = await cookies()
    const storedState = cookieStore.get('appsumo_oauth_state')?.value

    if (!storedState || storedState !== state) {
      return new NextResponse('Invalid state parameter', { status: 400 })
    }

    // Clear the state cookie after verification
    cookieStore.delete('appsumo_oauth_state')

    return new NextResponse(null, { status: 200 })
  } catch (error) {
    console.error('State verification error:', error)
    return new NextResponse('State verification failed', { status: 500 })
  }
}
