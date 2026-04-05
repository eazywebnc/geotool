"use client";

import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Eye, MessageSquare } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Analytics</h1>
        <p className="text-[#64748b] mt-1">Deep dive into your AI search performance</p>
      </div>

      {/* Engine Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-xl border border-[rgba(0,240,255,0.06)] bg-[rgba(12,12,36,0.5)]"
      >
        <h2 className="text-lg font-semibold text-white mb-6">Engine Distribution</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { engine: "ChatGPT", score: 82, color: "#10a37f", mentions: 234 },
            { engine: "Perplexity", score: 67, color: "#1a73e8", mentions: 156 },
            { engine: "Gemini", score: 74, color: "#8b5cf6", mentions: 189 },
            { engine: "Claude", score: 71, color: "#d97706", mentions: 142 },
          ].map((eng, i) => (
            <motion.div
              key={eng.engine}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + i * 0.1 }}
              className="text-center p-4"
            >
              <div className="relative w-24 h-24 mx-auto mb-3">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(0,240,255,0.05)" strokeWidth="8" />
                  <circle
                    cx="50" cy="50" r="40" fill="none"
                    stroke={eng.color} strokeWidth="8"
                    strokeDasharray={`${eng.score * 2.51} 251`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold text-white">{eng.score}</span>
                </div>
              </div>
              <h3 className="text-sm font-semibold text-white">{eng.engine}</h3>
              <p className="text-xs text-[#475569]">{eng.mentions} mentions</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Metrics Grid */}
      <div className="grid sm:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 rounded-xl border border-[rgba(0,240,255,0.06)] bg-[rgba(12,12,36,0.5)]"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-gradient-to-br from-[#00f0ff] to-[#0ea5e9]">
              <Eye className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-white font-semibold">Visibility Over Time</h3>
          </div>
          <div className="h-40 flex items-end gap-1">
            {Array.from({ length: 12 }, (_, i) => {
              const h = 40 + Math.sin(i * 0.5) * 15 + i * 4;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full rounded-t bg-gradient-to-t from-[#00f0ff] to-[#a855f7] opacity-60 hover:opacity-100 transition-opacity"
                    style={{ height: `${Math.min(h, 100)}%` }}
                  />
                </div>
              );
            })}
          </div>
          <div className="flex justify-between mt-2 text-xs text-[#475569]">
            <span>Jan</span><span>Jun</span><span>Dec</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 rounded-xl border border-[rgba(0,240,255,0.06)] bg-[rgba(12,12,36,0.5)]"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-gradient-to-br from-[#a855f7] to-[#6366f1]">
              <MessageSquare className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-white font-semibold">Sentiment Analysis</h3>
          </div>
          <div className="space-y-4 mt-6">
            {[
              { label: "Positive", pct: 68, color: "#22c55e" },
              { label: "Neutral", pct: 24, color: "#f59e0b" },
              { label: "Negative", pct: 8, color: "#ef4444" },
            ].map((s) => (
              <div key={s.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-[#94a3b8]">{s.label}</span>
                  <span className="text-white font-medium">{s.pct}%</span>
                </div>
                <div className="h-2 rounded-full bg-[rgba(0,240,255,0.05)]">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${s.pct}%` }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: s.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
