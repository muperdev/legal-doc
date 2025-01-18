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
      className="block p-6 bg-black border border-neutral-800/50/[0.06] rounded-lg hover:bg-black/[0.02] transition-colors"
    >
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <div className="flex items-center justify-center h-12 w-12 rounded-md bg-black/[0.06] text-white">
            {icon}
          </div>
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-medium text-white">{title}</h3>
          <p className="mt-1 text-sm text-neutral-400">{description}</p>
        </div>
      </div>
    </Link>
  )
}
