'use client'

import { useState } from 'react'
import { toast } from 'sonner'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/newsletter`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        throw new Error('Failed to subscribe')
      }

      toast.success('Successfully subscribed to newsletter!')
      setEmail('')
    } catch (error) {
      console.error('Newsletter subscription error:', error)
      toast.error('Failed to subscribe. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold text-white sm:text-5xl font-blackHanSans">
              Keep it real with GimmeDoc!
            </h2>
            <p className="mt-4 text-xl text-gray-400">
              Yo, hit up our newsletter for the freshest updates and slick legal hacks just for
              startups.
            </p>
          </div>

          <div className="lg:pl-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email Here"
                  className="flex-grow px-4 py-3 bg-transparent border-2 border-white text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500"
                  required
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-black text-white border-2 border-white hover:bg-white hover:text-black transition-colors sm:w-auto w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading}
                >
                  {isLoading ? 'Joining...' : 'Join Now'}
                </button>
              </div>
              <p className="text-sm text-gray-400">
                By clicking Join Now, you agree to our{' '}
                <a href="/terms" className="text-yellow-500 hover:text-yellow-400">
                  Terms
                </a>{' '}
                and{' '}
                <a href="/conditions" className="text-yellow-500 hover:text-yellow-400">
                  Conditions
                </a>
                .
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
