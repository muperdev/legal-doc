import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface PageContainerProps {
  children: React.ReactNode
  title: string
  subtitle?: string
  backUrl?: string
}

export function PageContainer({ children, title, subtitle, backUrl }: PageContainerProps) {
  return (
    <div className="flex-1 overflow-auto bg-gray-100 font-sans">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            {backUrl && (
              <Link href={backUrl} className="mr-4 text-gray-500 hover:text-gray-700">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            )}
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">{title}</h1>
              {subtitle && <p className="mt-2 text-lg text-gray-600">{subtitle}</p>}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</main>
    </div>
  )
}
