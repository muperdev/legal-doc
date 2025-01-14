import { Sidebar } from '@/components/dashboard/layout/sidebar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <Sidebar />
      {children}
    </div>
  )
}
