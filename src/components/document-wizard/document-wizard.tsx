'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { UserPlus } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { User } from '@/payload-types'
import { DOCUMENT_TYPES } from './document-types'
import { StepProgress } from './step-progress'
import { ClientSelect } from './steps/client-select'
import { DocumentTypeSelect } from './steps/document-type-select'
import { DocumentDetails } from './steps/document-details'
import { DocumentComplete } from './steps/document-complete'
import { RoleSelect } from './steps/role-select'
import { generatePDF } from '@/lib/pdf/generate-pdf'
import { generateWord } from '@/lib/word/generate-word'
import { LegalDocument } from '@/lib/pdf/document-structure'
import { isSubscribed } from '@/lib/subscription-checker'

interface Client {
  id: string
  name: string
  email: string
  companyName?: string
  address?: string
}

interface GeneratedDocument {
  document: LegalDocument
  filename: string
}

interface DocumentWizardProps {
  clients: Client[]
  user: User & { exceededLimit?: boolean | null }
  onCompleteAction: (data: {
    clientId: string
    documentType: string
    answers: Record<string, string>
    userRole: 'client' | 'provider'
    serviceProviderId: string
  }) => Promise<GeneratedDocument>
  onUploadAction: (file: File, user: User) => Promise<boolean>
}

export function DocumentWizard({
  clients,
  user,
  onCompleteAction,
  onUploadAction,
}: DocumentWizardProps) {
  const [step, setStep] = useState(1)
  const [userRole, setUserRole] = useState<'client' | 'provider' | null>(null)
  const [selectedClient, setSelectedClient] = useState('')
  const [selectedDocType, setSelectedDocType] = useState('')
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [generatedDoc, setGeneratedDoc] = useState<GeneratedDocument | null>(null)

  const selectedDocumentType = DOCUMENT_TYPES.find((dt) => dt.id === selectedDocType)
  const selectedClientData = clients.find((client) => client.id === selectedClient)

  // Check if user has exceeded their limit
  if (user.exceededLimit) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Document Limit Reached</CardTitle>
          <CardDescription>You have reached your document generation limit.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <p className="text-gray-500 mb-4 text-center">
            Subscribe to our premium plan to generate unlimited documents.
          </p>
          <Link href="/dashboard/subscription">
            <Button>Subscribe Now</Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  // If there are no clients, show add client prompt
  if (clients.length === 0) {
    return (
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-zinc-100">No Clients Found</CardTitle>
          <CardDescription className="text-zinc-400">
            You need to add at least one client before you can generate documents.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <UserPlus className="h-16 w-16 text-zinc-600 mb-4" />
          <p className="text-zinc-400 mb-4 text-center">
            Add your first client with their details including name, email, phone number, and
            company information.
          </p>
          <Link href="/dashboard/clients/new">
            <Button variant="default" className="bg-yellow-500 hover:bg-yellow-600 text-black">
              <UserPlus className="h-4 w-4 mr-2" />
              Add Your First Client
            </Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  const handleNext = async () => {
    if (step === 1 && userRole) {
      setStep(2)
    } else if (step === 2 && selectedClient) {
      setStep(3)
    } else if (step === 3 && selectedDocType) {
      setStep(4)
    } else if (step === 4 && selectedDocumentType) {
      // Validate required answers
      const unansweredRequired = selectedDocumentType.questions
        .filter((q) => q.required && (!answers[q.id] || answers[q.id].trim() === ''))
        .map((q) => q.label)

      if (unansweredRequired.length > 0) {
        setError(`Please answer the following required questions: ${unansweredRequired.join(', ')}`)
        return
      }

      setIsLoading(true)
      setError(null)
      try {
        const result = await onCompleteAction({
          clientId: selectedClient,
          serviceProviderId: user.id.toString(),
          documentType: selectedDocType,
          answers: {
            clientName: selectedClientData?.name || '',
            clientCompany: selectedClientData?.companyName || '',
            clientAddress: selectedClientData?.address || '',
            documentType: selectedDocType,
            ...answers,
          },
          userRole: userRole || 'client',
        })

        setGeneratedDoc(result)
        setStep(5)
      } catch (error) {
        console.error('Error generating document:', error)
        setError(error instanceof Error ? error.message : 'Failed to generate document')
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleBack = () => {
    setStep(Math.max(1, step - 1))
  }

  const handleDownload = async () => {
    if (!generatedDoc || !selectedClientData) return

    setIsLoading(true)
    try {
      const pdfBlob = await generatePDF(generatedDoc.document)
      const pdfFile = new File([pdfBlob], generatedDoc.filename, { type: 'application/pdf' })

      // Save the PDF locally
      const url = URL.createObjectURL(pdfBlob)
      const link = document.createElement('a')
      link.href = url
      link.download = generatedDoc.filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      // Upload the file
      await onUploadAction(pdfFile, user)
    } catch (error) {
      console.error('Error handling document:', error)
      setError(error instanceof Error ? error.message : 'Failed to process document')
    } finally {
      setIsLoading(false)
    }
  }

  const handleWordDownload = async () => {
    if (!generatedDoc || !selectedClientData) return

    setIsLoading(true)
    try {
      const wordBlob = await generateWord(generatedDoc.document)
      const wordFile = new File([wordBlob], generatedDoc.filename.replace('.pdf', '.docx'), {
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      })

      // Save locally
      const url = URL.createObjectURL(wordBlob)
      const link = document.createElement('a')
      link.href = url
      link.download = wordFile.name
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      // Upload to storage
      await onUploadAction(wordFile, user)
    } catch (error) {
      console.error('Error handling Word document:', error)
      setError(error instanceof Error ? error.message : 'Failed to process Word document')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full mx-auto">
      <StepProgress step={step} totalSteps={5} />

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          <Card className="bg-black">
            {step === 5 ? (
              <DocumentComplete
                isLoading={isLoading}
                isSubscribed={isSubscribed(user)}
                onBack={handleBack}
                onDownload={handleDownload}
                onWordDownload={handleWordDownload}
              />
            ) : step === 4 ? (
              <DocumentDetails
                documentType={selectedDocumentType}
                answers={answers}
                setAnswers={setAnswers}
                error={error}
                isLoading={isLoading}
                onBack={handleBack}
                onNext={handleNext}
              />
            ) : step === 1 ? (
              <RoleSelect
                selectedRole={userRole}
                setSelectedRole={setUserRole}
                error={error}
                onNext={handleNext}
              />
            ) : step === 2 ? (
              <ClientSelect
                clients={clients}
                selectedClient={selectedClient}
                setSelectedClient={setSelectedClient}
                error={error}
                onNext={handleNext}
                onBack={handleBack}
                roleContext={userRole === 'provider' ? 'Select Client' : 'Select Service Provider'}
              />
            ) : (
              <DocumentTypeSelect
                documentTypes={DOCUMENT_TYPES}
                selectedDocType={selectedDocType}
                setSelectedDocType={setSelectedDocType}
                error={error}
                onBack={handleBack}
                onNext={handleNext}
              />
            )}
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
