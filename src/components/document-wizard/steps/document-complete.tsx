import { Check, Loader2, Download, ArrowLeft, FileText } from 'lucide-react'
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface DocumentCompleteProps {
  isLoading: boolean
  isSubscribed: boolean
  onBack: () => void
  onDownload: () => void
  onWordDownload?: () => void
}

export function DocumentComplete({
  isLoading,
  isSubscribed,
  onBack,
  onDownload,
  onWordDownload,
}: DocumentCompleteProps) {
  return (
    <>
      <CardHeader>
        <CardTitle className="text-white">Document Generated Successfully!</CardTitle>
        <CardDescription>
          Your document has been generated and is ready for download.
          {isSubscribed && ' As a subscribed user, you can also download in Word format.'}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-8">
        <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
          <Check color="black" className="h-6 w-6 text-white" />
        </div>
        <p className="mb-8 text-center text-white">
          Click the button below to download your document.
          {!isSubscribed && (
            <span className="block mt-2 text-sm text-gray-400">
              Subscribe to unlock Word format downloads and more features!
            </span>
          )}
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
            Download PDF
          </Button>
          {isSubscribed && onWordDownload && (
            <Button onClick={onWordDownload} disabled={isLoading} variant="secondary">
              {isLoading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <FileText className="h-4 w-4 mr-2" />
              )}
              Download Word
            </Button>
          )}
        </div>
      </CardContent>
    </>
  )
}
