"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Loader2, Trash2 } from "lucide-react";

export default function QueriesPage() {
  const [queries, setQueries] = useState<string[]>([]);
  const [newQuery, setNewQuery] = useState("");
  const [showAdd, setShowAdd] = useState(false);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newQuery.trim()) {
      setQueries([...queries, newQuery.trim()]);
      setNewQuery("");
      setShowAdd(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Queries</h1>
          <p className="text-[#64748b] mt-1">Monitor specific search queries across AI engines</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-[#050510] bg-[#00f0ff] hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Query
        </button>
      </div>

      {showAdd && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-xl border border-[rgba(0,240,255,0.15)] bg-[rgba(12,12,36,0.8)] glow-cyan"
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
            <button type="submit" className="px-6 py-3 rounded-xl font-semibold text-[#050510] bg-[#00f0ff] transition-all">
              Add
            </button>
            <button type="button" onClick={() => setShowAdd(false)} className="px-4 py-3 rounded-xl text-[#64748b] border border-[rgba(0,240,255,0.1)]">
              Cancel
            </button>
          </form>
        </motion.div>
      )}

      {queries.length === 0 ? (
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
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center justify-between p-4 rounded-xl border border-[rgba(0,240,255,0.06)] bg-[rgba(12,12,36,0.5)] group"
            >
              <div className="flex items-center gap-3">
                <Search className="w-4 h-4 text-[#00f0ff]" />
                <span className="text-white">{q}</span>
              </div>
              <button
                onClick={() => setQueries(queries.filter((_, j) => j !== i))}
                className="p-1.5 rounded-lg text-[#475569] hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
