import { getPayload } from 'payload'
import { NextResponse } from 'next/server'
import config from '@payload-config'

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()
    const payload = await getPayload({ config })

    const result = await payload.login({
      collection: 'users',
      data: {
        email,
        password,
      },
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Authentication failed' }, { status: 401 })
  }
}
