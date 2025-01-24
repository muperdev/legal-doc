import { ClientTable } from '@/components/clients/client-table'
import { Button } from '@/components/ui/button'
import { UserPlus } from 'lucide-react'
import Link from 'next/link'
import { currentUser } from '@/lib/auth'
import { Client } from '@/payload-types'
import { getPayload } from 'payload'
import config from '@payload-config'
const payload = await getPayload({
  config: config,
})

export const dynamic = 'force-dynamic'

export default async function ClientsPage() {
  const user = await currentUser()
  const userData = await payload.findByID({
    collection: 'users',
    id: user?.id.toString() || '0',
  })
  return (
    <div className="flex-1 overflow-auto bg-black">
      <header className="bg-zinc-900 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-zinc-100">Clients</h1>
          <Link href={`/dashboard/clients/new?user=${user?.id}`}>
            <Button variant="default" className="bg-yellow-500 hover:bg-yellow-600 text-black">
              <UserPlus className="h-4 w-4 mr-2" />
              Add New Client
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-zinc-900 rounded-lg border border-zinc-800 shadow">
          <ClientTable initialClients={userData?.clients as Client[]} />
        </div>
      </main>
    </div>
  )
}
