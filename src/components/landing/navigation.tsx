import Image from 'next/image'
import Link from 'next/link'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const Links = [
  { label: 'Home', href: '/' },
  { label: 'Terms', href: '/terms-and-conditions' },
  { label: 'Privacy', href: '/privacy' },
]

export function Navigation({ authenticated }: { authenticated: boolean }) {
  return (
    <nav className="sticky top-0 z-50 bg-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex h-16 items-center justify-between">
          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex w-[300px] flex-col bg-black p-6">
                <div className="flex h-full flex-col justify-between">
                  <div className="flex flex-col space-y-4">
                    {Links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="text-lg font-medium text-gray-300 transition-colors hover:text-white font-blackHanSans"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                  {authenticated ? (
                    <Link
                      href="/dashboard/new-document"
                      className="bg-primary px-5 py-2 text-center text-lg font-medium text-black shadow-md transition-all duration-200 hover:bg-[#e5c71e] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                    >
                      Get a Doc
                    </Link>
                  ) : (
                    <div className="flex flex-col space-y-4 pt-4 border-t border-gray-800">
                      <Link
                        href="/login"
                        className="text-lg font-medium text-gray-300 transition-colors hover:text-white font-blackHanSans"
                      >
                        Log in
                      </Link>
                      <Link
                        href="/signup"
                        className="bg-primary px-5 py-2 text-center text-lg font-medium text-black shadow-md transition-all duration-200 hover:bg-[#e5c71e] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                      >
                        Sign Up
                      </Link>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Menu */}
          <div className="hidden space-x-8 md:flex">
            {Links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-300 transition-colors hover:text-white font-blackHanSans"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Logo */}
          <Link
            href="/"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:static md:transform-none"
          >
            <Image
              src="/logo.png"
              alt="Logo"
              width={259}
              height={64}
              className="cursor-pointer"
              style={{ backgroundColor: 'transparent' }}
              priority
            />
          </Link>

          {/* Auth Buttons - Desktop Only */}
          {authenticated ? (
            <div className="hidden md:flex items-center space-x-4">
              <Link
                href="/dashboard/new-document"
                className="bg-primary px-5 py-2 text-sm font-medium text-black shadow-md transition-all duration-200 hover:bg-[#e5c71e] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
              >
                Gimme a Doc
              </Link>
              <Link
                href="/dashboard"
                className="bg-black border-primary border px-5 py-2 text-sm font-medium text-white shadow-md transition-all duration-200 hover:bg-[#e5c71e] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
              >
                Dashboard
              </Link>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-4">
              <Link
                href="/login"
              className="text-sm font-medium text-gray-300 transition-colors hover:text-white"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="bg-primary px-5 py-2 text-sm font-medium text-black shadow-md transition-all duration-200 hover:bg-[#e5c71e] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
            >
              Sign Up
            </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
