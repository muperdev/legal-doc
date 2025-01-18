'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { login, setAuthToken } from '@/lib/client-auth'
import { loginSchema, type LoginFormData } from '@/lib/validations/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      setLoading(true)
      const response = await login(data)
      setAuthToken(response.token)
      router.push('/dashboard')
    } catch (error) {
      console.error('Login failed:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-black/40 py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-neutral-800">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-200">
                Email address
              </label>
              <div className="mt-1">
                <input
                  {...register('email')}
                  type="email"
                  autoComplete="email"
                  className="appearance-none block w-full px-3 py-2 border border-neutral-800 bg-neutral-800/50 rounded-md shadow-sm placeholder-neutral-400 text-white focus:outline-none focus:ring-neutral-600 focus:border-neutral-600 sm:text-sm"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-neutral-200">
                Password
              </label>
              <div className="mt-1">
                <input
                  {...register('password')}
                  type="password"
                  autoComplete="current-password"
                  className="appearance-none block w-full px-3 py-2 border border-neutral-800 bg-neutral-800/50 rounded-md shadow-sm placeholder-neutral-400 text-white focus:outline-none focus:ring-neutral-600 focus:border-neutral-600 sm:text-sm"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link
                  href="/forgot-password"
                  className="font-medium text-neutral-200 hover:text-white"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-neutral-800/50 text-white font-medium rounded-full shadow-lg hover:bg-neutral-200 hover:text-black focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-opacity-50 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-800" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-black/40 text-neutral-400">New to our platform?</span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link href="/signup" className="font-medium text-white hover:text-neutral-200">
                Create an account
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Link
          href="/"
          className="flex items-center justify-center text-sm font-medium text-neutral-400 hover:text-white"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to home
        </Link>
      </div>
    </div>
  )
}
