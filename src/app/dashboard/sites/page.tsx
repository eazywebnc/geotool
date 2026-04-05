"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Globe, Plus, ExternalLink, Trash2, Loader2, RefreshCw } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface Site {
  id: string;
  domain: string;
  status: "active" | "pending" | "paused";
  visibility_score: number;
  created_at: string;
  last_scan_at: string | null;
}

export default function SitesPage() {
  const [sites, setSites] = useState<Site[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSites();
  }, []);

  const loadSites = async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error: fetchError } = await supabase
      .from("gt_sites")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (fetchError) {
      if (fetchError.code === "PGRST205" || fetchError.message?.includes("not found")) {
        setError(null); // Table doesn't exist yet — show empty state
      } else {
        setError(fetchError.message);
      }
    } else {
      setSites(data || []);
      setError(null);
    }
    setInitialLoading(false);
  };

  const handleAddSite = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error: insertError } = await supabase
        .from("gt_sites")
        .insert({ domain, user_id: user.id, status: "pending", visibility_score: 0 })
        .select()
        .single();

      if (insertError) {
        setError(insertError.message);
      } else if (data) {
        setSites([data, ...sites]);
        setDomain("");
        setShowAdd(false);
      }
    } catch {
      setError("Failed to add site. Please try again.");
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this site from tracking?")) return;
    try {
      const supabase = createClient();
      const { error: deleteError } = await supabase.from("gt_sites").delete().eq("id", id);
      if (deleteError) {
        setError(deleteError.message);
      } else {
        setSites(sites.filter((s) => s.id !== id));
      }
    } catch {
      setError("Failed to delete site.");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Sites</h1>
          <p className="text-[#64748b] mt-1">Manage the websites you&apos;re tracking</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={loadSites}
            className="p-2.5 rounded-lg text-[#64748b] border border-[rgba(0,240,255,0.1)] hover:text-white hover:border-[rgba(0,240,255,0.2)] transition-all"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={() => setShowAdd(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-[#050510] bg-[#00f0ff] hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all"
          >
            <Plus className="w-4 h-4" />
            Add Site
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Add Site Modal */}
      {showAdd && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-xl border border-[rgba(0,240,255,0.15)] bg-[rgba(12,12,36,0.8)]"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Add a new site</h3>
          <form onSubmit={handleAddSite} className="flex gap-3">
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="example.com"
              className="flex-1 px-4 py-3 rounded-xl bg-[rgba(0,240,255,0.03)] border border-[rgba(0,240,255,0.1)] text-white placeholder:text-[#475569] focus:outline-none focus:border-[#00f0ff] transition-all"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-xl font-semibold text-[#050510] bg-[#00f0ff] hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all disabled:opacity-50 flex items-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              Add
            </button>
            <button
              type="button"
              onClick={() => setShowAdd(false)}
              className="px-4 py-3 rounded-xl text-[#64748b] border border-[rgba(0,240,255,0.1)] hover:text-white transition-all"
            >
              Cancel
            </button>
          </form>
        </motion.div>
      )}

      {/* Loading State */}
      {initialLoading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-5 rounded-xl border border-[rgba(0,240,255,0.06)] bg-[rgba(12,12,36,0.5)] animate-pulse">
              <div className="flex items-start justify-between mb-4">
                <div className="w-9 h-9 rounded-lg bg-[rgba(0,240,255,0.08)]" />
              </div>
              <div className="h-5 w-32 bg-[rgba(0,240,255,0.05)] rounded mb-2" />
              <div className="h-3 w-16 bg-[rgba(0,240,255,0.03)] rounded" />
            </div>
          ))}
        </div>
      ) : sites.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <Globe className="w-12 h-12 text-[#1e293b] mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">No sites yet</h3>
          <p className="text-[#64748b] mb-6">Add your first website to start tracking AI visibility</p>
          <button
            onClick={() => setShowAdd(true)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-[#050510] bg-[#00f0ff] hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all"
          >
            <Plus className="w-4 h-4" />
            Add Your First Site
          </button>
        </motion.div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sites.map((site, i) => (
            <motion.div
              key={site.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-5 rounded-xl border border-[rgba(0,240,255,0.06)] bg-[rgba(12,12,36,0.5)] hover:border-[rgba(0,240,255,0.15)] transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-br from-[#00f0ff] to-[#0ea5e9]">
                  <Globe className="w-4 h-4 text-white" />
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <a
                    href={`https://${site.domain}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg text-[#475569] hover:text-white hover:bg-[rgba(255,255,255,0.05)]"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => handleDelete(site.id)}
                    className="p-1.5 rounded-lg text-[#475569] hover:text-red-400 hover:bg-red-400/5"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <h3 className="text-white font-semibold mb-1">{site.domain}</h3>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${site.status === "active" ? "bg-emerald-400" : site.status === "paused" ? "bg-gray-400" : "bg-amber-400 animate-pulse"}`} />
                <span className="text-xs text-[#64748b] capitalize">{site.status}</span>
                {site.last_scan_at && (
                  <span className="text-xs text-[#475569]">
                    &middot; Last scan {new Date(site.last_scan_at).toLocaleDateString()}
                  </span>
                )}
              </div>
              <div className="mt-4 pt-4 border-t border-[rgba(0,240,255,0.06)]">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#475569]">Visibility Score</span>
                  <span className="text-sm font-bold text-[#00f0ff]">{site.visibility_score}/100</span>
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-[rgba(0,240,255,0.05)]">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${site.visibility_score}%` }}
                    transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }}
                    className="h-full rounded-full bg-gradient-to-r from-[#00f0ff] to-[#a855f7]"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
