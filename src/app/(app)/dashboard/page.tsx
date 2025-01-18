import Link from 'next/link'
import { FileText, Plus, BarChart, Users, ShieldCheck } from 'lucide-react'
import { StatCard } from '@/components/dashboard/stat-card'
import { QuickActionCard } from '@/components/dashboard/quick-action-card'
import { DocumentList } from '@/components/dashboard/document-list'
import { PageContainer } from '@/components/dashboard/layout/page-container'
import { cookies } from 'next/headers'
import { currentUser } from '@/lib/auth'

export default async function Dashboard() {
  const cookieStore = await cookies()
  const token = cookieStore.get('payload-token')

  if (!token) {
    return null
  }

  const user = await currentUser()

  return (
    <PageContainer title="Dashboard">
      <div className="space-y-8">
        {/* Quick stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Documents"
            value={user?.documents?.length || 0}
            icon={<FileText className="h-6 w-6 text-gray-400" />}
          />
          <StatCard
            title="Active Clients"
            value={user?.clients?.length || 0}
            icon={<Users className="h-6 w-6 text-gray-400" />}
          />
          <StatCard
            title="Documents This Month"
            value={user?.documents?.length || 0}
            icon={<BarChart className="h-6 w-6 text-gray-400" />}
          />
          <StatCard
            title="Subscription Status"
            value={user?.subscription?.status || 'incomplete'}
            icon={<ShieldCheck className="h-6 w-6 text-gray-400" />}
          />
        </div>

        {/* Recent Documents */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Recent Documents</h2>
            <Link
              href="/dashboard/new-document"
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-primary-blue text-white text-sm font-medium rounded-lg shadow-lg  hover:bg-blue-500  transform hover:scale-105 transition-all duration-200"
            >
              <Plus className="inline-block h-5 w-5 mr-2" />
              New Document
            </Link>
          </div>
          <DocumentList
            documents={
              user?.documents?.map((doc) => ({
                id: (doc as any).id,
                filename: (doc as any).filename || 'Untitled',
                mimeType: (doc as any).mimeType || 'Document',
                updatedAt: (doc as any).updatedAt || new Date().toISOString(),
                createdAt: (doc as any).createdAt || new Date().toISOString(),
              })) || []
            }
          />
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <QuickActionCard
              title="Create NDA"
              description="Generate a new Non-Disclosure Agreement"
              icon={<FileText className="h-6 w-6" />}
              href="/dashboard/new-document/nda"
            />
            <QuickActionCard
              title="Add Client"
              description="Add a new client to your account"
              icon={<Users className="h-6 w-6" />}
              href="/dashboard/clients/new"
            />
            <QuickActionCard
              title="View Analytics"
              description="See detailed analytics of your documents"
              icon={<BarChart className="h-6 w-6" />}
              href="/dashboard/analytics"
            />
          </div>
        </div>
      </div>
    </PageContainer>
  )
}
