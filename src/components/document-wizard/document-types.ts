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
    name: 'Non-Disclosure Agreement (NDA)',
    description: 'Agreement to protect confidential information shared between parties.',
    questions: [
      {
        id: 'effectiveDate',
        label: 'What is the effective date of the agreement?',
        type: 'date',
        placeholder: 'Select a date...',
        required: true,
      },
      {
        id: 'confidentialityDuration',
        label: 'How long will the confidentiality last?',
        type: 'text',
        placeholder: 'e.g., 2 years or indefinitely...',
        required: true,
      },
      {
        id: 'purpose',
        label: 'What is the purpose of the disclosure?',
        type: 'textarea',
        placeholder: 'Describe the purpose of sharing confidential information...',
        required: true,
      },
    ],
  },
  {
    id: 'contractorAgreement',
    name: 'Independent Contractor Agreement',
    description: 'Contract for services between a client and an independent contractor.',
    questions: [
      {
        id: 'scopeOfWork',
        label: 'What is the scope of work?',
        type: 'textarea',
        placeholder: 'Describe the services the contractor will provide...',
        required: true,
      },
      {
        id: 'paymentTerms',
        label: 'What are the payment terms?',
        type: 'textarea',
        placeholder: 'Specify amount, frequency, and method of payment...',
        required: true,
      },
      {
        id: 'startDate',
        label: 'What is the start date?',
        type: 'date',
        placeholder: 'Select a start date...',
        required: true,
      },
    ],
  },
  {
    id: 'salesAgreement',
    name: 'Sales Agreement',
    description: 'Agreement for the sale of goods or services.',
    questions: [
      {
        id: 'itemDescription',
        label: 'What is being sold?',
        type: 'textarea',
        placeholder: 'Describe the item or service being sold...',
        required: true,
      },
      {
        id: 'price',
        label: 'What is the price?',
        type: 'text',
        placeholder: 'Enter the price or pricing details...',
        required: true,
      },
      {
        id: 'deliveryDetails',
        label: 'What are the delivery details?',
        type: 'textarea',
        placeholder: 'Specify the delivery date, location, or method...',
        required: false,
      },
    ],
  },
  {
    id: 'employmentAgreement',
    name: 'Employment Agreement',
    description: 'Agreement between an employer and an employee.',
    questions: [
      {
        id: 'jobTitle',
        label: "What is the employee's job title?",
        type: 'text',
        placeholder: 'Enter the job title...',
        required: true,
      },
      {
        id: 'salary',
        label: 'What is the salary?',
        type: 'text',
        placeholder: 'Specify the salary amount and payment frequency...',
        required: true,
      },
      {
        id: 'startDate',
        label: 'When does the employment start?',
        type: 'date',
        placeholder: 'Select a start date...',
        required: true,
      },
    ],
  },
  {
    id: 'loanAgreement',
    name: 'Loan Agreement',
    description: 'Contract for lending and repayment of money.',
    questions: [
      {
        id: 'loanAmount',
        label: 'What is the loan amount?',
        type: 'text',
        placeholder: 'Enter the loan amount...',
        required: true,
      },
      {
        id: 'interestRate',
        label: 'What is the interest rate?',
        type: 'text',
        placeholder: 'e.g., 5% annually...',
        required: false,
      },
      {
        id: 'repaymentTerms',
        label: 'What are the repayment terms?',
        type: 'textarea',
        placeholder: 'Describe the repayment schedule or terms...',
        required: true,
      },
    ],
  },
  {
    id: 'partnershipAgreement',
    name: 'Partnership Agreement',
    description: 'Agreement between two or more partners for a business venture.',
    questions: [
      {
        id: 'businessName',
        label: 'What is the name of the business?',
        type: 'text',
        placeholder: 'Enter the business or venture name...',
        required: true,
      },
      {
        id: 'profitSharing',
        label: 'What is the profit-sharing ratio?',
        type: 'text',
        placeholder: 'e.g., 50:50...',
        required: true,
      },
      {
        id: 'rolesResponsibilities',
        label: 'What are the roles and responsibilities of each partner?',
        type: 'textarea',
        placeholder: 'Specify the roles and contributions of each partner...',
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
  {
    id: 'serviceAgreement',
    name: 'Service Agreement',
    description: 'Agreement outlining the terms for the provision of services.',
    questions: [
      {
        id: 'services',
        label: 'What services will be provided?',
        type: 'textarea',
        placeholder: 'Describe the services in detail...',
        required: true,
      },
      {
        id: 'serviceFee',
        label: 'What is the service fee?',
        type: 'text',
        placeholder: 'Specify the fee for the services...',
        required: true,
      },
      {
        id: 'termOfService',
        label: 'What is the term of the service?',
        type: 'text',
        placeholder: 'e.g., 6 months, ongoing...',
        required: true,
      },
    ],
  },
  {
    id: 'freelanceContract',
    name: 'Freelance Contract',
    description: 'Agreement for freelance services between a contractor and a client.',
    questions: [
      {
        id: 'projectDescription',
        label: 'What is the project or task description?',
        type: 'textarea',
        placeholder: 'Describe the project or work to be delivered...',
        required: true,
      },
      {
        id: 'fee',
        label: 'What is the agreed fee?',
        type: 'text',
        placeholder: 'Specify the payment amount for the freelance work...',
        required: true,
      },
      {
        id: 'deadline',
        label: 'What is the project deadline?',
        type: 'date',
        placeholder: 'Select the deadline for project completion...',
        required: true,
      },
    ],
  },
  {
    id: 'invoice',
    name: 'Invoice',
    description: 'A bill issued for goods or services provided.',
    questions: [
      {
        id: 'invoiceNumber',
        label: 'What is the invoice number?',
        type: 'text',
        placeholder: 'Enter the unique invoice number...',
        required: true,
      },
      {
        id: 'itemDescription',
        label: 'What goods or services are included in the invoice?',
        type: 'textarea',
        placeholder: 'List the items or services with details...',
        required: true,
      },
      {
        id: 'totalAmount',
        label: 'What is the total amount due?',
        type: 'text',
        placeholder: 'Enter the total cost for the goods or services...',
        required: true,
      },
      {
        id: 'dueDate',
        label: 'What is the payment due date?',
        type: 'date',
        placeholder: 'Select the payment deadline...',
        required: true,
      },
    ],
  },
  {
    id: 'mutualNDA',
    name: 'Mutual Non-Disclosure Agreement (NDA)',
    description: 'A contract ensuring confidentiality of shared information between two parties.',
    questions: [
      {
        id: 'confidentialInformation',
        label: 'What information is considered confidential?',
        type: 'textarea',
        placeholder: 'Describe the type of information both parties want to protect...',
        required: true,
      },
      {
        id: 'purpose',
        label: 'What is the purpose of sharing the information?',
        type: 'textarea',
        placeholder: 'State the reason for exchanging confidential information...',
        required: true,
      },
      {
        id: 'disclosureTerm',
        label: 'What is the term for confidentiality?',
        type: 'text',
        placeholder: 'e.g., 2 years from the date of signing...',
        required: true,
      },
    ],
  },
]
