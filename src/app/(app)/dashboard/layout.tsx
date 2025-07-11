import { Sidebar } from '@/components/dashboard/layout/sidebar'
import { currentUser } from '@/lib/auth'
import { cookies } from 'next/headers'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await currentUser()
  if (!user) return null

  const cookieStore = await cookies()
  const token = cookieStore.get('payload-token')?.value || null

  return (
    <div className="h-full relative bg-black">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-black">
        <Sidebar user={user} token={token} />
      </div>
      <main className="md:pl-72 h-full">
        <div className="h-full bg-black">{children}</div>
      </main>
    </div>
  )
}
