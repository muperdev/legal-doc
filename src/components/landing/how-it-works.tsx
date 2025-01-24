import { Box } from 'lucide-react'

export function HowItWorks() {
  return (
    <div className="py-8 md:py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-sm font-medium text-yellow-500">Ease</span>
          <h2 className="mt-2 text-4xl font-bold text-white sm:text-5xl font-blackHanSans">
            Doc Creation Made Easy in 3 Steps,{' '}
            <span className="block text-primary mt-2">COME ONNNNN!</span>
          </h2>
          <p className="mt-4 text-xl text-gray-300">Follow these steps, and you will be fine.</p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-3">
            <div className="text-center">
              <div className="flex justify-center">
                <Box className="h-12 w-12 text-yellow-500" />
              </div>
              <h3 className="mt-6 text-2xl font-semibold text-white font-blackHanSans">
                Step i: Enter Your Details
              </h3>
              <p className="mt-4 text-gray-300">
                Input your information into our user-friendly form.
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center">
                <Box className="h-12 w-12 text-yellow-500" />
              </div>
              <h3 className="mt-6 text-2xl font-semibold text-white font-blackHanSans">
                Step ii: Customize Your Document
              </h3>
              <p className="mt-4 text-gray-300">Tailor the document to fit your specific needs.</p>
            </div>

            <div className="text-center">
              <div className="flex justify-center">
                <Box className="h-12 w-12 text-yellow-500" />
              </div>
              <h3 className="mt-6 text-2xl font-semibold text-white font-blackHanSans">
                Step iii: Download or Share Instantly
              </h3>
              <p className="mt-4 text-gray-300">Receive your document in just a few clicks.</p>
            </div>
          </div>
        </div>

        <div className="mt-16 flex justify-center gap-4">
          <button className="inline-flex items-center px-6 py-3 border border-yellow-500 text-base font-medium  text-yellow-500 hover:bg-yellow-500 hover:text-black transition-colors">
            Start
          </button>
        </div>
      </div>
    </div>
  )
}
