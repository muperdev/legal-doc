import { generateText } from 'ai'
import { openai } from '@ai-sdk/openai'
import { NextResponse } from 'next/server'

export const runtime = 'edge'

export async function POST(req: Request) {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response('Unauthorized', { status: 401 })
    }

    const token = authHeader.split(' ')[1]
    const { clientId, documentType } = await req.json()

    // Get client data from Payload REST API
    const clientResponse = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/clients/${clientId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    if (!clientResponse.ok) {
      return new Response('Client not found', { status: 404 })
    }

    const client = await clientResponse.json()

    // Generate document content using OpenAI
    const prompt = generatePrompt(documentType, client)
    const { text: documentContent } = await generateText({
      model: openai('gpt-4-turbo'),
      prompt,
    })

    // Return the content and metadata
    return NextResponse.json({
      html: documentContent,
      filename: `${documentType}-${client.name}.pdf`,
      metadata: {
        title: `${documentType.toUpperCase()} AGREEMENT`,
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        firstParty: {
          name: client.companyName || client.name,
          address: client.address || '[Address]',
        },
        documentType: documentType.toUpperCase(),
      },
    })
  } catch (error) {
    console.error('Error generating document:', error)
    return new Response('Failed to generate document', { status: 500 })
  }
}

function generatePrompt(documentType: string, client: any): string {
  const basePrompt = `Generate a professional ${documentType} agreement for ${client.name}. The content should be structured with clear sections and subsections. Each section should be numbered. Include all standard clauses and provisions typically found in a ${documentType} agreement. The content should be formal and legally sound.`

  switch (documentType) {
    case 'nda':
      return `${basePrompt} Include sections for:
1. Confidential Information Definition
2. Scope of Confidentiality
3. Exclusions from Confidentiality
4. Term and Termination
5. Return of Confidential Information
6. Remedies
7. Miscellaneous Provisions`

    case 'freelance':
      return `${basePrompt} Include sections for:
1. Scope of Services
2. Payment Terms and Schedule
3. Intellectual Property Rights
4. Independent Contractor Status
5. Term and Termination
6. Confidentiality
7. Warranties and Indemnification
8. General Provisions`

    case 'service':
      return `${basePrompt} Include sections for:
1. Services Description
2. Service Level Requirements
3. Payment Terms
4. Term and Termination
5. Warranties
6. Limitation of Liability
7. Confidentiality
8. General Provisions`

    case 'consulting':
      return `${basePrompt} Include sections for:
1. Consulting Services
2. Term and Termination
3. Compensation
4. Independent Contractor Status
5. Confidentiality
6. Intellectual Property
7. Non-Competition
8. General Provisions`

    default:
      return basePrompt
  }
}
