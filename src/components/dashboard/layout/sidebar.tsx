import Link from 'next/link'
import { FileText, Users, Settings, CreditCard } from 'lucide-react'
import { cn } from '@/lib/utils'
import { UserProfile } from './user-profile'

const navigation = [
  { name: 'Documents', href: '/dashboard', icon: FileText },
  { name: 'Clients', href: '/dashboard/clients', icon: Users },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  { name: 'Subscription', href: '/dashboard/subscription', icon: CreditCard },
]

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  return (
    <div className={cn('flex h-full w-64 flex-col bg-white font-sans', className)}>
      <div className="flex h-16 items-center px-6">
        <Link href="/dashboard" className="text-xl font-semibold text-gray-900">
          LegalEase
        </Link>
      </div>
      <nav className="flex-1 space-y-1 px-4 py-4">
        {navigation.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center px-2 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md group"
            >
              <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
              {item.name}
            </Link>
          )
        })}
      </nav>
      <UserProfile />
    </div>
  )
}
