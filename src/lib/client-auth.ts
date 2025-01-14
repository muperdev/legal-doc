'use client'

export type LoginFormData = {
  email: string
  password: string
}

export type SignupFormData = LoginFormData & {
  name: string
  confirmPassword: string
  terms: boolean
}

export async function login(data: LoginFormData) {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Login failed')
  }

  return response.json()
}

export async function signup(data: SignupFormData) {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Signup failed')
  }

  return response.json()
}

export function setAuthToken(token: string): void {
  const thirtyDays = 30 * 24 * 60 * 60
  document.cookie = `payload-token=${token}; path=/; max-age=${thirtyDays}`
}
