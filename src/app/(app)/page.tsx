import { Navigation } from '@/components/landing/navigation'
import { Hero } from '@/components/landing/hero'
import { Features } from '@/components/landing/features'
import { Benefits } from '@/components/landing/benefits'
import { HowItWorks } from '@/components/landing/how-it-works'
import { Pricing } from '@/components/landing/pricing'
// Import other components...

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      <Navigation />
      <Hero />
      <Features />
      <Benefits />
      <HowItWorks />
      <Pricing />
    </div>
  )
}
