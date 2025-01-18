import { Check } from 'lucide-react'
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { DocumentType } from '../document-types'

interface DocumentTypeSelectProps {
  documentTypes: DocumentType[]
  selectedDocType: string
  setSelectedDocType: (id: string) => void
  error: string | null
  onBack: () => void
  onNext: () => void
}

export function DocumentTypeSelect({
  documentTypes,
  selectedDocType,
  setSelectedDocType,
  error,
  onBack,
  onNext,
}: DocumentTypeSelectProps) {
  return (
    <>
      <CardHeader>
        <CardTitle className="text-white">Choose Document Type</CardTitle>
        <CardDescription className="text-gray-500">
          Select the type of legal document you want to generate
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {documentTypes.map((docType) => (
            <div
              key={docType.id}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedDocType === docType.id
                  ? 'border-white bg-white/5'
                  : 'border-neutral-800/50 hover:border-white'
              }`}
              onClick={() => setSelectedDocType(docType.id)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-white ">{docType.name}</h3>
                  <p className="text-sm text-gray-500">{docType.description}</p>
                </div>
                {selectedDocType === docType.id && <Check className="h-5 w-5 text-primary" />}
              </div>
            </div>
          ))}
        </div>
        {error && <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-md">{error}</div>}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button className="bg-black border-neutral-800/50 text-white" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button className="bg-white text-black hover:bg-neutral-800/50 hover:text-white hover:border-white" onClick={onNext} disabled={!selectedDocType}>
          Next
        </Button>
      </CardFooter>
    </>
  )
}
