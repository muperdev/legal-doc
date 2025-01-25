'use client'

import { useState } from 'react'
import { toast } from 'sonner'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email.trim()) {
      setError('Please enter your email address')
      return
    }

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
              <div className="flex flex-col gap-2">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      setError('')
                    }}
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
                {error && <p className="text-red-500 text-sm">{error}</p>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
