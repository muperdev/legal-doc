'use client'

import Link from 'next/link'
import { redirect, usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { LayoutDashboard, Users, LogOut, FilePlus } from 'lucide-react'
import Image from 'next/image'
import { SubscribeButton } from '@/components/subscription/subscribe-button'
import { User } from '@/payload-types'
import { isSubscribed } from '@/lib/subscription-checker'
import { X } from 'lucide-react'

const handleLogout = async () => {
  await fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/api/users/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  redirect('/login')
}

const routes = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
  },
  {
    label: 'New Document',
    icon: FilePlus,
    href: '/dashboard/new-document',
  },
  {
    label: 'Clients',
    icon: Users,
    href: '/dashboard/clients',
  },
  // {
  //   label: 'Settings',
  //   icon: Settings,
  //   href: '/dashboard/settings',
  // },
]

export function Sidebar({
  user,
  onClose,
  setIsMobileMenuOpen,
}: {
  user: User
  onClose?: () => void
  setIsMobileMenuOpen?: (isOpen: boolean) => void
}) {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-full bg-black text-neutral-400 blackHanSans relative">
      {onClose && (
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 text-neutral-400 hover:text-white lg:hidden"
        >
          <X className="h-5 w-5" />
        </button>
      )}
      <div className="px-6 py-6">
        <Link href="/" className="flex items-center mb-12">
          <Image
            src="/logo.png"
            alt="Logo"
            width={200}
            height={50}
            className="cursor-pointer md:w-[200px] w-[150px] "
            style={{ backgroundColor: 'transparent' }}
            priority
          />
        </Link>
        <div className="md:space-y-1 space-y-3" onClick={() => setIsMobileMenuOpen?.(false)}>
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                'flex items-center gap-x-4 text-base font-medium py-3 px-4  transition-all duration-200',
                pathname === route.href
                  ? 'text-black bg-primary'
                  : 'text-gray-300 hover:text-white hover:bg-white/5',
              )}
            >
              <route.icon className={cn('h-5 w-5', pathname === route.href ? 'text-black' : '')} />
              {route.label}
            </Link>
          ))}
          <div className="py-2">
            <SubscribeButton
              userSubscriptionStatus={user?.subscription?.status || null}
              plan={user?.subscription?.plan || 'pro_monthly'}
              isManageSubscription={isSubscribed(user)}
            />
          </div>
        </div>
      </div>
      <div className="mt-auto px-6 py-6 border-t border-neutral-800">
        <div
          onClick={handleLogout}
          className="flex items-center gap-x-4 text-base font-medium text-gray-300 hover:text-white transition-colors px-4 py-3 hover:bg-white/5 cursor-pointer"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </div>
      </div>
    </div>
  )
}
