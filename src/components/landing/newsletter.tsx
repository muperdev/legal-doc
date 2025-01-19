'use client'

import { useState } from 'react'

export function Newsletter() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter signup
    console.log('Newsletter signup:', email)
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
                  className="flex-grow px-4 py-3 bg-transparent border-2 border-white rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-black text-white border-2 border-white rounded-md hover:bg-white hover:text-black transition-colors sm:w-auto w-full"
                >
                  Join Now
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
