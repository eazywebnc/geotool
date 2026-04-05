"use client";

import { motion } from "framer-motion";
import {
  ArrowUp,
  ArrowDown,
  Globe,
  Search,
  TrendingUp,
  Zap,
  Plus,
} from "lucide-react";
import Link from "next/link";

const stats = [
  {
    label: "AI Visibility Score",
    value: "72",
    suffix: "/100",
    change: "+8",
    up: true,
    icon: TrendingUp,
    gradient: "from-[#00f0ff] to-[#0ea5e9]",
  },
  {
    label: "Sites Tracked",
    value: "3",
    suffix: "",
    change: "",
    up: true,
    icon: Globe,
    gradient: "from-[#a855f7] to-[#6366f1]",
  },
  {
    label: "Queries Monitored",
    value: "142",
    suffix: "",
    change: "+23",
    up: true,
    icon: Search,
    gradient: "from-[#22c55e] to-[#0ea5e9]",
  },
  {
    label: "Optimization Score",
    value: "85",
    suffix: "%",
    change: "+12",
    up: true,
    icon: Zap,
    gradient: "from-[#f59e0b] to-[#ef4444]",
  },
];

const recentRankings = [
  { query: "best project management tools", engine: "ChatGPT", position: 2, change: 1 },
  { query: "top CRM software 2026", engine: "Perplexity", position: 5, change: -2 },
  { query: "affordable marketing automation", engine: "Gemini", position: 1, change: 3 },
  { query: "team collaboration platforms", engine: "Claude", position: 3, change: 0 },
  { query: "best invoicing software small business", engine: "ChatGPT", position: 4, change: 2 },
];

const engineLogos: Record<string, string> = {
  ChatGPT: "bg-[#10a37f]",
  Perplexity: "bg-[#1a73e8]",
  Gemini: "bg-[#8b5cf6]",
  Claude: "bg-[#d97706]",
};

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-[#64748b] mt-1">Your AI search visibility at a glance</p>
        </div>
        <Link
          href="/dashboard/sites"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-[#050510] bg-[#00f0ff] hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Site
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="p-5 rounded-xl border border-[rgba(0,240,255,0.06)] bg-[rgba(12,12,36,0.5)] backdrop-blur-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.gradient}`}>
                <stat.icon className="w-4 h-4 text-white" />
              </div>
              {stat.change && (
                <span className={`flex items-center gap-1 text-xs font-semibold ${stat.up ? "text-emerald-400" : "text-red-400"}`}>
                  {stat.up ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                  {stat.change}
                </span>
              )}
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-white">{stat.value}</span>
              <span className="text-sm text-[#64748b]">{stat.suffix}</span>
            </div>
            <p className="text-xs text-[#475569] mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Visibility Chart Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="p-6 rounded-xl border border-[rgba(0,240,255,0.06)] bg-[rgba(12,12,36,0.5)]"
      >
        <h2 className="text-lg font-semibold text-white mb-1">Visibility Trend</h2>
        <p className="text-sm text-[#64748b] mb-6">AI visibility score over the last 30 days</p>
        <div className="h-48 flex items-end gap-1">
          {Array.from({ length: 30 }, (_, i) => {
            const height = 30 + Math.sin(i * 0.3) * 20 + Math.random() * 30 + i * 1.2;
            return (
              <div
                key={i}
                className="flex-1 rounded-t-sm bg-gradient-to-t from-[#00f0ff] to-[#a855f7] opacity-60 hover:opacity-100 transition-opacity"
                style={{ height: `${Math.min(height, 100)}%` }}
              />
            );
          })}
        </div>
        <div className="flex justify-between mt-3 text-xs text-[#475569]">
          <span>30 days ago</span>
          <span>Today</span>
        </div>
      </motion.div>

      {/* Recent Rankings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="p-6 rounded-xl border border-[rgba(0,240,255,0.06)] bg-[rgba(12,12,36,0.5)]"
      >
        <h2 className="text-lg font-semibold text-white mb-1">Recent Rankings</h2>
        <p className="text-sm text-[#64748b] mb-6">How your brand appears in AI responses</p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[rgba(0,240,255,0.06)]">
                <th className="text-left py-3 px-2 text-[#475569] font-medium">Query</th>
                <th className="text-left py-3 px-2 text-[#475569] font-medium">Engine</th>
                <th className="text-center py-3 px-2 text-[#475569] font-medium">Position</th>
                <th className="text-center py-3 px-2 text-[#475569] font-medium">Change</th>
              </tr>
            </thead>
            <tbody>
              {recentRankings.map((r, i) => (
                <tr
                  key={i}
                  className="border-b border-[rgba(0,240,255,0.03)] hover:bg-[rgba(0,240,255,0.02)] transition-colors"
                >
                  <td className="py-3 px-2 text-white">{r.query}</td>
                  <td className="py-3 px-2">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${engineLogos[r.engine]}`}>
                      {r.engine}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[rgba(0,240,255,0.08)] text-[#00f0ff] font-bold">
                      #{r.position}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-center">
                    {r.change !== 0 ? (
                      <span className={`flex items-center justify-center gap-1 text-xs font-semibold ${r.change > 0 ? "text-emerald-400" : "text-red-400"}`}>
                        {r.change > 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                        {Math.abs(r.change)}
                      </span>
                    ) : (
                      <span className="text-[#475569] text-xs">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
