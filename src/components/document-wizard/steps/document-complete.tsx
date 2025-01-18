import { Check, Loader2, Download, ArrowLeft } from 'lucide-react'
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface DocumentCompleteProps {
  isLoading: boolean
  onBack: () => void
  onDownload: () => void
}

export function DocumentComplete({ isLoading, onBack, onDownload }: DocumentCompleteProps) {
  return (
    <>
      <CardHeader>
        <CardTitle>Document Generated Successfully!</CardTitle>
        <CardDescription>
          Your document has been generated and is ready for download.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-8">
        <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
          <Check className="h-6 w-6 text-green-600" />
        </div>
        <p className="text-gray-500 mb-8 text-center">
          Click the button below to download your document. You can also generate another document
          by going back.
        </p>
        <div className="flex gap-4">
          <Button variant="outline" onClick={onBack} disabled={isLoading}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <Button onClick={onDownload} disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Download className="h-4 w-4 mr-2" />
            )}
            Download Document
          </Button>
        </div>
      </CardContent>
    </>
  )
}
