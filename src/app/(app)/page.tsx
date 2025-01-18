import { Navigation } from '@/components/landing/navigation'
import { Hero } from '@/components/landing/hero'
import { Features } from '@/components/landing/features'
import { HowItWorks } from '@/components/landing/how-it-works'
import { Pricing } from '@/components/landing/pricing'
import { Newsletter } from '@/components/landing/newsletter'
import { Footer } from '@/components/landing/footer'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black">
      <div className="flex flex-col isolate p-4 gap-y-24">
        <Navigation />
        <Hero />
        <Features />
        <HowItWorks />
        <Pricing />
        <Newsletter />
      </div>
      <Footer />
    </div>
  )
}
