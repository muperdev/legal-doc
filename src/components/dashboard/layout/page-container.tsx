import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { User } from '@/payload-types'
import { MobileMenu } from './mobile-menu'

interface PageContainerProps {
  children: React.ReactNode
  title: string
  backUrl?: string
  showSubscribeButton?: boolean
  token?: string | null
  user: User
}

export function PageContainer({ children, title, backUrl, user }: PageContainerProps) {
  return (
    <div className="flex-1 overflow-auto bg-black">
      <header className="bg-black border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <MobileMenu user={user} />
              {backUrl && (
                <Link
                  href={backUrl}
                  className="mr-4 p-2 -ml-2 text-neutral-400 hover:text-white transition-colors"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              )}
              <h1 className="text-3xl font-bold text-white">{title}</h1>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">{children}</main>
    </div>
  )
}
