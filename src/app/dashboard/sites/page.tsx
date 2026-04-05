"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Globe, Plus, ExternalLink, Trash2, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface Site {
  id: string;
  domain: string;
  status: "active" | "pending";
  visibility_score: number;
  created_at: string;
}

export default function SitesPage() {
  const [sites, setSites] = useState<Site[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddSite = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from("gt_sites")
      .insert({ domain, user_id: user.id, status: "pending", visibility_score: 0 })
      .select()
      .single();

    if (!error && data) {
      setSites([...sites, data]);
      setDomain("");
      setShowAdd(false);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    const supabase = createClient();
    await supabase.from("gt_sites").delete().eq("id", id);
    setSites(sites.filter((s) => s.id !== id));
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Sites</h1>
          <p className="text-[#64748b] mt-1">Manage the websites you&apos;re tracking</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-[#050510] bg-[#00f0ff] hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Site
        </button>
      </div>

      {/* Add Site Modal */}
      {showAdd && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-xl border border-[rgba(0,240,255,0.15)] bg-[rgba(12,12,36,0.8)] glow-cyan"
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

      {/* Sites Grid */}
      {sites.length === 0 ? (
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
                <span className={`w-2 h-2 rounded-full ${site.status === "active" ? "bg-emerald-400" : "bg-amber-400 animate-pulse"}`} />
                <span className="text-xs text-[#64748b] capitalize">{site.status}</span>
              </div>
              <div className="mt-4 pt-4 border-t border-[rgba(0,240,255,0.06)]">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#475569]">Visibility Score</span>
                  <span className="text-sm font-bold text-[#00f0ff]">{site.visibility_score}/100</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
