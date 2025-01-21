'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

export function AppSumoActivateButton() {
  const [loading, setLoading] = useState(false)

  const startOAuthFlow = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/oauth/appsumo/init')
      const data = await response.json()

      if (data.url) {
        // Redirect to AppSumo's OAuth page
        window.location.href = data.url
      } else {
        throw new Error('No OAuth URL returned')
      }
    } catch (error) {
      console.error('Failed to start OAuth flow:', error)
      setLoading(false)
    }
  }

  return (
    <Button
      onClick={startOAuthFlow}
      disabled={loading}
      className="w-full bg-[#FBB13C] hover:bg-[#FBB13C]/90 text-black"
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Connecting to AppSumo...
        </>
      ) : (
        'Activate AppSumo License'
      )}
    </Button>
  )
}
