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
    if (user.subscription?.status === 'active') {
      await payload.update({
        collection: 'users',
        id: user.id,
        data: {
          documents: [...(user.documents || []), result.doc.id],
        },
      })
    } else if (user.subscriptionLimit === 1) {
      await payload.update({
        collection: 'users',
        id: user.id,
        data: {
          documents: [...(user.documents || []), result.doc.id],
          subscriptionLimit: 0,
          exceededLimit: true,
        },
      })
    } else {
      await payload.update({
        collection: 'users',
        id: user.id,
        data: {
          documents: [...(user.documents || []), result.doc.id],
          subscriptionLimit: (user.subscriptionLimit || 5) - 1,
        },
      })
    }
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
  const userData = await payload.findByID({
    collection: 'users',
    id: user?.id.toString() || '0',
  })
  return (
    <PageContainer title="New Document" backUrl="/dashboard">
      <div className="py-8 w-full">
        <DocumentWizard
          token={token.value}
          user={user as User}
          clients={(userData?.clients || []).map((client: any) => ({
            id: client.id,
            name: client.name,
            email: client.email,
            companyName: client.companyName,
            address: client.address,
          }))}
          onUploadAction={uploadDocument}
        />
      </div>
    </PageContainer>
  )
}
