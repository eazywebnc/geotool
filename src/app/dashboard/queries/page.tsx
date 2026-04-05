"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Trash2, Loader2, RefreshCw } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface Query {
  id: string;
  query: string;
  category: string | null;
  is_active: boolean;
  created_at: string;
  site_id: string | null;
}

export default function QueriesPage() {
  const [queries, setQueries] = useState<Query[]>([]);
  const [newQuery, setNewQuery] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadQueries();
  }, []);

  const loadQueries = async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error: fetchError } = await supabase
      .from("gt_queries")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (fetchError) {
      if (fetchError.code !== "PGRST205") {
        setError(fetchError.message);
      }
    } else {
      setQueries(data || []);
    }
    setInitialLoading(false);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuery.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error: insertError } = await supabase
        .from("gt_queries")
        .insert({ query: newQuery.trim(), user_id: user.id, is_active: true })
        .select()
        .single();

      if (insertError) {
        setError(insertError.message);
      } else if (data) {
        setQueries([data, ...queries]);
        setNewQuery("");
        setShowAdd(false);
      }
    } catch {
      setError("Failed to add query.");
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    try {
      const supabase = createClient();
      await supabase.from("gt_queries").delete().eq("id", id);
      setQueries(queries.filter((q) => q.id !== id));
    } catch {
      setError("Failed to delete query.");
    }
  };

  const handleToggle = async (id: string, isActive: boolean) => {
    const supabase = createClient();
    await supabase.from("gt_queries").update({ is_active: !isActive }).eq("id", id);
    setQueries(queries.map((q) => q.id === id ? { ...q, is_active: !isActive } : q));
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Queries</h1>
          <p className="text-[#64748b] mt-1">Monitor specific search queries across AI engines</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={loadQueries}
            className="p-2.5 rounded-lg text-[#64748b] border border-[rgba(0,240,255,0.1)] hover:text-white transition-all"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={() => setShowAdd(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-[#050510] bg-[#00f0ff] hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all"
          >
            <Plus className="w-4 h-4" />
            Add Query
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 text-red-400 text-sm">
          {error}
        </div>
      )}

      {showAdd && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-xl border border-[rgba(0,240,255,0.15)] bg-[rgba(12,12,36,0.8)]"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Track a new query</h3>
          <form onSubmit={handleAdd} className="flex gap-3">
            <input
              type="text"
              value={newQuery}
              onChange={(e) => setNewQuery(e.target.value)}
              placeholder="e.g. best project management tools"
              className="flex-1 px-4 py-3 rounded-xl bg-[rgba(0,240,255,0.03)] border border-[rgba(0,240,255,0.1)] text-white placeholder:text-[#475569] focus:outline-none focus:border-[#00f0ff] transition-all"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-xl font-semibold text-[#050510] bg-[#00f0ff] transition-all disabled:opacity-50 flex items-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              Add
            </button>
            <button type="button" onClick={() => setShowAdd(false)} className="px-4 py-3 rounded-xl text-[#64748b] border border-[rgba(0,240,255,0.1)]">
              Cancel
            </button>
          </form>
        </motion.div>
      )}

      {initialLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-14 rounded-xl border border-[rgba(0,240,255,0.06)] bg-[rgba(12,12,36,0.5)] animate-pulse" />
          ))}
        </div>
      ) : queries.length === 0 ? (
        <div className="text-center py-20">
          <Search className="w-12 h-12 text-[#1e293b] mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">No queries tracked yet</h3>
          <p className="text-[#64748b] mb-6">Add queries to monitor how your brand appears in AI responses</p>
          <button onClick={() => setShowAdd(true)} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-[#050510] bg-[#00f0ff] transition-all">
            <Plus className="w-4 h-4" />
            Add Your First Query
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {queries.map((q, i) => (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center justify-between p-4 rounded-xl border border-[rgba(0,240,255,0.06)] bg-[rgba(12,12,36,0.5)] group"
            >
              <div className="flex items-center gap-3">
                <Search className={`w-4 h-4 ${q.is_active ? "text-[#00f0ff]" : "text-[#475569]"}`} />
                <span className={`${q.is_active ? "text-white" : "text-[#475569] line-through"}`}>{q.query}</span>
                {q.category && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[rgba(0,240,255,0.08)] text-[#00f0ff]">{q.category}</span>
                )}
              </div>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                <button
                  onClick={() => handleToggle(q.id, q.is_active)}
                  className={`px-2 py-1 rounded-lg text-xs font-medium ${q.is_active ? "text-amber-400 hover:bg-amber-400/5" : "text-emerald-400 hover:bg-emerald-400/5"}`}
                >
                  {q.is_active ? "Pause" : "Resume"}
                </button>
                <button
                  onClick={() => handleDelete(q.id)}
                  className="p-1.5 rounded-lg text-[#475569] hover:text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
