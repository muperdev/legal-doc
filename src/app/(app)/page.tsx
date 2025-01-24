import { Navigation } from '@/components/landing/navigation'
import { Hero } from '@/components/landing/hero'
import { Features } from '@/components/landing/features'
import { HowItWorks } from '@/components/landing/how-it-works'
import { Pricing } from '@/components/landing/pricing'
import { Newsletter } from '@/components/landing/newsletter'
import { Footer } from '@/components/landing/footer'
import { ProductHunt } from '@/components/landing/product-hunt'
import { currentUser } from '@/lib/auth'
import { cookies } from 'next/headers'

export default async function LandingPage() {
  const user = await currentUser()
  const cookieStore = await cookies()
  const token = cookieStore.get('payload-token')?.value || null

  return (
    <div className="min-h-screen bg-black">
      <div className="flex flex-col isolate p-4 gap-y-24">
        <Navigation authenticated={!!user} />
        <Hero />
        <Features />
        <ProductHunt />
        <HowItWorks />
        <Pricing userSubscriptionStatus={user?.subscription?.status || null} token={token} />
        <Newsletter />
      </div>
      <Footer />
    </div>
  )
}
