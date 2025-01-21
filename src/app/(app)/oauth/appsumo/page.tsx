'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2, XCircle } from 'lucide-react'
import { signup, login, setAuthToken } from '@/lib/client-auth'
import { signupSchema, type SignupFormData, type LoginFormData } from '@/lib/validations/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

type AuthStep = 'loading' | 'signup' | 'login' | 'success' | 'error'
type LicenseStatus = 'active' | 'inactive' | 'deactivated'

interface LicenseData {
  license_key: string
  status: LicenseStatus
  email?: string
}

function AppSumoRedemptionContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [step, setStep] = useState<AuthStep>('loading')
  const [message, setMessage] = useState('')
  const [licenseData, setLicenseData] = useState<LicenseData | null>(null)
  const code = searchParams.get('code')

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

  useEffect(() => {
    async function exchangeCodeAndGetLicense() {
      if (!code) {
        setStep('error')
        setMessage('No authorization code provided')
        return
      }

      try {
        // Exchange code for tokens
        const tokenResponse = await fetch('/api/oauth/appsumo/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code }),
        })

        if (!tokenResponse.ok) {
          throw new Error('Failed to exchange code for token')
        }

        const { license } = await tokenResponse.json()
        setLicenseData(license)

        // Handle different license statuses
        switch (license.status) {
          case 'active':
            // License is already active, try to log in user
            if (license.email) {
              setStep('login')
            } else {
              setStep('signup')
            }
            break
          case 'inactive':
            // New license, show signup form
            setStep('signup')
            break
          case 'deactivated':
            setStep('error')
            setMessage('This license has been deactivated')
            break
          default:
            setStep('error')
            setMessage('Invalid license status')
        }
      } catch (error) {
        console.error('AppSumo OAuth error:', error)
        setStep('error')
        setMessage('Failed to process AppSumo authentication')
      }
    }

    exchangeCodeAndGetLicense()
  }, [code])

  const onSignup = async (data: SignupFormData) => {
    if (!licenseData) {
      setStep('error')
      setMessage('No license data available')
      return
    }

    try {
      // Create account
      const response = await signup(data)
      setAuthToken(response.token)

      // Link license to account
      await linkLicenseToAccount(response.token)
    } catch (error) {
      console.error('Signup failed:', error)
      setStep('error')
      setMessage('Failed to create account')
    }
  }

  const onLogin = async (data: LoginFormData) => {
    if (!licenseData) {
      setStep('error')
      setMessage('No license data available')
      return
    }

    try {
      // Log in
      const response = await login(data)
      setAuthToken(response.token)

      // Link license to account
      await linkLicenseToAccount(response.token)
    } catch (error) {
      console.error('Login failed:', error)
      setStep('error')
      setMessage('Login failed')
    }
  }

  const linkLicenseToAccount = async (token: string) => {
    try {
      const response = await fetch('/api/oauth/appsumo/redeem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          license_key: licenseData?.license_key,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to link license')
      }

      setStep('success')
      setMessage('Successfully activated AppSumo license!')

      // Redirect to dashboard after 5 seconds
      setTimeout(() => {
        router.push('/dashboard')
      }, 5000)
    } catch (error) {
      console.error('License linking error:', error)
      setStep('error')
      setMessage('Failed to link license to account')
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
            {step === 'loading' && <p className="text-gray-300">Verifying your code...</p>}

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

export default function AppSumoRedemptionPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            <Card className="bg-black border border-neutral-800">
              <CardHeader>
                <CardTitle className="text-white">Loading...</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">Please wait while we load the page...</p>
              </CardContent>
            </Card>
          </div>
        </div>
      }
    >
      <AppSumoRedemptionContent />
    </Suspense>
  )
}
