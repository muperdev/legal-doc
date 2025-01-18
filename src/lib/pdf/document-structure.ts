export interface DocumentSection {
  title: string
  content: string[]
  subsections?: {
    title: string
    content: string[]
  }[]
}

export interface LegalDocument {
  metadata: {
    date: string
    title: string
    documentType: string
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
    whereas: string[]
    agreement: string
  }
  sections: DocumentSection[]
  signatures: {
    firstParty: {
      name: string
      title?: string
      date: string
    }
    secondParty: {
      name: string
      title?: string
      date: string
    }
  }
}
