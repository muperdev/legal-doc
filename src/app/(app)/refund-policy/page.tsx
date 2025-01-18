import { Navigation } from '@/components/landing/navigation'
import { LegalPage } from '@/components/legal-page/page'
import { Footer } from '@/components/landing/footer'

export default function RefundPolicyPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6 font-sans bg-black min-h-screen">
      <Navigation />
      <LegalPage title="Refund Policy">
        <p className="text-sm text-gray-400 mb-6">Effective Date: January 1, 2024</p>

        <p className="mb-6 text-gray-300">
          At gimmedoc.com, we want you to be satisfied with our services. If you are not happy with
          your purchase, we offer the following refund policy:
        </p>

        <h3 className="text-2xl font-semibold mt-8 text-white">1. Refund Eligibility</h3>
        <p className="mb-6 text-gray-300">
          Refunds are only available within 14 days of purchase for new subscriptions. After 14
          days, no refunds will be issued.
        </p>

        <h3 className="text-2xl font-semibold mt-8 text-white">2. Refund Process</h3>
        <p className="mb-6 text-gray-300">
          To request a refund, please contact us at support@gimmedoc.com with your order details. We
          will process your refund within 5-7 business days of receiving your request.
        </p>

        <h3 className="text-2xl font-semibold mt-8 text-white">3. Exceptions</h3>
        <p className="mb-6 text-gray-300">
          Refunds are not available for canceled or refunded transactions or for services already
          rendered.
        </p>

        <h3 className="text-2xl font-semibold mt-8 text-white">4. Cancellation</h3>
        <p className="mb-6 text-gray-300">
          You can cancel your subscription at any time through your account settings. Upon
          cancellation, you will retain access to your subscription until the end of your current
          billing period.
        </p>
      </LegalPage>
      <Footer />
    </div>
  )
}
