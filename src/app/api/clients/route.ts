import { NextResponse } from 'next/server'
import payload from 'payload'
import { cookies } from 'next/headers'
import { getPayload } from 'payload'
import config from '@payload-config'

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

export async function POST(req: Request) {
  const cookieStore = await cookies()
  const token = cookieStore.get('payload-token')

  if (!token) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  try {
    const payload = await getPayload({
      config: config,
    })

    const body = await req.json()
    const { name, email, phoneNumber, address, companyName, companyAddress, user } = body

    const client = await payload.create({
      collection: 'clients',
      data: {
        name,
        email,
        phoneNumber,
        address,
        companyName,
        companyAddress,
      },
    })

    await payload.update({
      collection: 'users',
      id: user.id,
      data: {
        clients: [...(user.clients || []), client.id],
      },
    })

    return NextResponse.json(client)
  } catch (error) {
    console.error('Error creating client:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
