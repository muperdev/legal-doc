export interface Document {
  id: number
  title: string
  type: string
  status: string
  lastEdited: string
}

export interface StatCardProps {
  title: string
  value: number | string
  icon: React.ReactNode
}

export interface QuickActionCardProps {
  title: string
  description: string
  icon: React.ReactNode
  href: string
}

export interface Client {
  id: number
  companyName: string
  address: string
  phoneNumber: string
}

export interface SubscriptionPlan {
  title: string
  price: string
  description: string
  features: string[]
  highlighted?: boolean
}
