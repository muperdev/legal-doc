import { generateText } from 'ai'
import { openai } from '@ai-sdk/openai'
import { NextResponse } from 'next/server'
import { LegalDocument } from '@/lib/pdf/document-structure'
import { Client, User } from '@/payload-types'

export const maxDuration = 300 // 5 minutes for Pro plan
export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  const startTime = Date.now()
  console.log('🕒 Starting document generation process')

  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response('Unauthorized', { status: 401 })
    }

    const token = authHeader.split(' ')[1]
    const { serviceProviderId, clientId, documentType, answers } = await req.json()
    console.log(`📝 Document Type: ${documentType}`)

    // Fetch service provider details with timeout
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 30000)

    try {
      console.log('🔍 Fetching service provider details...')
      const fetchProviderStart = Date.now()
      const serviceProviderResponse = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${serviceProviderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          signal: controller.signal,
        },
      )
      console.log(`⏱️ Service provider fetch took: ${Date.now() - fetchProviderStart}ms`)

      if (!serviceProviderResponse.ok) {
        return new Response('Service provider not found', { status: 404 })
      }

      const serviceProvider = await serviceProviderResponse.json()

      // Fetch client details with timeout
      console.log('🔍 Fetching client details...')
      const fetchClientStart = Date.now()
      const clientResponse = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/clients/${clientId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          signal: controller.signal,
        },
      )
      console.log(`⏱️ Client fetch took: ${Date.now() - fetchClientStart}ms`)

      if (!clientResponse.ok) {
        return new Response('Client not found', { status: 404 })
      }

      const client = await clientResponse.json()

      console.log('📋 Generating prompt...')
      const promptStart = Date.now()
      const prompt = generatePrompt(documentType, serviceProvider, client, answers)
      console.log(`⏱️ Prompt generation took: ${Date.now() - promptStart}ms`)

      // Set timeout for the AI generation
      const aiTimeout = setTimeout(() => controller.abort(), 240000)

      console.log('🤖 Starting AI document generation...')
      const aiStart = Date.now()
      const { text: documentContent } = await generateText({
        model: openai('gpt-4'),
        prompt,
        temperature: 0.8,
        system: `You are a professional legal document generator. Generate a structured JSON document following this exact interface:

interface LegalDocument {
  metadata: {
    date: string (current date in long format)
    title: string (document type in title case + "Agreement")
    documentType: string (uppercase document type)
    parties: {
      firstParty: {
        name: string
        address?: string
        companyName?: string
      }
      secondParty: {
        name: string
        address?: string
        companyName?: string
      }
    }
  }
  recitals: {
    whereas: string[] (2-3 relevant whereas clauses)
    agreement: string (standard "NOW, THEREFORE" agreement text)
  }
  sections: {
    title: string
    content: string[] (IMPORTANT: Each section MUST have at least 3-4 detailed paragraphs. Single-line responses are not acceptable.)
    subsections?: {
      title: string
      content: string[] (Each subsection must also have multiple detailed paragraphs)
    }[]
  }[]
  signatures: {
    firstParty: {
      name: string
      title?: string
      date: string (current date)
    }
    secondParty: {
      name: string
      title?: string
      date: string (current date)
    }
  }
}

CRITICAL SECTION CONTENT REQUIREMENTS:
1. Each section's content array MUST contain 3-4 detailed paragraphs minimum
2. Each paragraph must be at least 4-5 sentences long
3. Single-line or brief responses are NOT acceptable
4. Content must be comprehensive and detailed
5. Use proper legal language and formatting
6. Include specific terms, conditions, and obligations
7. Break down complex topics into clear, detailed explanations
8. Include examples and specific scenarios where appropriate
9. Define all technical terms and concepts thoroughly
10. Ensure proper cross-referencing between sections

REQUIREMENTS:
1. Return valid JSON that exactly matches the interface above
2. Use clear, legally precise language
3. Include all standard sections for the document type
4. Incorporate both parties' details and answers
5. Ensure proper document structure and formatting
6. Use proper legal document style and terminology
7. NEVER return single-line section content
8. Each section must be thorough and detailed`,
      })
      console.log(`⏱️ AI generation took: ${Date.now() - aiStart}ms`)

      clearTimeout(aiTimeout)

      console.log('🔄 Parsing AI response...')
      const parseStart = Date.now()
      const document: LegalDocument = JSON.parse(documentContent)
      console.log(`⏱️ JSON parsing took: ${Date.now() - parseStart}ms`)

      // Generate filename
      const dateStr = new Date().toISOString().split('T')[0]
      const filename = `${documentType}-${client.name}-${dateStr}.pdf`.replace(/\s+/g, '-')

      const totalTime = Date.now() - startTime
      console.log(`✅ Total document generation time: ${totalTime}ms`)

      return NextResponse.json({
        document,
        filename,
      })
    } catch (error: unknown) {
      const errorTime = Date.now() - startTime
      if (error instanceof Error && error.name === 'AbortError') {
        console.error(`⚠️ Request timeout after ${errorTime}ms`)
        return new Response('Request timeout', { status: 504 })
      }
      console.error(`❌ Error generating document after ${errorTime}ms:`, error)
      return new Response(error instanceof Error ? error.message : 'Failed to generate document', {
        status: 500,
      })
    } finally {
      clearTimeout(timeout)
    }
  } catch (error: unknown) {
    const errorTime = Date.now() - startTime
    console.error(`❌ Outer error after ${errorTime}ms:`, error)
    return new Response(error instanceof Error ? error.message : 'Failed to generate document', {
      status: 500,
    })
  }
}

function generatePrompt(
  documentType: string,
  serviceProvider: User,
  client: Client,
  answers?: any,
): string {
  const formattedAnswers = Object.entries(answers || {})
    .map(([key, value]) => `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`)
    .join('\n')

  const serviceProviderInfo = [
    `Service Provider Name: ${serviceProvider.firstName} ${serviceProvider.lastName}`,
    serviceProvider.companyName && `Company Name: ${serviceProvider.companyName}`,
    serviceProvider.address && `Address: ${serviceProvider.address}`,
  ]
    .filter(Boolean)
    .join('\n')

  const clientInfo = [
    `Client Name: ${client.name}`,
    client.companyName && `Company Name: ${client.companyName}`,
    client.address && `Address: ${client.address}`,
    formattedAnswers,
  ]
    .filter(Boolean)
    .join('\n')

  const basePrompt = `Generate a formal ${documentType.toUpperCase()} AGREEMENT as a JSON document following the specified interface.

Parties Details:
Service Provider:
${serviceProviderInfo}

Client:
${clientInfo}

The document should include:
1. Clear and legally precise language
2. All standard sections for a ${documentType} agreement
3. Both parties' details and answers incorporated appropriately
4. Proper document structure and formatting
5. Complete signature section

SECTION CONTENT REQUIREMENTS:
1. Each section must have at least 2-3 detailed paragraphs
2. Include specific terms, conditions, and obligations
3. Use industry-standard legal terminology
4. Add relevant subsections where appropriate
5. Include specific examples and scenarios where applicable
6. Add detailed clauses for rights and responsibilities
7. Include remedies and consequences for breaches
8. Specify all payment terms and schedules in detail
9. Define all technical terms and services precisely
10. Include clear dispute resolution procedures

For each section, consider:
- Detailed explanation of the main topic
- Specific obligations of each party
- Conditions and limitations
- Exceptions and special cases
- Compliance requirements
- Reporting and communication procedures
- Quality standards and metrics
- Time frames and deadlines
- Dispute handling procedures
- Specific examples relevant to the client's industry`

  const documentSections: Record<string, string[]> = {
    service: [
      'SERVICES DESCRIPTION (Include detailed scope, deliverables, quality standards, and acceptance criteria)',
      'SERVICE LEVEL REQUIREMENTS (Specify performance metrics, response times, availability, and support levels)',
      'PAYMENT TERMS (Detail payment schedule, amounts, invoicing process, and late payment penalties)',
      'TERM AND TERMINATION (Include contract duration, renewal terms, and termination conditions)',
      'WARRANTIES (Specify service warranties, disclaimers, and quality guarantees)',
      'LIMITATION OF LIABILITY (Detail liability caps, excluded damages, and insurance requirements)',
      'CONFIDENTIALITY (Define confidential information, protection measures, and disclosure rules)',
      'GENERAL PROVISIONS (Include governing law, dispute resolution, force majeure, and amendments)',
    ],
    freelance: [
      'SCOPE OF SERVICES (Detail specific deliverables, milestones, and quality standards)',
      'PAYMENT TERMS AND SCHEDULE (Include rates, payment schedule, expenses, and invoicing process)',
      'INTELLECTUAL PROPERTY RIGHTS (Specify ownership, licenses, and usage rights)',
      'INDEPENDENT CONTRACTOR STATUS (Define relationship, tax obligations, and benefits disclaimer)',
      'TERM AND TERMINATION (Detail project timeline, extension options, and termination rights)',
      'CONFIDENTIALITY (Include NDA terms, data protection, and return of materials)',
      'WARRANTIES AND INDEMNIFICATION (Specify service guarantees and liability protection)',
      'GENERAL PROVISIONS (Include dispute resolution, amendments, and governing law)',
    ],
    nda: [
      'CONFIDENTIAL INFORMATION (Define scope, types, and marking requirements)',
      'SCOPE OF CONFIDENTIALITY (Detail usage restrictions, protection standards, and permitted disclosures)',
      'EXCLUSIONS (List standard exclusions and pre-existing information)',
      'TERM AND TERMINATION (Specify duration, survival terms, and return of information)',
      'RETURN OF INFORMATION (Detail return/destruction procedures and certification)',
      'REMEDIES (Include injunctive relief, damages, and enforcement)',
      'GENERAL PROVISIONS (Add standard legal terms and jurisdiction)',
    ],
    consulting: [
      'CONSULTING SERVICES (Detail scope, methodology, and deliverables)',
      'TERM AND TERMINATION (Include duration, renewal, and termination rights)',
      'COMPENSATION (Specify fees, expenses, and payment schedule)',
      'INDEPENDENT CONTRACTOR STATUS (Define relationship and obligations)',
      'CONFIDENTIALITY (Detail information protection and usage)',
      'INTELLECTUAL PROPERTY (Specify ownership and licenses)',
      'NON-COMPETITION (Include restrictions and duration)',
      'GENERAL PROVISIONS (Add standard legal terms)',
    ],
  }

  const sections = documentSections[documentType] || []
  if (sections.length) {
    return `${basePrompt}

Required sections (in order):
${sections.map((section, i) => `${i + 1}. ${section}`).join('\n')}`
  }

  return basePrompt
}
