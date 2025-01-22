import { redirect } from 'next/navigation'
import { currentUser } from '@/lib/auth'
import { ClientForm } from '@/components/clients/client-form'

export default async function NewClientPage() {
  const user = await currentUser()
  if (!user) {
    redirect('/login')
  }

  return <ClientForm user={user} />
}
