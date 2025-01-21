export type AppSumoEventType = 'activate' | 'deactivate' | 'upgrade' | 'downgrade'

export interface AppSumoWebhookEvent {
  event_type: AppSumoEventType
  license_id: string
  activation_code: string
  tier: string
  user_id?: string
  email?: string
  timestamp: string
  metadata?: Record<string, any>
}

export interface AppSumoLicenseResponse {
  license_id: string
  activation_code: string
  tier: string
  status: 'active' | 'inactive'
  user_id?: string
  email?: string
  activated_at?: string
  metadata?: Record<string, any>
}

export interface AppSumoSubscriptionData {
  status: 'active' | 'canceled'
  plan: 'appsumo_lifetime'
  appsumoLicenseId: string
  appsumoActivationCode: string
  appsumoTier: string
  appsumoActivatedAt: string
  appsumoWebhookData?: AppSumoWebhookEvent
}
