import Link from 'next/link'
import Image from 'next/image'

export function Hero() {
  return (
    <div className="relative bg-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
          {/* Left Content */}
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold text-white sm:text-6xl lg:text-7xl font-blackHanSans tracking-wider">
              Contracts, are not scary anymore
            </h1>
            <p className="mt-6 text-lg text-gray-300">
              GimmeDoc.com&apos;s got your back, startups! We make legal stuff easy peasy. Save time
              and cash with our slick auto-doc magic.
            </p>
            <div className="mt-8 flex gap-4">
              <Link
                href="/signup"
                className="bg-primary px-8 py-3 text-base font-medium text-black transition-all hover:bg-[#e5c71e]"
              >
                Get Started
              </Link>
              <Link
                href="/learn-more"
                className="border border-white px-8 py-3 text-base font-medium text-white transition-all hover:bg-white/10"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Right Content - Image Placeholder */}
          <div className="w-full justify-center items-center md:flex hidden">
            <Image
              src="/hero.png"
              alt="Hero illustration"
              width={296}
              height={296}
              className=""
              style={{ backgroundColor: 'transparent' }}
              priority
            />
          </div>
        </div>
      </div>
    </div>
  )
}
