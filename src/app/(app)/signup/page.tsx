'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signup, setAuthToken } from '@/lib/client-auth'
import { signupSchema, type SignupFormData } from '@/lib/validations/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

export default function SignupPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  })

  const onSubmit = async (data: SignupFormData) => {
    try {
      setLoading(true)
      const response = await signup(data)
      setAuthToken(response.token)
      router.push('/dashboard')
    } catch (error) {
      console.error('Signup failed:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex flex-col justify-center py-12 sm:px-6 lg:px-8 blackHanSans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Create your account</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-black py-8 px-4 shadow sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-white">
                First Name
              </label>
              <div className="mt-1">
                <input
                  {...register('firstName')}
                  type="text"
                  autoComplete="name"
                  className="appearance-none block w-full px-3 py-2 border border-neutral-800 bg-neutral-800/50 shadow-sm placeholder-neutral-400 text-white focus:outline-none focus:ring-neutral-600 focus:border-neutral-600 sm:text-sm"
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-white">
                Last Name
              </label>
              <div className="mt-1">
                <input
                  {...register('lastName')}
                  type="text"
                  autoComplete="name"
                  className="appearance-none block w-full px-3 py-2 border border-neutral-800 bg-neutral-800/50 shadow-sm placeholder-neutral-400 text-white focus:outline-none focus:ring-neutral-600 focus:border-neutral-600 sm:text-sm"
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white">
                Email address
              </label>
              <div className="mt-1">
                <input
                  {...register('email')}
                  type="email"
                  autoComplete="email"
                  className="appearance-none block w-full px-3 py-2 border border-neutral-800 bg-neutral-800/50 shadow-sm placeholder-neutral-400 text-white focus:outline-none focus:ring-neutral-600 focus:border-neutral-600 sm:text-sm"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white">
                Password
              </label>
              <div className="mt-1">
                <input
                  {...register('password')}
                  type="password"
                  autoComplete="new-password"
                  className="appearance-none block w-full px-3 py-2 border border-neutral-800 bg-neutral-800/50 shadow-sm placeholder-neutral-400 text-white focus:outline-none focus:ring-neutral-600 focus:border-neutral-600 sm:text-sm"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-white">
                Confirm Password
              </label>
              <div className="mt-1">
                <input
                  {...register('confirmPassword')}
                  type="password"
                  autoComplete="new-password"
                  className="appearance-none block w-full px-3 py-2 border border-neutral-800 bg-neutral-800/50 shadow-sm placeholder-neutral-400 text-white focus:outline-none focus:ring-neutral-600 focus:border-neutral-600 sm:text-sm"
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  {...register('terms')}
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-white">
                  I agree to the{' '}
                  <Link href="/terms" className="font-medium text-blue-600 hover:text-blue-500">
                    Terms and Conditions
                  </Link>
                </label>
              </div>
            </div>
            {errors.terms && <p className="text-sm text-red-600">{errors.terms.message}</p>}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-primary text-black font-medium shadow-lg hover:bg-neutral-200 hover:text-black focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-opacity-50 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating account...' : 'Create account'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-black text-gray-500">Already have an account?</span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link href="/login" className="font-medium text-primary-blue hover:text-blue-500">
                Sign in to your account
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Link
          href="/"
          className="flex items-center justify-center text-sm font-medium text-gray-600 hover:text-white"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to home
        </Link>
      </div>
    </div>
  )
}
