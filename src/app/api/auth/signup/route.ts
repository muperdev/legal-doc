import { getPayload } from 'payload'
import { NextResponse } from 'next/server'
import config from '@payload-config'

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const payload = await getPayload({ config })
    const result = await payload.create({
      collection: 'users',
      data,
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json({ error: 'Registration failed' }, { status: 400 })
  }
}
