import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { DocumentWizard } from '@/components/document-wizard/document-wizard'
import { PageContainer } from '@/components/dashboard/layout/page-container'
import { currentUser } from '@/lib/auth'
import { User } from '@/payload-types'
import { getPayload } from 'payload'
import config from '@payload-config'

const payload = await getPayload({
  config: config,
})

async function generateDocument(data: { clientId: string; documentType: string }) {
  'use server'

  const cookieStore = await cookies()
  const token = cookieStore.get('payload-token')

  if (!token) {
    throw new Error('Unauthorized')
  }
  let response
  try {
    response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.value}`,
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(error || 'Failed to generate document')
    }
  } catch (error) {
    console.error('Error generating document:', error)
    throw error
  }

  const result = await response.json()

  return result
}

async function uploadDocument(file: File, user: User) {
  'use server'
  let result
  const cookieStore = await cookies()
  const token = cookieStore.get('payload-token')
  if (!token) {
    throw new Error('Unauthorized')
  }
  try {
    const formData = new FormData()
    formData.append('file', file)
    const uploadDocument = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/documents`, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })

    if (!uploadDocument) {
      throw new Error('Failed to upload document')
    }
    result = await uploadDocument.json()
    console.log(result)
  } catch (error) {
    throw error
  }

  try {
    await payload.update({
      collection: 'users',
      id: user.id,
      data: {
        documents: [...(user.documents || []), result.doc.id],
      },
    })
    return true
  } catch (error) {
    console.error('Error uploading document:', error)
    throw error
  }
}

export default async function NewDocumentPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('payload-token')

  if (!token) {
    redirect('/login')
  }

  const user = (await currentUser()) as User

  return (
    <PageContainer title="New Document" backUrl="/dashboard">
      <div className="py-8 w-full">
        <DocumentWizard
          user={user as User}
          clients={(user?.clients || []).map((client: any) => ({
            id: client.id,
            name: client.name,
            email: client.email,
            companyName: client.companyName,
            address: client.address,
          }))}
          onCompleteAction={generateDocument}
          onUploadAction={uploadDocument}
        />
      </div>
    </PageContainer>
  )
}
