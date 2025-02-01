import { redirect } from 'next/navigation'
import { currentUser } from '@/lib/auth'
import { ClientForm } from '@/components/clients/client-form'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Client } from '@/payload-types'

export default async function NewClientPage() {
  const payload = await getPayload({
    config: config,
  })
  const user = await currentUser()
  if (!user) {
    redirect('/login')
  }

  const createClient = async (client: Client) => {
    'use server'
    
    await payload.create({
      collection: 'clients',
      data: {
        ...client,
      },
    })
  }

  return <ClientForm user={user} handleCreateClient={createClient} />
}
