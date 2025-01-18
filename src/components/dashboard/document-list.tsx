import Link from 'next/link'
import { FileText } from 'lucide-react'
import { Document } from '@/payload-types'
import { formatDate, formatFileType } from '@/lib/utils'

interface DocumentListProps {
  documents: Document[]
}

export function DocumentList({ documents }: DocumentListProps) {
  return (
    <div className="bg-black border border-neutral-800/50/[0.06] overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-white/[0.06]">
        {documents.map((document) => (
          <li key={document.id}>
            <Link
              href={`/dashboard/documents/${document.id}`}
              className="block hover:bg-black/[0.02] transition-colors"
            >
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-white truncate">{document.filename}</p>
                  <div className="ml-2 flex-shrink-0 flex">
                    <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-black/[0.06] text-white">
                      {document.mimeType ? formatFileType(document.mimeType) : 'Unknown'}
                    </p>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-neutral-400">
                      <FileText className="flex-shrink-0 mr-1.5 h-5 w-5 text-neutral-400" />
                      {document.mimeType ? formatFileType(document.mimeType) : 'Unknown'}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-neutral-400 sm:mt-0">
                    <p>
                      Last edited on{' '}
                      {document.updatedAt ? formatDate(document.updatedAt) : 'Unknown'}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
