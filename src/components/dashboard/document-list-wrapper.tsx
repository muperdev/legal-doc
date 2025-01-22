import { LockKeyhole } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DocumentList } from './document-list'
import { Document } from '@/payload-types'
import Link from 'next/link'

interface DocumentListWrapperProps {
  documents: Document[]
  isSubscribed: boolean
}

export function DocumentListWrapper({ documents, isSubscribed }: DocumentListWrapperProps) {
  if (!isSubscribed) {
    return (
      <div className="relative">
        <div className="filter blur-[2px] pointer-events-none">
          <DocumentList documents={documents} />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80">
          <LockKeyhole className="h-12 w-12 text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">
            Subscribe to Access Document History
          </h3>
          <p className="text-gray-400 mb-6 text-center max-w-md">
            Upgrade your account to view and manage your document history, download in multiple
            formats, and more.
          </p>
          <Link href="/dashboard/subscription">
            <Button className="bg-yellow-500 text-black hover:bg-yellow-400">Upgrade Now</Button>
          </Link>
        </div>
      </div>
    )
  }

  return <DocumentList documents={documents} />
}
