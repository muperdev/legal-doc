'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2, XCircle } from 'lucide-react'
import { signupSchema, type SignupFormData, type LoginFormData } from '@/lib/validations/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

type AuthStep = 'loading' | 'signup' | 'login' | 'success' | 'error'

interface AppSumoRedemptionProps {
  licenseData: {
    license_key: string
    status: 'active' | 'inactive' | 'deactivated'
    email?: string
  }
}

export function AppSumoRedemption({ licenseData }: AppSumoRedemptionProps) {
  const router = useRouter()
  const [step, setStep] = useState<AuthStep>(
    licenseData.status === 'active' && licenseData.email ? 'login' : 'signup',
  )
  const [message, setMessage] = useState('')

  const {
    register: registerSignup,
    handleSubmit: handleSignupSubmit,
    formState: { errors: signupErrors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  })

  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm<LoginFormData>()

  const onSignup = async (data: SignupFormData) => {
    try {
      // Create account
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          license_key: licenseData.license_key,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create account')
      }

      setStep('success')
      setMessage('Successfully activated AppSumo license!')

      // Redirect to dashboard after 5 seconds
      setTimeout(() => {
        router.push('/dashboard')
        router.refresh()
      }, 5000)
    } catch (error) {
      console.error('Signup failed:', error)
      setStep('error')
      setMessage('Failed to create account')
    }
  }

  const onLogin = async (data: LoginFormData) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          license_key: licenseData.license_key,
        }),
      })

      if (!response.ok) {
        throw new Error('Login failed')
      }

      setStep('success')
      setMessage('Successfully activated AppSumo license!')

      // Redirect to dashboard after 5 seconds
      setTimeout(() => {
        router.push('/dashboard')
        router.refresh()
      }, 5000)
    } catch (error) {
      console.error('Login failed:', error)
      setStep('error')
      setMessage('Login failed')
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Card className="bg-black border border-neutral-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              {step === 'success' ? (
                <>
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                  AppSumo Code Redeemed!
                </>
              ) : step === 'error' ? (
                <>
                  <XCircle className="h-6 w-6 text-red-500" />
                  Redemption Failed
                </>
              ) : step === 'signup' ? (
                'Create Your Account'
              ) : step === 'login' ? (
                'Sign In to Your Account'
              ) : (
                'Processing Your Code...'
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {step === 'signup' && (
              <form onSubmit={handleSignupSubmit(onSignup)} className="space-y-4">
                <div>
                  <input
                    {...registerSignup('firstName')}
                    placeholder="First Name"
                    className="w-full px-3 py-2 bg-neutral-800/50 border border-neutral-700 text-white"
                  />
                  {signupErrors.firstName && (
                    <p className="mt-1 text-sm text-red-500">{signupErrors.firstName.message}</p>
                  )}
                </div>
                <div>
                  <input
                    {...registerSignup('lastName')}
                    placeholder="Last Name"
                    className="w-full px-3 py-2 bg-neutral-800/50 border border-neutral-700 text-white"
                  />
                  {signupErrors.lastName && (
                    <p className="mt-1 text-sm text-red-500">{signupErrors.lastName.message}</p>
                  )}
                </div>
                <div>
                  <input
                    {...registerSignup('email')}
                    type="email"
                    placeholder="Email"
                    className="w-full px-3 py-2 bg-neutral-800/50 border border-neutral-700 text-white"
                  />
                  {signupErrors.email && (
                    <p className="mt-1 text-sm text-red-500">{signupErrors.email.message}</p>
                  )}
                </div>
                <div>
                  <input
                    {...registerSignup('password')}
                    type="password"
                    placeholder="Password"
                    className="w-full px-3 py-2 bg-neutral-800/50 border border-neutral-700 text-white"
                  />
                  {signupErrors.password && (
                    <p className="mt-1 text-sm text-red-500">{signupErrors.password.message}</p>
                  )}
                </div>
                <div>
                  <input
                    {...registerSignup('confirmPassword')}
                    type="password"
                    placeholder="Confirm Password"
                    className="w-full px-3 py-2 bg-neutral-800/50 border border-neutral-700 text-white"
                  />
                  {signupErrors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-500">
                      {signupErrors.confirmPassword.message}
                    </p>
                  )}
                </div>
                <div className="flex items-center">
                  <input {...registerSignup('terms')} type="checkbox" className="mr-2" />
                  <label className="text-sm text-gray-300">
                    I agree to the Terms and Conditions
                  </label>
                </div>
                {signupErrors.terms && (
                  <p className="text-sm text-red-500">{signupErrors.terms.message}</p>
                )}
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-primary text-black hover:bg-primary/90 transition-colors"
                >
                  Create Account
                </button>
                <p className="text-center text-sm text-gray-400">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setStep('login')}
                    className="text-primary hover:underline"
                  >
                    Sign in
                  </button>
                </p>
              </form>
            )}

            {step === 'login' && (
              <form onSubmit={handleLoginSubmit(onLogin)} className="space-y-4">
                <div>
                  <input
                    {...registerLogin('email')}
                    type="email"
                    placeholder="Email"
                    className="w-full px-3 py-2 bg-neutral-800/50 border border-neutral-700 text-white"
                  />
                  {loginErrors.email && (
                    <p className="mt-1 text-sm text-red-500">{loginErrors.email.message}</p>
                  )}
                </div>
                <div>
                  <input
                    {...registerLogin('password')}
                    type="password"
                    placeholder="Password"
                    className="w-full px-3 py-2 bg-neutral-800/50 border border-neutral-700 text-white"
                  />
                  {loginErrors.password && (
                    <p className="mt-1 text-sm text-red-500">{loginErrors.password.message}</p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-primary text-black hover:bg-primary/90 transition-colors"
                >
                  Sign In
                </button>
                <p className="text-center text-sm text-gray-400">
                  Don&apos;t have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setStep('signup')}
                    className="text-primary hover:underline"
                  >
                    Create one
                  </button>
                </p>
              </form>
            )}

            {step === 'success' && (
              <p className="mt-4 text-sm text-gray-400">
                Redirecting you to the dashboard in a few seconds...
              </p>
            )}

            {step === 'error' && (
              <>
                <p className="text-gray-300">{message}</p>
                <button
                  onClick={() => router.push('/dashboard')}
                  className="mt-4 w-full px-4 py-2 bg-primary text-black hover:bg-primary/90 transition-colors"
                >
                  Go to Dashboard
                </button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
