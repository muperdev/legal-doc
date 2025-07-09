import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date): string {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function formatFileType(mimeType: string): string {
  const mimeMap: Record<string, string> = {
    'application/pdf': 'PDF',
    'application/msword': 'DOC',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'DOCX',
    'application/vnd.ms-excel': 'XLS',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'XLSX',
    'image/jpeg': 'JPEG',
    'image/png': 'PNG',
    'text/plain': 'TXT',
  }

  return mimeMap[mimeType] || mimeType.split('/')[1].toUpperCase()
}

/**
 * Tracks Twitter conversion events
 * @param eventId - The Twitter event ID (optional, defaults to configured event)
 */
export function trackTwitterConversion(eventId: string = 'tw-q4kzc-q4kzd'): void {
  if (typeof window !== 'undefined' && (window as any).twq) {
    try {
      ;(window as any).twq('event', eventId, {})
    } catch (error) {
      console.warn('Twitter conversion tracking failed:', error)
    }
  }
}
