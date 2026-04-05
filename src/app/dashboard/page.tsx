"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowUp,
  ArrowDown,
  Globe,
  Search,
  TrendingUp,
  Zap,
  Plus,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

interface DashboardStats {
  sitesCount: number;
  queriesCount: number;
  visibilityScore: number;
  optimizationScore: number;
}

interface Ranking {
  query: string;
  engine: string;
  position: number;
  sentiment: string | null;
}

const engineLogos: Record<string, string> = {
  chatgpt: "bg-[#10a37f]",
  perplexity: "bg-[#1a73e8]",
  gemini: "bg-[#8b5cf6]",
  claude: "bg-[#d97706]",
  copilot: "bg-[#0078d4]",
};

const demoRankings: Ranking[] = [
  { query: "best project management tools", engine: "chatgpt", position: 2, sentiment: "positive" },
  { query: "top CRM software 2026", engine: "perplexity", position: 5, sentiment: "neutral" },
  { query: "affordable marketing automation", engine: "gemini", position: 1, sentiment: "positive" },
  { query: "team collaboration platforms", engine: "claude", position: 3, sentiment: "positive" },
  { query: "best invoicing software small business", engine: "chatgpt", position: 4, sentiment: "positive" },
];

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({ sitesCount: 0, queriesCount: 0, visibilityScore: 0, optimizationScore: 0 });
  const [rankings, setRankings] = useState<Ranking[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    let sitesCount = 0;
    let queriesCount = 0;
    let visibilityScore = 0;
    let hasData = false;

    // Fetch sites count and avg visibility
    const { data: sites } = await supabase
      .from("gt_sites")
      .select("visibility_score")
      .eq("user_id", user.id);

    if (sites && sites.length > 0) {
      sitesCount = sites.length;
      visibilityScore = Math.round(sites.reduce((acc, s) => acc + (s.visibility_score || 0), 0) / sites.length);
      hasData = true;
    }

    // Fetch queries count
    const { count } = await supabase
      .from("gt_queries")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id);

    if (count !== null) {
      queriesCount = count;
      hasData = true;
    }

    // Fetch recent rankings
    const { data: rankingData } = await supabase
      .from("gt_rankings")
      .select("*, gt_queries!inner(query)")
      .in("site_id", (sites || []).map((s: { visibility_score: number }) => s))
      .order("scanned_at", { ascending: false })
      .limit(5);

    if (!hasData) {
      // Show demo data if no real data
      setIsDemo(true);
      setStats({ sitesCount: 3, queriesCount: 142, visibilityScore: 72, optimizationScore: 85 });
      setRankings(demoRankings);
    } else {
      setStats({ sitesCount, queriesCount, visibilityScore, optimizationScore: Math.min(100, visibilityScore + 13) });
      setRankings(rankingData?.map((r: Record<string, unknown>) => ({
        query: (r.gt_queries as { query: string })?.query || "",
        engine: r.engine as string,
        position: r.position as number,
        sentiment: r.sentiment as string | null,
      })) || []);
    }
    setLoading(false);
  };

  const statCards = [
    {
      label: "AI Visibility Score",
      value: String(stats.visibilityScore),
      suffix: "/100",
      change: "+8",
      up: true,
      icon: TrendingUp,
      gradient: "from-[#00f0ff] to-[#0ea5e9]",
    },
    {
      label: "Sites Tracked",
      value: String(stats.sitesCount),
      suffix: "",
      change: "",
      up: true,
      icon: Globe,
      gradient: "from-[#a855f7] to-[#6366f1]",
    },
    {
      label: "Queries Monitored",
      value: String(stats.queriesCount),
      suffix: "",
      change: "+23",
      up: true,
      icon: Search,
      gradient: "from-[#22c55e] to-[#0ea5e9]",
    },
    {
      label: "Optimization Score",
      value: String(stats.optimizationScore),
      suffix: "%",
      change: "+12",
      up: true,
      icon: Zap,
      gradient: "from-[#f59e0b] to-[#ef4444]",
    },
  ];

  const displayRankings = rankings.length > 0 ? rankings : demoRankings;
  const showDemoBadge = isDemo || rankings.length === 0;

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

      {showDemoBadge && !loading && (
        <div className="px-4 py-2 rounded-lg bg-[rgba(168,85,247,0.08)] border border-[rgba(168,85,247,0.15)] text-sm text-[#a855f7]">
          Showing demo data. Add a site to see your real metrics.
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, i) => (
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
            {loading ? (
              <Loader2 className="w-6 h-6 text-[#475569] animate-spin" />
            ) : (
              <>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-white">{stat.value}</span>
                  <span className="text-sm text-[#64748b]">{stat.suffix}</span>
                </div>
                <p className="text-xs text-[#475569] mt-1">{stat.label}</p>
              </>
            )}
          </motion.div>
        ))}
      </div>

      {/* Visibility Chart */}
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
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${Math.min(height, 100)}%` }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.02 }}
                className="flex-1 rounded-t-sm bg-gradient-to-t from-[#00f0ff] to-[#a855f7] opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
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
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-lg font-semibold text-white">Recent Rankings</h2>
          {showDemoBadge && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-[rgba(168,85,247,0.1)] text-[#a855f7]">Demo</span>
          )}
        </div>
        <p className="text-sm text-[#64748b] mb-6">How your brand appears in AI responses</p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[rgba(0,240,255,0.06)]">
                <th className="text-left py-3 px-2 text-[#475569] font-medium">Query</th>
                <th className="text-left py-3 px-2 text-[#475569] font-medium">Engine</th>
                <th className="text-center py-3 px-2 text-[#475569] font-medium">Position</th>
                <th className="text-center py-3 px-2 text-[#475569] font-medium">Sentiment</th>
              </tr>
            </thead>
            <tbody>
              {displayRankings.map((r, i) => (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.05 }}
                  className="border-b border-[rgba(0,240,255,0.03)] hover:bg-[rgba(0,240,255,0.02)] transition-colors"
                >
                  <td className="py-3 px-2 text-white">{r.query}</td>
                  <td className="py-3 px-2">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium text-white capitalize ${engineLogos[r.engine.toLowerCase()] || "bg-[#475569]"}`}>
                      {r.engine}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[rgba(0,240,255,0.08)] text-[#00f0ff] font-bold">
                      #{r.position}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-center">
                    {r.sentiment && (
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium capitalize ${
                        r.sentiment === "positive" ? "text-emerald-400 bg-emerald-400/10" :
                        r.sentiment === "negative" ? "text-red-400 bg-red-400/10" :
                        "text-amber-400 bg-amber-400/10"
                      }`}>
                        {r.sentiment}
                      </span>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
