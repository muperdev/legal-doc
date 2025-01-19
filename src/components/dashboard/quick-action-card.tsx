'use client'

import Link from 'next/link'

interface QuickActionCardProps {
  title: string
  description: string
  icon: React.ReactNode
  href: string
}

export function QuickActionCard({ title, description, icon, href }: QuickActionCardProps) {
  return (
    <Link
      href={href}
      className="group block space-y-6 rounded-lg border border-neutral-800 bg-black p-6 transition-all duration-200 hover:border-primary/50"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
        <div className="text-primary">{icon}</div>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="mt-2 text-sm text-gray-300">{description}</p>
      </div>
    </Link>
  )
}
