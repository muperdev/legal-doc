import { LegalPage } from "@/components/legal-page/page";

export default function TermsPage() {
  return (
    <LegalPage title="Terms and Conditions">
      <h3 className="text-2xl font-semibold">1. Introduction</h3>
      <p>
        Welcome to Matedocs, a legal document generation platform for startups. These Terms and Conditions (&quot;Terms&quot;) govern your use of our website and services (collectively, the &quot;Service&quot;). By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the Service.
      </p>

      <h3 className="text-2xl font-semibold">2. Definitions</h3>
      <ul className="list-disc pl-6">
        <li>&quot;Matedocs&quot; (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) refers to the Matedocs platform and its operators.</li>
        <li>&quot;User&quot; (&quot;you&quot; or &quot;your&quot;) refers to the individual or entity accessing or using the Service.</li>
        <li>&quot;Content&quot; refers to any text, data, information, images, or other material generated, provided, or otherwise made available through the Service.</li>
      </ul>

      <h3 className="text-2xl font-semibold">3. Use of the Service</h3>
      <h4 className="text-xl font-medium">3.1 Eligibility</h4>
      <p>
        You must be at least 18 years old and capable of forming a binding contract to use our Service. If you are using the Service on behalf of a company or other legal entity, you represent that you have the authority to bind such entity to these Terms.
      </p>

      <h4 className="text-xl font-medium">3.2 User Account</h4>
      <p>
        To access certain features of the Service, you may be required to create an account. You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.
      </p>

      <h4 className="text-xl font-medium">3.3 Acceptable Use</h4>
      <p>
        You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree not to:
      </p>
      <ul className="list-disc pl-6">
        <li>Use the Service in any way that violates any applicable local, national, or international law or regulation.</li>
        <li>Attempt to gain unauthorized access to any portion of the Service or any other systems or networks connected to the Service.</li>
        <li>Use the Service to generate, upload, or distribute any harmful, offensive, or illegal content.</li>
        <li>Interfere with or disrupt the integrity or performance of the Service or third-party data contained therein.</li>
      </ul>

      {/* Continue with the rest of the terms and conditions... */}
    </LegalPage>
  )
}

