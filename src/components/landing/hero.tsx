import Link from 'next/link'

export function Hero() {
  return (
    <div className="py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-bold text-white sm:text-5xl md:text-6xl ">
            Create Legal Docs in Minutes!
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-white sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Tailored for startups, freelancers, and entrepreneurs.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <Link
              href="/signup"
              className="w-max flex items-center justify-center px-6 py-3 bg-gradient-to-r bg-primary-blue text-white font-medium rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-opacity-50 transform hover:scale-105 transition-all duration-200"
            >
              Start for Free
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
