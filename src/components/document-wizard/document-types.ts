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
  tier: 'free' | 'premium'
  category: DocumentCategory
}

export type DocumentCategory =
  | 'business'
  | 'employment'
  | 'services'
  | 'intellectual_property'
  | 'real_estate'
  | 'financial'

export const DOCUMENT_CATEGORIES: Record<DocumentCategory, string> = {
  business: 'Business Agreements',
  employment: 'Employment & HR',
  services: 'Service Agreements',
  intellectual_property: 'Intellectual Property',
  real_estate: 'Real Estate',
  financial: 'Financial Agreements',
}

export const DOCUMENT_TYPES: DocumentType[] = [
  {
    id: 'nda',
    name: 'Non-Disclosure Agreement (NDA)',
    description: 'Agreement to protect confidential information shared between parties.',
    tier: 'free',
    category: 'business',
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
    tier: 'free',
    category: 'employment',
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
    tier: 'free',
    category: 'business',
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
    tier: 'free',
    category: 'employment',
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
    id: 'serviceAgreement',
    name: 'Service Agreement',
    description: 'Agreement outlining the terms for the provision of services.',
    tier: 'free',
    category: 'services',
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
    id: 'loanAgreement',
    name: 'Loan Agreement',
    description: 'Contract for lending and repayment of money.',
    tier: 'premium',
    category: 'financial',
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
    tier: 'premium',
    category: 'business',
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
    tier: 'premium',
    category: 'services',
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
    id: 'freelanceContract',
    name: 'Freelance Contract',
    description: 'Agreement for freelance services between a contractor and a client.',
    tier: 'premium',
    category: 'services',
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
    id: 'mutualNDA',
    name: 'Mutual Non-Disclosure Agreement (NDA)',
    tier: 'premium',
    category: 'business',
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
  {
    id: 'propertyLease',
    name: 'Property Lease Agreement',
    description: 'Contract for leasing residential or commercial property.',
    tier: 'premium',
    category: 'real_estate',
    questions: [
      {
        id: 'propertyAddress',
        label: 'What is the property address?',
        type: 'textarea',
        placeholder: 'Enter the complete property address...',
        required: true,
      },
      {
        id: 'leaseTerm',
        label: 'What is the lease term?',
        type: 'text',
        placeholder: 'e.g., 12 months, 24 months...',
        required: true,
      },
      {
        id: 'monthlyRent',
        label: 'What is the monthly rent amount?',
        type: 'text',
        placeholder: 'Enter the monthly rent amount...',
        required: true,
      },
      {
        id: 'securityDeposit',
        label: 'What is the security deposit amount?',
        type: 'text',
        placeholder: 'Enter the security deposit amount...',
        required: true,
      },
    ],
  },
  {
    id: 'licensingAgreement',
    name: 'Licensing Agreement',
    description: 'Contract for licensing intellectual property rights between parties.',
    tier: 'premium',
    category: 'intellectual_property',
    questions: [
      {
        id: 'licensedProperty',
        label: 'What intellectual property is being licensed?',
        type: 'textarea',
        placeholder: 'Describe the intellectual property in detail...',
        required: true,
      },
      {
        id: 'licenseScope',
        label: 'What is the scope of the license?',
        type: 'textarea',
        placeholder: 'Define usage rights, territories, and limitations...',
        required: true,
      },
      {
        id: 'royalties',
        label: 'What are the royalty terms?',
        type: 'text',
        placeholder: 'Specify royalty rates and payment schedule...',
        required: true,
      },
    ],
  },
  {
    id: 'jointVenture',
    name: 'Joint Venture Agreement',
    description: 'Agreement between parties to undertake a specific business project.',
    tier: 'premium',
    category: 'business',
    questions: [
      {
        id: 'ventureScope',
        label: 'What is the scope of the joint venture?',
        type: 'textarea',
        placeholder: 'Describe the business venture...',
        required: true,
      },
      {
        id: 'contributions',
        label: 'What are the contributions of each party?',
        type: 'textarea',
        placeholder: 'List assets, capital, or services contributed...',
        required: true,
      },
      {
        id: 'profitSharing',
        label: 'How will profits and losses be shared?',
        type: 'textarea',
        placeholder: 'Specify the profit/loss distribution...',
        required: true,
      },
    ],
  },
  {
    id: 'manufacturingAgreement',
    name: 'Manufacturing Agreement',
    description: 'Contract for product manufacturing services.',
    tier: 'premium',
    category: 'services',
    questions: [
      {
        id: 'productSpecs',
        label: 'What are the product specifications?',
        type: 'textarea',
        placeholder: 'Detail the product requirements...',
        required: true,
      },
      {
        id: 'quantity',
        label: 'What is the production quantity?',
        type: 'text',
        placeholder: 'Specify the quantity and minimum order...',
        required: true,
      },
      {
        id: 'qualityStandards',
        label: 'What are the quality standards?',
        type: 'textarea',
        placeholder: 'List quality requirements and testing procedures...',
        required: true,
      },
    ],
  },
  {
    id: 'distributionAgreement',
    name: 'Distribution Agreement',
    description: 'Contract for product distribution rights and terms.',
    tier: 'premium',
    category: 'business',
    questions: [
      {
        id: 'territory',
        label: 'What is the distribution territory?',
        type: 'textarea',
        placeholder: 'Define the geographical area...',
        required: true,
      },
      {
        id: 'exclusivity',
        label: 'Is this an exclusive distribution agreement?',
        type: 'text',
        placeholder: 'Specify exclusivity terms...',
        required: true,
      },
      {
        id: 'minimumPurchase',
        label: 'What are the minimum purchase requirements?',
        type: 'text',
        placeholder: 'Enter minimum order quantities...',
        required: true,
      },
    ],
  },
  {
    id: 'franchiseAgreement',
    name: 'Franchise Agreement',
    description: 'Contract granting franchise rights and obligations.',
    tier: 'premium',
    category: 'business',
    questions: [
      {
        id: 'franchiseRights',
        label: 'What rights are being granted?',
        type: 'textarea',
        placeholder: 'Describe the franchise rights and territory...',
        required: true,
      },
      {
        id: 'initialFee',
        label: 'What is the initial franchise fee?',
        type: 'text',
        placeholder: 'Enter the initial franchise fee...',
        required: true,
      },
      {
        id: 'royalties',
        label: 'What are the ongoing royalty payments?',
        type: 'text',
        placeholder: 'Specify royalty percentages and terms...',
        required: true,
      },
    ],
  },
  {
    id: 'investmentAgreement',
    name: 'Investment Agreement',
    description: 'Contract between investors and a company for equity investment.',
    tier: 'premium',
    category: 'financial',
    questions: [
      {
        id: 'investmentAmount',
        label: 'What is the investment amount?',
        type: 'text',
        placeholder: 'Enter the total investment amount...',
        required: true,
      },
      {
        id: 'equityStake',
        label: 'What is the equity stake being offered?',
        type: 'text',
        placeholder: 'Specify the percentage of ownership...',
        required: true,
      },
      {
        id: 'investmentTerms',
        label: 'What are the investment terms?',
        type: 'textarea',
        placeholder: 'Detail voting rights, board seats, and other terms...',
        required: true,
      },
    ],
  },
  {
    id: 'commercialLease',
    name: 'Commercial Lease Agreement',
    description: 'Contract for leasing commercial property between landlord and tenant.',
    tier: 'premium',
    category: 'real_estate',
    questions: [
      {
        id: 'propertyDetails',
        label: 'What are the property details?',
        type: 'textarea',
        placeholder: 'Describe the commercial property...',
        required: true,
      },
      {
        id: 'leaseTerms',
        label: 'What are the lease terms?',
        type: 'textarea',
        placeholder: 'Specify duration, rent, and other terms...',
        required: true,
      },
      {
        id: 'useRestrictions',
        label: 'What are the use restrictions?',
        type: 'textarea',
        placeholder: 'Detail permitted uses and restrictions...',
        required: true,
      },
    ],
  },
  {
    id: 'researchDevelopment',
    name: 'Research & Development Agreement',
    description: 'Contract for collaborative research and development projects.',
    tier: 'premium',
    category: 'intellectual_property',
    questions: [
      {
        id: 'projectScope',
        label: 'What is the scope of the R&D project?',
        type: 'textarea',
        placeholder: 'Describe the research objectives and deliverables...',
        required: true,
      },
      {
        id: 'ipRights',
        label: 'How will intellectual property rights be handled?',
        type: 'textarea',
        placeholder: 'Specify ownership and usage rights of developed IP...',
        required: true,
      },
      {
        id: 'funding',
        label: 'What are the funding arrangements?',
        type: 'textarea',
        placeholder: 'Detail the budget and cost sharing...',
        required: true,
      },
    ],
  },
  {
    id: 'profitSharing',
    name: 'Profit Sharing Agreement',
    description: 'Agreement defining how profits will be shared between parties.',
    tier: 'premium',
    category: 'financial',
    questions: [
      {
        id: 'profitDefinition',
        label: 'How are profits defined and calculated?',
        type: 'textarea',
        placeholder: 'Specify the method of profit calculation...',
        required: true,
      },
      {
        id: 'distributionRatio',
        label: 'What is the profit distribution ratio?',
        type: 'text',
        placeholder: 'Enter the profit sharing percentages...',
        required: true,
      },
      {
        id: 'paymentSchedule',
        label: 'What is the distribution schedule?',
        type: 'textarea',
        placeholder: 'Specify when and how profits will be distributed...',
        required: true,
      },
    ],
  },
  {
    id: 'collaborationAgreement',
    name: 'Collaboration Agreement',
    description: 'Contract for business collaboration between two parties.',
    tier: 'premium',
    category: 'business',
    questions: [
      {
        id: 'collaborationScope',
        label: 'What is the scope of collaboration?',
        type: 'textarea',
        placeholder: 'Describe the nature of collaboration...',
        required: true,
      },
      {
        id: 'responsibilities',
        label: 'What are the responsibilities of each party?',
        type: 'textarea',
        placeholder: 'Detail the roles and obligations...',
        required: true,
      },
      {
        id: 'resourceSharing',
        label: 'How will resources be shared?',
        type: 'textarea',
        placeholder: 'Specify resource allocation and sharing terms...',
        required: true,
      },
    ],
  },
]
