import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | GEOTool",
  description: "GEOTool terms of service. Usage rules, subscription terms, and legal information.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-cyan-400 hover:underline mb-8 inline-block" aria-label="Back to homepage">&larr; Back to home</Link>
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <p className="text-zinc-400 mb-4">Last updated: April 2026</p>

        <section className="space-y-6 text-zinc-300">
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">1. Acceptance of Terms</h2>
            <p>By accessing or using GEOTool, you agree to be bound by these Terms of Service. If you do not agree, do not use our service.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">2. Service Description</h2>
            <p>GEOTool provides AI search engine visibility tracking and optimization tools. We monitor how your brand appears across ChatGPT, Perplexity, Gemini, Claude, and other AI-powered search engines, and provide ranking reports and actionable insights.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">3. User Accounts</h2>
            <p>You must provide accurate information when creating an account. You are responsible for maintaining the security of your account credentials and for all activities under your account.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">4. Subscriptions & Payments</h2>
            <p>Paid plans are billed monthly or annually via Stripe. You may cancel at any time. Refunds are handled on a case-by-case basis. Free plan users are subject to usage limits as described in our pricing.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">5. Acceptable Use</h2>
            <p>You agree not to misuse our service, attempt to reverse-engineer our algorithms, use the service for illegal purposes, or share account credentials with unauthorized parties.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">6. Data Ownership</h2>
            <p>You retain ownership of your data. We claim no ownership over your sites, queries, or business information. You grant us a license to process this data solely to provide the service.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">7. Limitation of Liability</h2>
            <p>GEOTool is provided &quot;as is&quot; without warranties. We are not liable for ranking fluctuations, data inaccuracies from third-party AI engines, or indirect damages arising from use of the service.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">8. Changes to Terms</h2>
            <p>We may update these terms at any time. Continued use after changes constitutes acceptance. We will notify registered users of significant changes via email.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">9. Contact</h2>
            <p>Questions about these terms? Contact us at <a href="mailto:contact@eazyweb.nc" className="text-cyan-400 hover:underline">contact@eazyweb.nc</a></p>
          </div>
        </section>
      </div>
    </main>
  );
}
