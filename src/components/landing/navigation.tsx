import Image from 'next/image'
import Link from 'next/link'

export const Links = [
  { label: 'Home', href: '/' },
  { label: 'Terms', href: '/terms-and-conditions' },
  { label: 'Privacy', href: '/privacy' },
]

export function Navigation() {
  return (
    <nav className="sticky top-0 z-50 bg-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex h-16 items-center justify-between">
          <div className="hidden space-x-8 md:flex">
            {Links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-300 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <Image
            src="/logo.png"
            alt="Logo"
            width={259}
            height={64}
            className="cursor-pointer"
            style={{ backgroundColor: 'transparent' }}
            priority
          />
          <div className="flex items-center space-x-4">
            <Link
              href="/login"
              className="text-sm font-medium text-gray-300 transition-colors hover:text-white"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="bg-[#ffde21] px-5 py-2 text-sm font-medium text-black shadow-md transition-all duration-200 hover:bg-[#e5c71e] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#ffde21] focus:ring-opacity-50"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
