import { Navigation } from '@/components/landing/navigation'
import { LegalPage } from '@/components/legal-page/page'
import { currentUser } from '@/lib/auth'

export default async function TermsPage() {
  const user = await currentUser()
  return (
    <div className="flex-1 space-y-4 p-8 pt-6 blackHanSans bg-black min-h-screen">
      <Navigation authenticated={!!user} />
      <LegalPage title="Terms and Conditions">
        <p className="text-sm text-gray-400 mb-6">Effective Date: January 1, 2024</p>

        <p className="mb-6 text-gray-300">
          Welcome to gimmedoc.com. By using our website and services, you agree to the following
          Terms and Conditions. If you do not agree with any part of these terms, please do not use
          our services.
        </p>

        <h3 className="text-2xl font-semibold mt-8 text-white">1. Services Provided</h3>
        <p className="mb-6 text-gray-300">
          Gimmedoc.com offers legal document generation services to startups. Users can select from
          different pricing packages to access these services.
        </p>

        <h3 className="text-2xl font-semibold mt-8 text-white">2. Account Creation</h3>
        <p className="mb-6 text-gray-300">
          To access our services, you may need to create an account. You agree to provide accurate
          and up-to-date information and are responsible for maintaining the confidentiality of your
          account details.
        </p>

        <h3 className="text-2xl font-semibold mt-8 text-white">3. Pricing and Payment</h3>
        <ul className="list-disc pl-6 mb-6 text-gray-300">
          <li>Basic Package: $19/month</li>
          <li>Pro Package: $29/month</li>
          <li>Enterprise Package: $49/month</li>
        </ul>
        <p className="mb-6 text-gray-300">
          Payment is required for the selected package upon account creation, and you agree to make
          timely payments to continue receiving services.
        </p>

        <h3 className="text-2xl font-semibold mt-8 text-white">4. User Obligations</h3>
        <p className="mb-6 text-gray-300">
          You agree to use our services only for lawful purposes and not to violate any local,
          state, or international regulations. You are responsible for any content you generate
          using gimmedoc.com.
        </p>

        <h3 className="text-2xl font-semibold mt-8 text-white">5. Refunds and Cancellations</h3>
        <p className="mb-6 text-gray-300">
          Please see our Refund Policy for information about refunds and cancellations.
        </p>

        <h3 className="text-2xl font-semibold mt-8 text-white">6. Limitations of Liability</h3>
        <p className="mb-6 text-gray-300">
          Gimmedoc.com shall not be liable for any direct, indirect, incidental, special, or
          consequential damages arising out of the use or inability to use our services.
        </p>

        <h3 className="text-2xl font-semibold mt-8 text-white">7. Changes to Terms</h3>
        <p className="mb-6 text-gray-300">
          We reserve the right to modify or update these Terms and Conditions at any time. You will
          be notified of such changes, and continued use of our services constitutes acceptance of
          the new terms.
        </p>

        <h3 className="text-2xl font-semibold mt-8 text-white">8. Governing Law</h3>
        <p className="mb-6 text-gray-300">
          These Terms and Conditions are governed by and construed in accordance with the laws of
          the United States.
        </p>
      </LegalPage>
    </div>
  )
}
