import { LegalPage } from "@/components/legal-page/page";

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <h3 className="text-2xl font-semibold">1. Introduction</h3>
      <p>
        Matedocs (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting the
        privacy of our users (&quot;you&quot; or &quot;your&quot;). This Privacy Policy explains how
        we collect, use, disclose, and safeguard your information when you use our legal document
        generation platform (the &quot;Service&quot;).
      </p>
      <p>
        Please read this Privacy Policy carefully. By accessing or using the Service, you
        acknowledge that you have read, understood, and agree to be bound by all the terms outlined
        in this Privacy Policy. If you do not agree with our policies and practices, please do not
        use our Service.
      </p>

      <h3 className="text-2xl font-semibold">2. Information We Collect</h3>
      <p>We collect several types of information from and about users of our Service, including:</p>

      <h4 className="text-xl font-medium">2.1 Personal Data</h4>
      <p>
        Personal Data refers to any information that identifies or can be used to identify an
        individual. We may collect the following types of Personal Data:
      </p>
      <ul className="list-disc pl-6">
        <li>Name</li>
        <li>Email address</li>
        <li>Billing address</li>
        <li>Payment information (processed securely through Paddle)</li>
        <li>Company name and details (for business users)</li>
        <li>IP address</li>
        <li>Usage data and preferences</li>
      </ul>

      <h4 className="text-xl font-medium">2.2 Non-Personal Data</h4>
      <p>
        We may also collect non-personal data that does not directly or indirectly reveal your
        identity or directly relate to an identifiable individual, such as:
      </p>
      <ul className="list-disc pl-6">
        <li>Browser and device information</li>
        <li>Usage data</li>
        <li>Aggregated data</li>
      </ul>

      {/* Continue with the rest of the privacy policy... */}
    </LegalPage>
  )
}
