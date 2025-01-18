import { Navigation } from '@/components/landing/navigation'
import { LegalPage } from '@/components/legal-page/page'

export default function PrivacyPolicyPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6 font-sans bg-black min-h-screen">
      <Navigation />
      <LegalPage title="Privacy Policy">
        <p className="text-sm text-gray-400 mb-6">Effective Date: January 1, 2024</p>

      <p className="mb-6 text-gray-300">
        At gimmedoc.com, your privacy is important to us. This Privacy Policy explains how we
        collect, use, and protect your information.
      </p>

      <h3 className="text-2xl font-semibold mt-8 text-white">1. Information Collection</h3>
      <p className="mb-4 text-gray-300">
        We collect personal information when you create an account, make a purchase, or use our
        services. This may include:
      </p>
      <ul className="list-disc pl-6 mb-6 text-gray-300">
        <li>Name</li>
        <li>Email Address</li>
        <li>Payment Information</li>
        <li>Usage Data</li>
      </ul>

      <h3 className="text-2xl font-semibold mt-8 text-white">2. How We Use Your Information</h3>
      <p className="mb-4 text-gray-300">We use your information to:</p>
      <ul className="list-disc pl-6 mb-6 text-gray-300">
        <li>Provide and improve our services</li>
        <li>Process transactions</li>
        <li>Communicate with you</li>
        <li>Comply with legal obligations</li>
      </ul>

      <h3 className="text-2xl font-semibold mt-8 text-white">3. Data Security</h3>
      <p className="mb-6 text-gray-300">
        We implement industry-standard security measures to protect your personal information from
        unauthorized access, alteration, or destruction.
      </p>

      <h3 className="text-2xl font-semibold mt-8 text-white">4. Cookies</h3>
      <p className="mb-6 text-gray-300">
        We use cookies to enhance your experience on our website. You can control cookie settings
        through your browser.
      </p>

      <h3 className="text-2xl font-semibold mt-8 text-white">5. Sharing Your Information</h3>
      <p className="mb-6 text-gray-300">
        We do not sell or rent your personal information to third parties. We may share your
        information with trusted service providers to assist in operating our website and services.
      </p>

      <h3 className="text-2xl font-semibold mt-8 text-white">6. Your Rights</h3>
      <p className="mb-6 text-gray-300">
        You have the right to access, update, or delete your personal information. You can also
        object to certain processing activities.
      </p>

      <h3 className="text-2xl font-semibold mt-8 text-white">7. Changes to Privacy Policy</h3>
      <p className="mb-6 text-gray-300">
        We may update this Privacy Policy from time to time. We will notify you of any material
          changes.
        </p>
      </LegalPage>
    </div>
  )
}
