'use client'

import { Menu } from 'lucide-react'
import { useState } from 'react'
import { User } from '@/payload-types'
import { Sidebar } from './sidebar'

interface MobileMenuProps {
  user: User
  token?: string | null
}

export function MobileMenu({ user, token }: MobileMenuProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="mr-4 p-2 lg:hidden text-neutral-400 hover:text-white transition-colors"
      >
        <Menu className="h-6 w-6" />
      </button>

      <div
        className={`
        fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity
        ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `}
      >
        <div
          className={`
          fixed inset-y-0 left-0 w-64 bg-black transform transition-transform duration-300
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        >
          <Sidebar user={user} token={token} onClose={() => setIsMobileMenuOpen(false)} />
        </div>
      </div>
    </>
  )
}
