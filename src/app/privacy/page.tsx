import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | GEOTool",
  description: "GEOTool privacy policy. How we collect, use, and protect your data.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-cyan-400 hover:underline mb-8 inline-block" aria-label="Back to homepage">&larr; Back to home</Link>
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <p className="text-zinc-400 mb-4">Last updated: April 2026</p>

        <section className="space-y-6 text-zinc-300">
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">1. Information We Collect</h2>
            <p>We collect information you provide directly: email address, name, and payment information through Stripe. We also collect usage data including pages visited, queries tracked, and AI search engine ranking data to improve our service.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">2. How We Use Your Information</h2>
            <p>Your information is used to provide and improve GEOTool&apos;s AI search visibility tracking, process transactions, generate ranking reports, send service-related communications, and ensure security of your account.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">3. Data Sharing</h2>
            <p>We do not sell your personal data. We share data only with: Stripe (payment processing), Supabase (database hosting), and Cloudflare (hosting and security). Ranking data collected from AI search engines is used solely to provide you with visibility insights.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">4. Data Security</h2>
            <p>We implement industry-standard security measures including encryption in transit (TLS), secure authentication, and row-level security to protect your data.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">5. Your Rights</h2>
            <p>You can request access to, correction of, or deletion of your personal data at any time by contacting us at <a href="mailto:contact@eazyweb.nc" className="text-cyan-400 hover:underline">contact@eazyweb.nc</a>.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">6. Contact</h2>
            <p>For privacy-related inquiries: <a href="mailto:contact@eazyweb.nc" className="text-cyan-400 hover:underline">contact@eazyweb.nc</a></p>
          </div>
        </section>
      </div>
    </main>
  );
}
