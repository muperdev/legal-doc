import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface PageContainerProps {
  children: React.ReactNode
  title: string
  backUrl?: string
}

export function PageContainer({ children, title, backUrl }: PageContainerProps) {
  return (
    <div className="flex-1 overflow-auto bg-black">
      <header className="bg-black border-b border-neutral-800/50/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center">
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
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">{children}</main>
    </div>
  )
}
