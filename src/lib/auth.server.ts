import { cookies } from 'next/headers'
import { type NextRequest } from 'next/server'

const AUTH_COOKIE_NAME = 'payload-token'
const API_ROUTES = {
  validateToken: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`,
} as const

export async function getServerSideToken(): Promise<string | null> {
  const cookieStore = await cookies()
  return cookieStore.get(AUTH_COOKIE_NAME)?.value ?? null
}

export function getTokenFromRequest(request: NextRequest): string | null {
  return request.cookies.get(AUTH_COOKIE_NAME)?.value ?? null
}

export async function validateToken(token: string): Promise<boolean> {
  try {
    const response = await fetch(API_ROUTES.validateToken, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.ok
  } catch (error) {
    console.error('Token validation failed:', error)
    return false
  }
}
