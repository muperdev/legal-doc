import { Box } from 'lucide-react'
import Link from 'next/link'

export function Features() {
  return (
    <div className="bg-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl">
          <h3 className="text-lg font-medium text-[#ffde21]">Efficiency</h3>
          <h2 className="mt-6 text-4xl font-bold text-white sm:text-5xl">
            GimmeDoc is the feeling u missed!
          </h2>
          <p className="mt-6 text-xl text-gray-300">
            Get your legal stuff locked down with our automated solutions. You focus on blowing up
            your startup while we take care of the legal docs.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="mt-20 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
          {/* Card 1 */}
          <div className="space-y-6">
            <Box className="h-12 w-12 text-[#ffde21]" />
            <h3 className="text-2xl font-bold text-white">
              Why Roll with GimmeDoc for Your Legal Stuff?
            </h3>
            <p className="text-gray-300">Save time and resources with our efficient platform.</p>
            <div className="flex items-center space-x-4 pt-4">
              <Link
                href="/signup"
                className="border border-white px-6 py-2 text-sm font-medium text-white transition-all hover:bg-white/10"
              >
                Get Started
              </Link>
              <Link href="/learn-more" className="flex items-center text-sm font-medium text-white">
                Learn More <span className="ml-2">→</span>
              </Link>
            </div>
          </div>

          {/* Card 2 */}
          <div className="space-y-6">
            <Box className="h-12 w-12 text-[#ffde21]" />
            <h3 className="text-2xl font-bold text-white">
              Budget-Friendly Hacks for Every Startup
            </h3>
            <p className="text-gray-300">Cost-effective plans designed to fit your budget.</p>
          </div>

          {/* Card 3 */}
          <div className="space-y-6">
            <Box className="h-12 w-12 text-[#ffde21]" />
            <h3 className="text-2xl font-bold text-white">Reliable and Ace Doc Creation</h3>
            <p className="text-gray-300">Ensure your documents meet all legal standards.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
