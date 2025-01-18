import { getPayload } from 'payload'
import config from '@payload-config'
import { ClientTable } from '@/components/clients/client-table'

export const dynamic = 'force-dynamic'

const payload = await getPayload({
  config: config,
})

export default async function ClientsPage() {
  const clients = await payload.find({
    collection: 'clients',
  })

  return (
    <div className="flex-1 overflow-auto bg-black">
      <header className="bg-black border-b border-neutral-800/50/[0.06]">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white">Clients</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <ClientTable initialClients={clients.docs} />
      </main>
    </div>
  )
}
