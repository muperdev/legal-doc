import { Clock, Check, Zap, PenTool } from 'lucide-react'
import { BenefitCard } from '@/components/cards/benefit-card'

export function Benefits() {
  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl ">Why Choose Us</h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Experience the benefits of our platform.
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <BenefitCard
              icon={<Clock className="h-8 w-8 text-blue-600" />}
              title="Quick Document Generation"
              description="Create legal documents in minutes, not hours."
            />
            <BenefitCard
              icon={<Check className="h-8 w-8 text-blue-600" />}
              title="Legally Compliant Templates"
              description="All templates are created and reviewed by legal experts."
            />
            <BenefitCard
              icon={<Zap className="h-8 w-8 text-blue-600" />}
              title="Affordable Pricing"
              description="Get professional legal documents at a fraction of the cost."
            />
            <BenefitCard
              icon={<PenTool className="h-8 w-8 text-blue-600" />}
              title="Easy Customization"
              description="Tailor documents to your specific needs with ease."
            />
          </div>
        </div>
      </div>
    </div>
  )
}
