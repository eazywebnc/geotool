"use client";

import { motion } from "framer-motion";
import { ArrowUp, ArrowDown, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

const engines = ["All", "ChatGPT", "Perplexity", "Gemini", "Claude", "Copilot"];

interface RankingRow {
  query: string;
  engine: string;
  position: number;
  prevPosition: number;
  mentions: number;
  sentiment: string;
}

const demoRankings: RankingRow[] = [
  { query: "best project management tools", engine: "ChatGPT", position: 2, prevPosition: 3, mentions: 8, sentiment: "positive" },
  { query: "top CRM software 2026", engine: "Perplexity", position: 5, prevPosition: 3, mentions: 4, sentiment: "neutral" },
  { query: "affordable marketing automation", engine: "Gemini", position: 1, prevPosition: 4, mentions: 12, sentiment: "positive" },
  { query: "team collaboration platforms", engine: "Claude", position: 3, prevPosition: 3, mentions: 6, sentiment: "positive" },
  { query: "best invoicing software", engine: "ChatGPT", position: 4, prevPosition: 6, mentions: 9, sentiment: "positive" },
  { query: "free CRM alternatives", engine: "Perplexity", position: 7, prevPosition: 5, mentions: 3, sentiment: "negative" },
  { query: "small business accounting tools", engine: "Gemini", position: 2, prevPosition: 4, mentions: 7, sentiment: "positive" },
  { query: "enterprise project tracking", engine: "Claude", position: 6, prevPosition: 8, mentions: 5, sentiment: "neutral" },
];

const sentimentColors: Record<string, string> = {
  positive: "text-emerald-400 bg-emerald-400/10",
  neutral: "text-amber-400 bg-amber-400/10",
  negative: "text-red-400 bg-red-400/10",
};

const engineColors: Record<string, string> = {
  ChatGPT: "bg-[#10a37f]",
  Perplexity: "bg-[#1a73e8]",
  Gemini: "bg-[#8b5cf6]",
  Claude: "bg-[#d97706]",
  Copilot: "bg-[#0078d4]",
};

export default function RankingsPage() {
  const [selectedEngine, setSelectedEngine] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [rankings, setRankings] = useState<RankingRow[]>(demoRankings);
  const [isDemo, setIsDemo] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRankings();
  }, []);

  const loadRankings = async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setLoading(false); return; }

    const { data: sites } = await supabase.from("gt_sites").select("id").eq("user_id", user.id);
    if (!sites || sites.length === 0) { setLoading(false); return; }

    const siteIds = sites.map((s) => s.id);
    const { data } = await supabase
      .from("gt_rankings")
      .select("*, gt_queries!inner(query)")
      .in("site_id", siteIds)
      .order("scanned_at", { ascending: false })
      .limit(50);

    if (data && data.length > 0) {
      setRankings(data.map((r: Record<string, unknown>) => ({
        query: (r.gt_queries as { query: string })?.query || "",
        engine: (r.engine as string).charAt(0).toUpperCase() + (r.engine as string).slice(1),
        position: r.position as number || 0,
        prevPosition: (r.position as number || 0) + 1,
        mentions: 1,
        sentiment: (r.sentiment as string) || "neutral",
      })));
      setIsDemo(false);
    }
    setLoading(false);
  };

  const filtered = rankings.filter((r) => {
    if (selectedEngine !== "All" && r.engine !== selectedEngine) return false;
    if (searchQuery && !r.query.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Rankings</h1>
          <p className="text-[#64748b] mt-1">
            Track your position across AI search engines
          </p>
        </div>
        {isDemo && !loading && (
          <span className="text-xs px-3 py-1 rounded-full bg-[rgba(168,85,247,0.1)] text-[#a855f7] border border-[rgba(168,85,247,0.15)]">
            Demo Data
          </span>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#475569]" />
          <input
            type="text"
            placeholder="Search queries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[rgba(0,240,255,0.03)] border border-[rgba(0,240,255,0.1)] text-white placeholder:text-[#475569] focus:outline-none focus:border-[#00f0ff] transition-all text-sm"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {engines.map((engine) => (
            <button
              key={engine}
              onClick={() => setSelectedEngine(engine)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                selectedEngine === engine
                  ? "bg-[rgba(0,240,255,0.1)] text-[#00f0ff] border border-[rgba(0,240,255,0.2)]"
                  : "text-[#64748b] border border-[rgba(0,240,255,0.06)] hover:text-white"
              }`}
            >
              {engine}
            </button>
          ))}
        </div>
      </div>

      {/* Rankings Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border border-[rgba(0,240,255,0.06)] bg-[rgba(12,12,36,0.5)] overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[rgba(0,240,255,0.06)] bg-[rgba(0,240,255,0.02)]">
                <th className="text-left py-4 px-4 text-[#475569] font-medium">Query</th>
                <th className="text-left py-4 px-4 text-[#475569] font-medium">Engine</th>
                <th className="text-center py-4 px-4 text-[#475569] font-medium">Position</th>
                <th className="text-center py-4 px-4 text-[#475569] font-medium">Change</th>
                <th className="text-center py-4 px-4 text-[#475569] font-medium">Mentions</th>
                <th className="text-center py-4 px-4 text-[#475569] font-medium">Sentiment</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }, (_, i) => (
                  <tr key={i} className="border-b border-[rgba(0,240,255,0.03)]">
                    <td colSpan={6} className="py-4 px-4">
                      <div className="h-4 bg-[rgba(0,240,255,0.05)] rounded animate-pulse" />
                    </td>
                  </tr>
                ))
              ) : (
                filtered.map((r, i) => {
                  const change = r.prevPosition - r.position;
                  return (
                    <motion.tr
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="border-b border-[rgba(0,240,255,0.03)] hover:bg-[rgba(0,240,255,0.02)] transition-colors"
                    >
                      <td className="py-4 px-4 text-white font-medium">{r.query}</td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${engineColors[r.engine] || "bg-[#475569]"}`}>
                          {r.engine}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[rgba(0,240,255,0.08)] text-[#00f0ff] font-bold text-base">
                          #{r.position}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        {change !== 0 ? (
                          <span className={`inline-flex items-center gap-1 text-xs font-semibold ${change > 0 ? "text-emerald-400" : "text-red-400"}`}>
                            {change > 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                            {Math.abs(change)}
                          </span>
                        ) : (
                          <span className="text-[#475569]">-</span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-center text-[#94a3b8]">{r.mentions}</td>
                      <td className="py-4 px-4 text-center">
                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${sentimentColors[r.sentiment]}`}>
                          {r.sentiment}
                        </span>
                      </td>
                    </motion.tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
