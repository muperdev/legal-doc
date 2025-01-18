'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { LayoutDashboard, Users, FileText, Settings, CreditCard, LogOut } from 'lucide-react'

const routes = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
  },
  {
    label: 'Clients',
    icon: Users,
    href: '/dashboard/clients',
  },
  {
    label: 'Settings',
    icon: Settings,
    href: '/dashboard/settings',
  },
  {
    label: 'Subscription',
    icon: CreditCard,
    href: '/dashboard/subscription',
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-full bg-black text-neutral-400 font-sans">
      <div className="px-6 py-6">
        <Link href="/dashboard" className="flex items-center mb-8">
          <h1 className="text-2xl font-semibold text-white">MateDocs</h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                'flex items-center gap-x-4 text-sm font-medium py-3 w-full hover:text-white transition',
                pathname === route.href ? 'text-white' : '',
              )}
            >
              <route.icon className={cn('h-6 w-6')} />
              {route.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-auto px-6 py-6 border-t border-neutral-800">
        <Link
          href="/logout"
          className="flex items-center gap-x-4 text-sm font-medium hover:text-white transition"
        >
          <LogOut className="h-6 w-6" />
          Logout
        </Link>
      </div>
    </div>
  )
}
