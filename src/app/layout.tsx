import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GEOTool — Optimize Your Visibility in AI Search Engines",
  description:
    "Track and improve how your brand appears in ChatGPT, Perplexity, Gemini and other AI-powered search engines. Generative Engine Optimization made simple.",
  keywords: [
    "GEO",
    "generative engine optimization",
    "AI search optimization",
    "ChatGPT SEO",
    "Perplexity optimization",
    "AI visibility",
    "AI search ranking",
    "GEO tool",
    "AI SEO tool",
    "brand visibility AI",
  ],
  metadataBase: new URL("https://geotool.eazyweb.nc"),
  alternates: {
    canonical: "https://geotool.eazyweb.nc",
  },
  openGraph: {
    title: "GEOTool — Optimize Your Visibility in AI Search Engines",
    description:
      "Track and improve how your brand appears in ChatGPT, Perplexity, Gemini and other AI-powered search engines.",
    url: "https://geotool.eazyweb.nc",
    siteName: "GEOTool",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GEOTool — AI Search Visibility Optimizer",
    description:
      "Track and improve how your brand appears in AI-powered search engines.",
  },
  robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: "GEOTool",
      url: "https://geotool.eazyweb.nc",
      publisher: {
        "@type": "Organization",
        name: "EazyWebNC",
        url: "https://eazyweb.nc",
        logo: { "@type": "ImageObject", url: "https://eazyweb.nc/logo.png" },
      },
    },
    {
      "@type": "SoftwareApplication",
      name: "GEOTool",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: "https://geotool.eazyweb.nc",
      description:
        "Track and improve how your brand appears in ChatGPT, Perplexity, Gemini and other AI-powered search engines.",
      offers: [
        { "@type": "Offer", name: "Starter", price: "29", priceCurrency: "USD", priceValidUntil: "2027-12-31" },
        { "@type": "Offer", name: "Pro", price: "79", priceCurrency: "USD", priceValidUntil: "2027-12-31" },
        { "@type": "Offer", name: "Enterprise", price: "199", priceCurrency: "USD", priceValidUntil: "2027-12-31" },
      ],
      creator: { "@type": "Organization", name: "EazyWebNC", url: "https://eazyweb.nc" },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is Generative Engine Optimization (GEO)?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "GEO is the practice of optimizing your brand's visibility in AI-powered search engines like ChatGPT, Perplexity, and Gemini. It ensures AI models cite and recommend your brand accurately.",
          },
        },
        {
          "@type": "Question",
          name: "Which AI search engines does GEOTool track?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "GEOTool monitors your brand's presence across ChatGPT, Perplexity, Gemini, Claude, and other major AI-powered search platforms.",
          },
        },
        {
          "@type": "Question",
          name: "How do I improve my AI search visibility?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "GEOTool analyzes how AI models perceive your brand and provides actionable recommendations to improve citations, accuracy, and ranking in AI-generated responses.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-cyan-500 focus:text-black focus:px-4 focus:py-2 focus:rounded"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
