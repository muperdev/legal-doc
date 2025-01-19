// import Link from 'next/link'
'use client'
import { FileText, Download } from 'lucide-react'
import { Document } from '@/payload-types'
import { formatDate, formatFileType } from '@/lib/utils'

interface DocumentListProps {
  documents: Document[]
}

export function DocumentList({ documents }: DocumentListProps) {
  const handleDownload = (doc: Document) => {
    if (!doc.url) return
    // Create a temporary link and trigger download
    const link = window.document.createElement('a')
    link.href = doc.url
    link.download = doc.filename || 'document'
    window.document.body.appendChild(link)
    link.click()
    window.document.body.removeChild(link)
  }

  return (
    <div className="bg-black overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-white/[0.06]">
        {documents.map((document) => (
          <li key={document.id}>
            <div
              className="block hover:bg-black/[0.02] transition-colors border-b border-white/50 cursor-pointer"
              onClick={() => handleDownload(document)}
            >
              <div className="py-4 px-4 flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-white truncate capitalize">
                      {document.filename}
                    </p>
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
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDownload(document)
                  }}
                  className="ml-4 p-2 rounded-lg hover:bg-primary/10 transition-colors group"
                >
                  <Download className="h-5 w-5 text-neutral-400 group-hover:text-primary" />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
