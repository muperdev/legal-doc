import Link from 'next/link'

interface PricingCardProps {
  title: string
  price: string
  description: string
  features: string[]
  highlighted?: boolean
}

export function PricingCard({
  title,
  price,
  description,
  features,
  highlighted = false,
}: PricingCardProps) {
  return (
    <div
      className={`rounded-lg shadow-lg overflow-hidden ${highlighted ? 'border-2 border-blue-500' : ''}`}
    >
      <div className="px-6 py-8 bg-black sm:p-10 sm:pb-6">
        <h3 className="text-2xl leading-8 font-extrabold text-white sm:text-3xl sm:leading-9">
          {title}
        </h3>
        <div className="mt-4 flex items-baseline text-6xl leading-none font-extrabold">
          {price}
          {price !== 'Custom' && (
            <span className="ml-1 text-2xl leading-8 font-medium text-gray-500">/mo</span>
          )}
        </div>
        <p className="mt-5 text-lg leading-7 text-gray-500">{description}</p>
      </div>
      <div className="px-6 pt-6 pb-8 bg-black sm:p-10 sm:pt-6">
        <ul>
          {features.map((feature, index) => (
            <li key={index} className="mt-4 flex items-start">
              <div className="flex-shrink-0">
                <svg
                  className="h-6 w-6 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p className="ml-3 text-base leading-6 text-white">{feature}</p>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <div className="rounded-lg shadow-md">
            <Link
              href="/signup"
              className={`block w-full text-center rounded-lg border border-transparent px-6 py-3 text-base leading-6 font-medium ${
                highlighted
                  ? 'bg-gradient-to-r from-primary-blue to-blue-600 text-white hover:from-blue-600 hover:to-primary-blue transition-all duration-200'
                  : 'bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800 hover:from-gray-300 hover:to-gray-400'
              } rounded-full shadow-lg focus:outline-none focus:ring-2 ${
                highlighted ? 'focus:ring-purple-500' : 'focus:ring-gray-400'
              } focus:ring-opacity-50 transform hover:scale-105 transition-all duration-200`}
            >
              Get started
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
