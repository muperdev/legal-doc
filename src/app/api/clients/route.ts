import { NextResponse } from 'next/server'
import payload from 'payload'

export async function GET() {
  try {
    const clients = await payload.find({
      collection: 'clients',
    })

    return NextResponse.json(clients)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch clients' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const client = await payload.create({
      collection: 'clients',
      data: body,
    })

    return NextResponse.json(client)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create client' }, { status: 500 })
  }
}
