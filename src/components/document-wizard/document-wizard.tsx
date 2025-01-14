'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Loader2, UserPlus, Download, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { jsPDF } from 'jspdf'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { User } from '@/payload-types'
import { ChangeEvent } from 'react'

interface Client {
  id: string
  name: string
  email: string
  companyName?: string
  address?: string
}

interface DocumentType {
  id: string
  name: string
  description: string
  questions: Question[]
}

interface Question {
  id: string
  label: string
  type: 'text' | 'textarea' | 'number' | 'date'
  placeholder?: string
  required?: boolean
}

const DOCUMENT_TYPES: DocumentType[] = [
  {
    id: 'nda',
    name: 'Non-Disclosure Agreement',
    description: 'Protect your confidential information',
    questions: [
      {
        id: 'confidentialInfo',
        label: 'What type of confidential information will be shared?',
        type: 'textarea',
        placeholder: 'Describe the confidential information that will be protected...',
        required: true,
      },
      {
        id: 'duration',
        label: 'How long should the NDA remain in effect (in years)?',
        type: 'number',
        placeholder: '1',
        required: true,
      },
      {
        id: 'jurisdiction',
        label: "Which jurisdiction's laws will govern this agreement?",
        type: 'text',
        placeholder: 'e.g., California, United States',
        required: true,
      },
    ],
  },
  {
    id: 'freelance',
    name: 'Freelance Contract',
    description: 'Contract for freelance work',
    questions: [
      {
        id: 'scope',
        label: 'What is the scope of work?',
        type: 'textarea',
        placeholder: 'Describe the services to be provided...',
        required: true,
      },
      {
        id: 'deliverables',
        label: 'What are the specific deliverables?',
        type: 'textarea',
        placeholder: 'List all deliverables...',
        required: true,
      },
      {
        id: 'timeline',
        label: 'What is the project timeline?',
        type: 'text',
        placeholder: 'e.g., 3 months from start date',
        required: true,
      },
      {
        id: 'paymentTerms',
        label: 'What are the payment terms?',
        type: 'textarea',
        placeholder: 'Specify rate, payment schedule, and any milestones...',
        required: true,
      },
      {
        id: 'revisions',
        label: 'How many rounds of revisions are included?',
        type: 'number',
        placeholder: '2',
        required: true,
      },
    ],
  },
  {
    id: 'service',
    name: 'Service Agreement',
    description: 'Contract for service provision',
    questions: [
      {
        id: 'services',
        label: 'What services will be provided?',
        type: 'textarea',
        placeholder: 'Describe the services in detail...',
        required: true,
      },
      {
        id: 'serviceLevel',
        label: 'What are the service level requirements?',
        type: 'textarea',
        placeholder: 'Specify availability, response times, etc...',
        required: true,
      },
      {
        id: 'term',
        label: 'What is the initial term of the agreement?',
        type: 'text',
        placeholder: 'e.g., 12 months',
        required: true,
      },
      {
        id: 'fees',
        label: 'What are the service fees and payment terms?',
        type: 'textarea',
        placeholder: 'Specify pricing, billing frequency, payment terms...',
        required: true,
      },
    ],
  },
  {
    id: 'consulting',
    name: 'Consulting Agreement',
    description: 'Contract for consulting services',
    questions: [
      {
        id: 'consultingServices',
        label: 'What consulting services will be provided?',
        type: 'textarea',
        placeholder: 'Describe the consulting services...',
        required: true,
      },
      {
        id: 'expertise',
        label: 'What specific expertise or industry knowledge is required?',
        type: 'textarea',
        placeholder: 'List required expertise and qualifications...',
        required: true,
      },
      {
        id: 'availability',
        label: 'What is the expected time commitment?',
        type: 'text',
        placeholder: 'e.g., 20 hours per week',
        required: true,
      },
      {
        id: 'compensation',
        label: 'What are the compensation terms?',
        type: 'textarea',
        placeholder: 'Specify hourly rate, retainer, or project-based fees...',
        required: true,
      },
      {
        id: 'expenses',
        label: 'What is the policy on reimbursable expenses?',
        type: 'textarea',
        placeholder: 'Specify which expenses are reimbursable and the process...',
        required: true,
      },
    ],
  },
]

interface DocumentWizardProps {
  clients: Client[]
  user: User
  onComplete: (data: {
    clientId: string
    documentType: string
    answers: Record<string, string>
  }) => Promise<{ html: string; filename: string }>
  onUpload: (file: File, user: User) => Promise<boolean>
}

// Add a helper function to format the content with answers
const formatContentWithAnswers = (
  content: string,
  answers: Record<string, string>,
  selectedClientData: Client,
) => {
  // Create a mapping of placeholders to their values
  const replacements: Record<string, string> = {
    '[Detailed Description of Services]': answers.scope || '',
    '[List Deliverables]': answers.deliverables || '',
    '[Total Fee]':
      answers.paymentTerms?.split(' ')[answers.paymentTerms?.split(' ').length - 1] || '',
    '[Payment Amount]': answers.paymentTerms?.split('each is ')[1]?.split(' ')[0] || '',
    '[Specific Milestone]': 'project milestones as outlined in the scope of work',
    '[Number]': '30', // Default payment terms
  }

  // Replace all placeholders with their values
  let formattedContent = content
  Object.entries(replacements).forEach(([placeholder, value]) => {
    formattedContent = formattedContent.replace(new RegExp(placeholder, 'g'), value)
  })

  return formattedContent
}

export function DocumentWizard({ clients, user, onComplete, onUpload }: DocumentWizardProps) {
  const [step, setStep] = useState(1)
  const [selectedClient, setSelectedClient] = useState<string>('')
  const [selectedDocType, setSelectedDocType] = useState<string>('')
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [generatedDoc, setGeneratedDoc] = useState<{ html: string; filename: string } | null>(null)

  const selectedDocumentType = DOCUMENT_TYPES.find((dt) => dt.id === selectedDocType)

  // If there are no clients, show a message and link to add clients
  if (clients.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Clients Found</CardTitle>
          <CardDescription>
            You need to add at least one client before you can generate documents.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <UserPlus className="h-16 w-16 text-gray-400 mb-4" />
          <p className="text-gray-500 mb-4 text-center">
            Start by adding your first client to generate legal documents for them.
          </p>
          <Link href="/dashboard/clients/new">
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Add Your First Client
            </Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  const handleNext = async () => {
    if (step === 1 && selectedClient) {
      setStep(2)
    } else if (step === 2 && selectedDocType) {
      setStep(3)
    } else if (step === 3 && selectedDocumentType) {
      // Validate all required questions are answered
      const unansweredRequired = selectedDocumentType.questions
        .filter((q) => {
          const answer = answers[q.id]
          return q.required && (!answer || answer.trim() === '')
        })
        .map((q) => q.label)

      if (unansweredRequired.length > 0) {
        setError(`Please answer the following required questions: ${unansweredRequired.join(', ')}`)
        return
      }

      setIsLoading(true)
      setError(null)
      try {
        // Format answers in a more structured way for the AI model
        const formattedAnswers = {
          // Common fields
          clientName: clients.find((c) => c.id === selectedClient)?.name || '',
          clientCompany: clients.find((c) => c.id === selectedClient)?.companyName || '',
          clientAddress: clients.find((c) => c.id === selectedClient)?.address || '',
          documentType: selectedDocType,

          // Document specific fields
          scope: answers.scope || answers.services || answers.consultingServices || '',
          deliverables: answers.deliverables || '',
          timeline: answers.timeline || answers.term || '',
          payment: answers.paymentTerms || answers.fees || answers.compensation || '',
          revisions: answers.revisions || '2',

          // Additional fields based on document type
          ...(selectedDocType === 'nda' && {
            confidentialInfo: answers.confidentialInfo || '',
            duration: answers.duration || '',
            jurisdiction: answers.jurisdiction || '',
          }),
          ...(selectedDocType === 'service' && {
            serviceLevel: answers.serviceLevel || '',
          }),
          ...(selectedDocType === 'consulting' && {
            expertise: answers.expertise || '',
            availability: answers.availability || '',
            expenses: answers.expenses || '',
          }),
        }

        const result = await onComplete({
          clientId: selectedClient,
          documentType: selectedDocType,
          answers: formattedAnswers,
        })

        // Validate the response format
        if (!result.html || typeof result.html !== 'string') {
          throw new Error('Invalid document format received from server')
        }

        setGeneratedDoc(result)
        setStep(4)
      } catch (error) {
        console.error('Error generating document:', error)
        setError(error instanceof Error ? error.message : 'Failed to generate document')
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleBack = () => {
    if (step === 2) {
      setStep(1)
      setError(null)
    } else if (step === 3) {
      setStep(2)
      setError(null)
    } else if (step === 4) {
      setStep(3)
      setError(null)
    }
  }

  const handleAnswerChange = (questionId: string, value: string) => {
    // Ensure we have a value for number fields (convert empty string to '0')
    const processedValue =
      value === '' &&
      selectedDocumentType?.questions.find((q) => q.id === questionId)?.type === 'number'
        ? '0'
        : value

    setAnswers((prev) => ({
      ...prev,
      [questionId]: processedValue,
    }))
  }

  const handleDownload = async () => {
    if (!generatedDoc) return

    setIsLoading(true)
    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'a4',
      })

      // Set up fonts
      doc.setFont('times', 'normal')

      // Page dimensions
      const pageWidth = doc.internal.pageSize.getWidth()
      const pageHeight = doc.internal.pageSize.getHeight()
      const margin = 72 // 1 inch margins
      const contentWidth = pageWidth - margin * 2

      // Helper function to add text with word wrap and page breaks
      const addWrappedText = (
        text: string,
        x: number,
        y: number,
        maxWidth: number,
        lineHeight: number,
      ) => {
        const lines = doc.splitTextToSize(text, maxWidth)
        let currentY = y

        for (let i = 0; i < lines.length; i++) {
          if (currentY > pageHeight - margin - 50) {
            doc.addPage()
            currentY = margin + 50
          }
          doc.text(lines[i], x, currentY)
          currentY += lineHeight
        }
        return currentY - y
      }

      // Header
      doc.setFontSize(18)
      doc.setFont('times', 'bold')
      const title = generatedDoc.filename.split('.')[0].toUpperCase()
      const titleWidth = doc.getTextWidth(title)
      doc.text(title, (pageWidth - titleWidth) / 2, margin + 24)

      // Date
      doc.setFontSize(12)
      doc.setFont('times', 'normal')
      const date = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
      doc.text(date, pageWidth - margin - doc.getTextWidth(date), margin + 72)

      // Get selected client data
      const selectedClientData = clients.find((client) => client.id === selectedClient)
      if (!selectedClientData) throw new Error('Client data not found')

      // Parties
      let yPos = margin + 120
      doc.setFont('times', 'bold')
      yPos += addWrappedText('THIS AGREEMENT', margin, yPos, contentWidth, 16)
      doc.setFont('times', 'normal')
      yPos += addWrappedText(
        `is made and entered into as of ${date}, by and between ${user.firstName} ${user.lastName}, with offices located at ${user.address || '[Address pending]'} ("Service Provider"), and ${selectedClientData.name}${selectedClientData.companyName ? `, ${selectedClientData.companyName}` : ''}, with offices located at ${selectedClientData.address || '[Address pending]'} ("Client").`,
        margin,
        yPos + 16,
        contentWidth,
        16,
      )

      // Content sections
      doc.setFontSize(12)
      yPos += 48

      // Format the content with answers before splitting into sections
      const formattedContent = formatContentWithAnswers(
        generatedDoc.html,
        answers,
        selectedClientData,
      )

      // Split content into sections
      const sections = formattedContent.split(/(?=\d+\.\s+)/)
      for (const section of sections) {
        if (yPos > pageHeight - margin - 200) {
          doc.addPage()
          yPos = margin + 50
        }

        if (section.trim()) {
          // Check if it's a section header
          if (/^\d+\.\s+[A-Z]/.test(section)) {
            doc.setFont('times', 'bold')
            yPos += addWrappedText(section.split('\n')[0], margin, yPos, contentWidth, 16)
            doc.setFont('times', 'normal')

            // Add the rest of the section content
            const content = section.split('\n').slice(1).join('\n')
            if (content.trim()) {
              yPos += addWrappedText(content, margin, yPos + 16, contentWidth, 16)
            }
          } else {
            yPos += addWrappedText(section, margin, yPos, contentWidth, 16)
          }
          yPos += 16 // Add spacing between sections
        }
      }

      // Add signature page
      if (yPos > pageHeight - margin - 300) {
        doc.addPage()
        yPos = margin + 50
      }

      // Signature blocks
      doc.setFont('times', 'bold')
      doc.text('FOR AND ON BEHALF OF THE FIRST PARTY:', margin, yPos)
      doc.line(margin, yPos + 48, margin + 200, yPos + 48)
      doc.setFont('times', 'normal')
      doc.text('Name:', margin, yPos + 72)
      doc.text('Title:', margin, yPos + 96)
      doc.text('Date:', margin, yPos + 120)

      doc.setFont('times', 'bold')
      doc.text('FOR AND ON BEHALF OF THE SECOND PARTY:', pageWidth - margin - 300, yPos)
      doc.line(pageWidth - margin - 200, yPos + 48, pageWidth - margin, yPos + 48)
      doc.setFont('times', 'normal')
      doc.text('Name:', pageWidth - margin - 200, yPos + 72)
      doc.text('Title:', pageWidth - margin - 200, yPos + 96)
      doc.text('Date:', pageWidth - margin - 200, yPos + 120)

      // Footer on all pages
      const pageCount = doc.internal.pages.length - 1
      doc.setFontSize(10)
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i)
        doc.text(`Page ${i} of ${pageCount}`, pageWidth - margin - 72, pageHeight - margin)
        doc.text('CONFIDENTIAL', margin, pageHeight - margin)
      }

      // Get the PDF as a Blob
      const pdfBlob = doc.output('blob')

      // Create a File object from the Blob
      const pdfFile = new File([pdfBlob], generatedDoc.filename, { type: 'application/pdf' })

      // Save the PDF locally
      doc.save(generatedDoc.filename)

      // Create FormData and append the file
      const formData = new FormData()
      formData.append('file', pdfFile)

      // Upload the file using the onUpload function
      await onUpload(pdfFile, user)
    } catch (error) {
      console.error('Error handling document:', error)
      setError(error instanceof Error ? error.message : 'Failed to process document')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">
              {step === 4 ? 'Complete' : `Step ${step} of 3`}
            </p>
            <h2 className="text-lg font-bold">
              {step === 1
                ? 'Select Client'
                : step === 2
                  ? 'Choose Document Type'
                  : step === 3
                    ? 'Document Details'
                    : 'Document Generated'}
            </h2>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`h-2 w-2 rounded-full ${step >= 1 ? 'bg-primary' : 'bg-gray-200'}`} />
            <div className={`h-2 w-2 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-gray-200'}`} />
            <div className={`h-2 w-2 rounded-full ${step >= 3 ? 'bg-primary' : 'bg-gray-200'}`} />
            <div className={`h-2 w-2 rounded-full ${step >= 4 ? 'bg-primary' : 'bg-gray-200'}`} />
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          <Card>
            {step === 4 ? (
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
                    Click the button below to download your document. You can also generate another
                    document by going back.
                  </p>
                  <div className="flex gap-4">
                    <Button variant="outline" onClick={handleBack} disabled={isLoading}>
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back
                    </Button>
                    <Button onClick={handleDownload} disabled={isLoading}>
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
            ) : step === 3 ? (
              <>
                <CardHeader>
                  <CardTitle>Document Details</CardTitle>
                  <CardDescription>
                    Please provide the following information for your{' '}
                    {selectedDocumentType?.name.toLowerCase()}.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {selectedDocumentType?.questions.map((question) => (
                      <div key={question.id} className="space-y-2">
                        <Label htmlFor={question.id}>
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
                            className="min-h-[100px]"
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
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  {error && (
                    <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-md">{error}</div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={handleBack} disabled={isLoading}>
                    Back
                  </Button>
                  <Button onClick={handleNext} disabled={isLoading} className="ml-auto">
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
            ) : (
              <>
                <CardHeader>
                  <CardTitle>{step === 1 ? 'Select a Client' : 'Choose Document Type'}</CardTitle>
                  <CardDescription>
                    {step === 1
                      ? 'Choose the client for whom you want to generate a document'
                      : 'Select the type of legal document you want to generate'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {step === 1 ? (
                    <Select value={selectedClient} onValueChange={setSelectedClient}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a client" />
                      </SelectTrigger>
                      <SelectContent>
                        {clients.map((client) => (
                          <SelectItem key={client.id} value={client.id}>
                            {client.name} {client.companyName ? `(${client.companyName})` : ''}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="grid gap-4">
                      {DOCUMENT_TYPES.map((docType) => (
                        <div
                          key={docType.id}
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            selectedDocType === docType.id
                              ? 'border-primary bg-primary/5'
                              : 'border-gray-200 hover:border-primary/50'
                          }`}
                          onClick={() => setSelectedDocType(docType.id)}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium">{docType.name}</h3>
                              <p className="text-sm text-gray-500">{docType.description}</p>
                            </div>
                            {selectedDocType === docType.id && (
                              <Check className="h-5 w-5 text-primary" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {error && (
                    <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-md">{error}</div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  {step === 2 && (
                    <Button variant="outline" onClick={handleBack} disabled={isLoading}>
                      Back
                    </Button>
                  )}
                  <Button
                    onClick={handleNext}
                    disabled={
                      (step === 1 && !selectedClient) ||
                      (step === 2 && !selectedDocType) ||
                      isLoading
                    }
                    className="ml-auto"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      'Next'
                    )}
                  </Button>
                </CardFooter>
              </>
            )}
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
