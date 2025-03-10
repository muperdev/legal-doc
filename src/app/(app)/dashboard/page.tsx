import Link from 'next/link'
import { FileText, Plus, BarChart, Users, ShieldCheck } from 'lucide-react'
import { StatCard } from '@/components/dashboard/stat-card'
import { DocumentListWrapper } from '@/components/dashboard/document-list-wrapper'
import { PageContainer } from '@/components/dashboard/layout/page-container'
import { cookies } from 'next/headers'
import { currentUser } from '@/lib/auth'
import { isSubscribed } from '@/lib/subscription-checker'
import { User } from '@/payload-types'
import { getPayload } from 'payload'
import config from '@payload-config'

const payload = await getPayload({
  config: config,
})
export default async function Dashboard() {
  const cookieStore = await cookies()
  const token = cookieStore.get('payload-token')
  if (!token) {
    return null
  }

  const userData = await currentUser()
  const user = await payload.findByID({
    collection: 'users',
    id: userData?.id.toString() || '0',
  })
  if (!user) return null

  return (
    <PageContainer
      token={token.value}
      title="Dashboard"
      user={user}
    >
      <div className="space-y-8">
        {/* Quick stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Documents"
            value={user?.documents?.length || 0}
            icon={<FileText className="h-6 w-6 text-primary" />}
          />
          <StatCard
            title="Active Clients"
            value={user?.clients?.length || 0}
            icon={<Users className="h-6 w-6 text-primary" />}
          />
          <StatCard
            title="Documents This Month"
            value={user?.documents?.length || 0}
            icon={<BarChart className="h-6 w-6 text-primary" />}
          />
          <StatCard
            title="Subscription Status"
            value={user?.subscription?.status || 'incomplete'}
            icon={<ShieldCheck className="h-6 w-6 text-primary" />}
          />
        </div>

        {/* Recent Documents */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="md:text-xl text-base font-semibold text-white">Recent Documents</h2>
            <Link
              href="/dashboard/new-document"
              className="inline-flex items-center  bg-primary md:px-5 px-3 py-2 text-sm font-medium text-black shadow-md transition-all duration-200 hover:bg-[#e5c71e] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
            >
              <Plus className="mr-2 h-5 w-5" />
              New Document
            </Link>
          </div>
          <DocumentListWrapper
            documents={
              user?.documents?.map((doc) => ({
                id: (doc as any).id,
                filename: (doc as any).filename || 'Untitled',
                mimeType: (doc as any).mimeType || 'Document',
                url: (doc as any).url,
                updatedAt: (doc as any).updatedAt || new Date().toISOString(),
                createdAt: (doc as any).createdAt || new Date().toISOString(),
              })) || []
            }
            isSubscribed={isSubscribed(user as User)}
          />
        </div>

        {/* TODO Quick Actions */}
        {/* <div>
          <h2 className="mb-4 text-xl font-semibold text-white">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <QuickActionCard
              title="Add Client"
              description="Add a new client to your account"
              icon={<Users className="h-6 w-6" />}
              href="/dashboard/clients"
            />
            <QuickActionCard
              title="View Analytics"
              description="See detailed analytics of your documents"
              icon={<BarChart className="h-6 w-6" />}
              href="/dashboard/analytics"
            />
          </div>
        </div> */}
      </div>
    </PageContainer>
  )
}
