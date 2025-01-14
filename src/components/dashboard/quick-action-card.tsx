import Link from 'next/link'
import { QuickActionCardProps } from '@/types/dashboard'

export function QuickActionCard({ title, description, icon, href }: QuickActionCardProps) {
  return (
    <Link
      href={href}
      className="block bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-300"
    >
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              {icon}
            </div>
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}
