'use server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { cookies } from 'next/headers'
import { User } from '@/payload-types'

export type LoginFormData = {
  email: string
  password: string
}

export type SignupFormData = LoginFormData & {
  firstName: string
  lastName: string
  email: string
  confirmPassword: string
  terms: boolean
}

export async function login(data: LoginFormData) {
  try {
    const { email, password } = data
    const payload = await getPayload({ config })

    const result = await payload.login({
      collection: 'users',
      data: {
        email,
        password,
      },
    })

    if (result?.token) {
      const cookieStore = await cookies()
      cookieStore.set('payload-token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 30 * 60, // 30 minutes
      })
    }

    return result
  } catch (error) {
    console.error('Login error:', error)
    throw new Error('Authentication failed')
  }
}

export async function signup(data: SignupFormData) {
  try {
    const payload = await getPayload({ config })

    const result = await payload.create({
      collection: 'users',
      data: {
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        role: 'user',
      },
    })
    
    const loginResult = await login({ email: data.email, password: data.password })

    return loginResult
  } catch (error) {
    console.error('Signup error:', error)
    throw new Error('Failed to create account')
  }
}
