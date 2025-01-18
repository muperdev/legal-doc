export interface Question {
  id: string
  label: string
  type: 'text' | 'textarea' | 'number' | 'date'
  placeholder?: string
  required?: boolean
}

export interface DocumentType {
  id: string
  name: string
  description: string
  questions: Question[]
}

export const DOCUMENT_TYPES: DocumentType[] = [
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
