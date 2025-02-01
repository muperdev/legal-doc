import { redirect } from 'next/navigation'
import { currentUser } from '@/lib/auth'
import { ClientForm } from '@/components/clients/client-form'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Client } from '@/payload-types'

async function createClient(client: Client) {
  'use server'

  const payload = await getPayload({
    config: config,
  })

  try {
    await payload.create({
      collection: 'clients',
      data: client,
    })

    return { success: true }
  } catch (error) {
    console.error('Error creating client:', error)
    return { success: false, error }
  }
}

export default async function NewClientPage() {
  const user = await currentUser()
  if (!user) {
    redirect('/login')
  }

  return <ClientForm user={user} handleCreateClient={createClient} />
}
