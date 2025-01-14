import { FileText, Shield, Users, Briefcase } from 'lucide-react'
import { FeatureCard } from '@/components/cards/feature-card'

export function Features() {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl ">Key Features</h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Generate professional legal documents with ease.
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              icon={<FileText className="h-12 w-12 text-blue-600" />}
              title="NDA"
              description="Create Non-Disclosure Agreements quickly and easily."
            />
            <FeatureCard
              icon={<Shield className="h-12 w-12 text-blue-600" />}
              title="Privacy Policy"
              description="Generate comprehensive privacy policies for your business."
            />
            <FeatureCard
              icon={<Users className="h-12 w-12 text-blue-600" />}
              title="Terms & Conditions"
              description="Craft clear terms and conditions for your services."
            />
            <FeatureCard
              icon={<Briefcase className="h-12 w-12 text-blue-600" />}
              title="Employment Contracts"
              description="Create legally sound employment contracts."
            />
          </div>
        </div>
      </div>
    </div>
  )
}
