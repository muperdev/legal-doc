import { Navigation } from '@/components/landing/navigation'
import { LegalPage } from '@/components/legal-page/page'

export default function RefundPolicyPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6 font-sans">
      <Navigation />
      <LegalPage title="Refund Policy">
        <h3 className="text-2xl font-semibold">1. Introduction</h3>
        <p>
          At Matedocs, we strive to ensure our customers are satisfied with our legal document
          generation service. This Refund Policy outlines our guidelines for refunds and
          cancellations. By using our service, you agree to this policy.
        </p>

        <h3 className="text-2xl font-semibold">2. Subscription Cancellations</h3>
        <h4 className="text-xl font-medium">2.1 Cancellation Process</h4>
        <p>
          You may cancel your subscription at any time through your account settings or by
          contacting our customer support. Upon cancellation:
        </p>
        <ul className="list-disc pl-6">
          <li>
            Your subscription will remain active until the end of your current billing period.
          </li>
          <li>You will not be charged for the next billing cycle.</li>
          <li>
            You will continue to have access to the service until the end of your paid subscription
            period.
          </li>
        </ul>

        <h4 className="text-xl font-medium">2.2 No Partial Refunds</h4>
        <p>
          We do not provide refunds for partial subscription periods. When you cancel a
          subscription, you will have access to the service until the end of your current billing
          period, but no refund will be issued for the unused portion of your subscription.
        </p>

        <h3 className="text-2xl font-semibold">3. Refund Eligibility</h3>
        <h4 className="text-xl font-medium">3.1 14-Day Money-Back Guarantee</h4>
        <p>
          We offer a 14-day money-back guarantee for new subscribers. If you are not satisfied with
          our service, you may request a full refund within 14 days of your initial subscription
          purchase.
        </p>

        {/* Continue with the rest of the refund policy... */}
      </LegalPage>
    </div>
  )
}
