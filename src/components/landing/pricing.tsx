"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Starter",
    price: "$29",
    period: "/month",
    description: "Perfect for small businesses starting with GEO",
    features: [
      "1 website",
      "3 AI engines tracked",
      "50 queries/month",
      "Weekly reports",
      "Email support",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Pro",
    price: "$79",
    period: "/month",
    description: "For growing brands serious about AI visibility",
    features: [
      "5 websites",
      "All AI engines tracked",
      "500 queries/month",
      "Daily reports",
      "Competitor analysis",
      "AI optimization tips",
      "Priority support",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$199",
    period: "/month",
    description: "For agencies and large organizations",
    features: [
      "Unlimited websites",
      "All AI engines tracked",
      "Unlimited queries",
      "Real-time reports",
      "White-label reports",
      "API access",
      "Dedicated account manager",
      "Custom integrations",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export function Pricing() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="pricing" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 gradient-mesh opacity-50" />
      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Simple,{" "}
            <span className="bg-gradient-to-r from-[#00f0ff] to-[#a855f7] bg-clip-text text-transparent">
              transparent
            </span>{" "}
            pricing
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-[#94a3b8]">
            Start free. Upgrade when you&apos;re ready. No hidden fees, no
            surprises.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
              className={`relative p-8 rounded-2xl border backdrop-blur-sm ${
                plan.popular
                  ? "border-[rgba(0,240,255,0.3)] bg-[rgba(0,240,255,0.03)] glow-cyan"
                  : "border-[rgba(0,240,255,0.06)] bg-[rgba(12,12,36,0.5)]"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-[#00f0ff] to-[#a855f7] text-[#050510]">
                  Most Popular
                </div>
              )}
              <h3 className="text-xl font-semibold text-white mb-2">
                {plan.name}
              </h3>
              <p className="text-sm text-[#64748b] mb-6">{plan.description}</p>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-5xl font-bold text-white">
                  {plan.price}
                </span>
                <span className="text-[#64748b]">{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm">
                    <Check className="w-4 h-4 text-[#00f0ff] shrink-0" />
                    <span className="text-[#94a3b8]">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/auth/register"
                className={`block w-full text-center py-3 px-6 rounded-xl font-semibold transition-all ${
                  plan.popular
                    ? "bg-[#00f0ff] text-[#050510] hover:shadow-[0_0_30px_rgba(0,240,255,0.3)]"
                    : "border border-[rgba(0,240,255,0.2)] text-white hover:bg-[rgba(0,240,255,0.05)]"
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
