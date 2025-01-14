import { StepCard } from '../cards/step-card'

export function HowItWorks() {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl ">How It Works</h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Generate legal documents in just three simple steps.
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
            <StepCard
              number={1}
              title="Answer a few questions"
              description="Provide basic information about your needs."
            />
            <StepCard
              number={2}
              title="Customize your document"
              description="Review and adjust the generated document as needed."
            />
            <StepCard
              number={3}
              title="Download and use immediately"
              description="Get your legal document ready for use instantly."
            />
          </div>
        </div>
      </div>
    </div>
  )
}
