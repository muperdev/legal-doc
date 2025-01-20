import { Loader2 } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { DocumentType } from '../document-types'
import { ChangeEvent } from 'react'

interface DocumentDetailsProps {
  documentType: DocumentType | undefined
  answers: Record<string, string>
  setAnswers: (answers: Record<string, string>) => void
  error: string | null
  isLoading: boolean
  onBack: () => void
  onNext: () => void
}

export function DocumentDetails({
  documentType,
  answers,
  setAnswers,
  error,
  isLoading,
  onBack,
  onNext,
}: DocumentDetailsProps) {
  const handleAnswerChange = (questionId: string, value: string) => {
    // Ensure we have a value for number fields (convert empty string to '0')
    const processedValue =
      value === '' && documentType?.questions.find((q) => q.id === questionId)?.type === 'number'
        ? '0'
        : value

    setAnswers({
      ...answers,
      [questionId]: processedValue,
    })
  }

  if (!documentType) return null

  return (
    <>
      <CardHeader>
        <CardTitle className="text-white">Document Details</CardTitle>
        <CardDescription className="text-gray-500">
          Please provide the following information for your {documentType.name.toLowerCase()}.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {documentType.questions.map((question) => (
            <div key={question.id} className="space-y-2">
              <Label htmlFor={question.id} className="text-white">
                {question.label}
                {question.required && <span className="text-red-500 ml-1">*</span>}
              </Label>
              {question.type === 'textarea' ? (
                <Textarea
                  id={question.id}
                  placeholder={question.placeholder}
                  value={answers[question.id] || ''}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    handleAnswerChange(question.id, e.target.value)
                  }
                  className="min-h-[100px] text-white bg-neutral-800/50 border-neutral-800/50"
                />
              ) : (
                <Input
                  id={question.id}
                  type={question.type}
                  placeholder={question.placeholder}
                  value={answers[question.id] || ''}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleAnswerChange(question.id, e.target.value)
                  }
                  className="text-white bg-neutral-800/50 border-neutral-800/50"
                />
              )}
            </div>
          ))}
        </div>
        {error && <div className="mt-4 p-4 bg-red-50 text-red-600 ">{error}</div>}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          className="bg-black border-neutral-800/50"
          variant="outline"
          onClick={onBack}
          disabled={isLoading}
        >
          Back
        </Button>
        <Button className="bg-white text-black" onClick={onNext} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            'Generate Document'
          )}
        </Button>
      </CardFooter>
    </>
  )
}
