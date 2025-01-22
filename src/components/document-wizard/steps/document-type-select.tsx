import { Check, Lock, Building2, Users2, Briefcase, Brain, Building, Coins } from 'lucide-react'
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { DocumentType, DOCUMENT_CATEGORIES, DocumentCategory } from '../document-types'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

interface DocumentTypeSelectProps {
  documentTypes: DocumentType[]
  selectedDocType: string
  setSelectedDocType: (id: string) => void
  error: string | null
  onBack: () => void
  onNext: () => void
  isPremium?: boolean
}

const CATEGORY_ICONS: Record<DocumentCategory, React.ComponentType<any>> = {
  business: Building2,
  employment: Users2,
  services: Briefcase,
  intellectual_property: Brain,
  real_estate: Building,
  financial: Coins,
}

export function DocumentTypeSelect({
  documentTypes,
  selectedDocType,
  setSelectedDocType,
  error,
  onBack,
  onNext,
  isPremium = false,
}: DocumentTypeSelectProps) {
  const [selectedCategory, setSelectedCategory] = useState<DocumentCategory | null>(null)

  // Ensure documentTypes is an array
  const documents = documentTypes || []

  console.log('Document Types:', documents)
  console.log('DOCUMENT_CATEGORIES:', DOCUMENT_CATEGORIES)

  // Group documents by category
  const documentsByCategory = documents.reduce(
    (acc, doc) => {
      if (!acc[doc.category]) {
        acc[doc.category] = []
      }
      acc[doc.category].push(doc)
      return acc
    },
    {} as Record<DocumentCategory, DocumentType[]>,
  )

  console.log('Documents by Category:', documentsByCategory)

  // Count documents in each category
  const categoryDocumentCounts = Object.entries(documentsByCategory).reduce(
    (acc, [category, docs]) => {
      acc[category as DocumentCategory] = {
        total: docs.length,
        free: docs.filter((doc) => doc.tier === 'free').length,
      }
      return acc
    },
    {} as Record<DocumentCategory, { total: number; free: number }>,
  )

  console.log('Category Document Counts:', categoryDocumentCounts)

  if (!selectedCategory) {
    return (
      <>
        <CardHeader>
          <CardTitle className="text-white">Choose Document Category</CardTitle>
          <CardDescription className="text-gray-500">
            Select a category to view available document types
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(DOCUMENT_CATEGORIES).map(([category, label]) => {
              const Icon = CATEGORY_ICONS[category as DocumentCategory]
              const counts = categoryDocumentCounts[category as DocumentCategory] || {
                free: 0,
                total: 0,
              }

              // Skip categories with no documents
              if (counts.total === 0) {
                return null
              }

              return (
                <div
                  key={category}
                  className="group relative overflow-hidden rounded-lg border-2 border-neutral-800/50 hover:border-white cursor-pointer transition-all bg-black/50 hover:bg-black/80"
                  onClick={() => setSelectedCategory(category as DocumentCategory)}
                >
                  <div className="p-6">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="p-3 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white text-lg">{label}</h3>
                        <p className="text-sm text-gray-400 mt-1">
                          {counts.free} free / {counts.total} total
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-yellow-500 to-yellow-600 transform scale-x-0 group-hover:scale-x-100 transition-transform" />
                </div>
              )
            })}
          </div>
          {error && <div className="mt-4 p-4 bg-red-50 text-red-600">{error}</div>}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            className="bg-black border-neutral-800/50 text-white hover:bg-white hover:text-black"
            variant="outline"
            onClick={onBack}
          >
            Back
          </Button>
        </CardFooter>
      </>
    )
  }

  const categoryDocuments = documentsByCategory[selectedCategory] || []

  return (
    <>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-white">Choose Document Type</CardTitle>
            <CardDescription className="text-gray-500">
              Select the type of legal document you want to generate
            </CardDescription>
          </div>
          <Button
            variant="outline"
            className="bg-black border-neutral-800/50 text-white hover:bg-white hover:text-black"
            onClick={() => setSelectedCategory(null)}
          >
            Change Category
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {categoryDocuments.map((docType) => {
            const isPremiumDoc = docType.tier === 'premium'
            const isDisabled = isPremiumDoc && !isPremium

            return (
              <div
                key={docType.id}
                className={cn(
                  'p-4 border-2 rounded-lg transition-all',
                  selectedDocType === docType.id
                    ? 'border-white bg-white/5'
                    : 'border-neutral-800/50 hover:border-white',
                  isDisabled && 'opacity-50 cursor-not-allowed hover:border-neutral-800/50',
                )}
                onClick={() => !isDisabled && setSelectedDocType(docType.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-white">{docType.name}</h3>
                      {isPremiumDoc && (
                        <Badge variant={isPremium ? 'default' : 'secondary'} className="text-xs">
                          {isPremium ? (
                            'PREMIUM'
                          ) : (
                            <div className="flex items-center gap-1">
                              <Lock className="h-3 w-3" /> PREMIUM
                            </div>
                          )}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{docType.description}</p>
                  </div>
                  {selectedDocType === docType.id && <Check className="h-5 w-5 text-primary" />}
                </div>
              </div>
            )
          })}
        </div>
        {error && <div className="mt-4 p-4 bg-red-50 text-red-600">{error}</div>}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          className="bg-black border-neutral-800/50 text-white hover:bg-white hover:text-black"
          variant="outline"
          onClick={onBack}
        >
          Back
        </Button>
        <Button
          className="bg-yellow-500 text-black hover:bg-yellow-600"
          onClick={onNext}
          disabled={!selectedDocType}
        >
          Next
        </Button>
      </CardFooter>
    </>
  )
}
