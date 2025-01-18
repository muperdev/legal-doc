import Image from 'next/image'
import Link from 'next/link'

export function Navigation() {
  return (
    <nav className="bg-black text-white shadow-sm sticky top-0 z-50 pt-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Image src="/logo.png" alt="Logo" width={200} height={20} />
            </div>
          </div>
          <div className="flex items-center">
            <Link
              href="/login"
              className="text-white hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="ml-4 px-6 py-3 bg-gradient-to-r bg-primary-blue text-white font-medium rounded-lg shadow-lg focus:outline-none focus:ring-2 hover:bg-blue-600 focus:ring-opacity-50 transform hover:scale-105 transition-all duration-200"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
