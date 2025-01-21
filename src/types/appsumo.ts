export type AppSumoEventType = 'purchase' | 'activate' | 'deactivate' | 'upgrade' | 'downgrade'

export interface AppSumoWebhookEvent {
  event_type: AppSumoEventType
  license_id: string
  license_key: string
  prev_license_key?: string
  tier: string
  user_id?: string
  email?: string
  timestamp: string
  metadata?: Record<string, any>
  test?: boolean
}

export interface AppSumoLicenseResponse {
  license_id: string
  license_key: string
  tier: string
  status: 'active' | 'inactive' | 'deactivated'
  user_id?: string
  email?: string
  activated_at?: string
  metadata?: Record<string, any>
}

export interface AppSumoSubscriptionData {
  status: 'active' | 'canceled' | 'inactive'
  plan: 'appsumo_lifetime'
  appsumoLicenseId: string
  appsumoLicenseKey: string
  appsumoTier: string
  appsumoActivatedAt?: string
  appsumoWebhookData?: string
}
