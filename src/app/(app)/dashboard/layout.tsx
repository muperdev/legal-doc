import { Sidebar } from '@/components/dashboard/layout/sidebar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  
  return (
    <div className="h-full relative bg-black">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-black border-r border-neutral-800/50/[0.06]">
        <Sidebar />
      </div>
      <main className="md:pl-72 h-full">
        <div className="h-full bg-black">{children}</div>
      </main>
    </div>
  )
}
