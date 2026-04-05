"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  BarChart3,
  Brain,
  FileText,
  Globe,
  LineChart,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: Globe,
    title: "Multi-Engine Tracking",
    description:
      "Monitor your visibility across ChatGPT, Perplexity, Gemini, Claude, and more. One dashboard, all AI engines.",
    gradient: "from-[#00f0ff] to-[#0ea5e9]",
  },
  {
    icon: BarChart3,
    title: "Real-Time Rankings",
    description:
      "See exactly where and how often your brand appears in AI-generated responses. Updated every hour.",
    gradient: "from-[#a855f7] to-[#6366f1]",
  },
  {
    icon: Brain,
    title: "AI-Powered Insights",
    description:
      "Get actionable recommendations on how to improve your content for better AI engine visibility.",
    gradient: "from-[#00f0ff] to-[#a855f7]",
  },
  {
    icon: LineChart,
    title: "Competitor Analysis",
    description:
      "Benchmark your GEO performance against competitors. Know who&apos;s winning in AI search.",
    gradient: "from-[#f59e0b] to-[#ef4444]",
  },
  {
    icon: FileText,
    title: "Automated Reports",
    description:
      "Weekly and monthly reports delivered to your inbox. Share with stakeholders in one click.",
    gradient: "from-[#22c55e] to-[#0ea5e9]",
  },
  {
    icon: Zap,
    title: "Instant Optimization",
    description:
      "One-click content suggestions that improve how AI engines reference your brand and products.",
    gradient: "from-[#ec4899] to-[#a855f7]",
  },
];

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      className="group relative p-6 sm:p-8 rounded-2xl border border-[rgba(0,240,255,0.06)] bg-[rgba(12,12,36,0.5)] backdrop-blur-sm hover:border-[rgba(0,240,255,0.15)] transition-all duration-500"
    >
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[rgba(0,240,255,0.03)] to-transparent" />
      <div
        className={`relative inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} mb-5`}
      >
        <feature.icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="relative text-xl font-semibold text-white mb-3">
        {feature.title}
      </h3>
      <p className="relative text-[#94a3b8] leading-relaxed">
        {feature.description}
      </p>
    </motion.div>
  );
}

export function Features() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-50px" });

  return (
    <section id="features" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Everything you need to
            <span className="block bg-gradient-to-r from-[#00f0ff] to-[#a855f7] bg-clip-text text-transparent">
              own AI search
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-[#94a3b8]">
            GEOTool gives you the complete toolkit to track, analyze, and
            optimize your presence across all AI-powered search engines.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
