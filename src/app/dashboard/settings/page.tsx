"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { Loader2, Check } from "lucide-react";

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [reportFreq, setReportFreq] = useState("weekly");
  const [emailAlerts, setEmailAlerts] = useState(true);

  const handleSave = async () => {
    setLoading(true);
    // Simulate save
    await new Promise((r) => setTimeout(r, 500));
    setLoading(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleDeleteAccount = async () => {
    if (!confirm("Are you sure? This action cannot be undone.")) return;
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="text-[#64748b] mt-1">Manage your account and preferences</p>
      </div>

      {/* Report Preferences */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-xl border border-[rgba(0,240,255,0.06)] bg-[rgba(12,12,36,0.5)]"
      >
        <h2 className="text-lg font-semibold text-white mb-6">Report Preferences</h2>
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-[#94a3b8] mb-2">
              Report Frequency
            </label>
            <select
              value={reportFreq}
              onChange={(e) => setReportFreq(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[rgba(0,240,255,0.03)] border border-[rgba(0,240,255,0.1)] text-white focus:outline-none focus:border-[#00f0ff] transition-all"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white">Email Alerts</p>
              <p className="text-xs text-[#475569]">Get notified when rankings change significantly</p>
            </div>
            <button
              onClick={() => setEmailAlerts(!emailAlerts)}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                emailAlerts ? "bg-[#00f0ff]" : "bg-[#1e293b]"
              }`}
            >
              <div
                className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                  emailAlerts ? "left-[22px]" : "left-0.5"
                }`}
              />
            </button>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-[rgba(0,240,255,0.06)]">
          <button
            onClick={handleSave}
            disabled={loading}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-[#050510] bg-[#00f0ff] hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : saved ? <Check className="w-4 h-4" /> : null}
            {saved ? "Saved!" : "Save Changes"}
          </button>
        </div>
      </motion.div>

      {/* Subscription */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="p-6 rounded-xl border border-[rgba(0,240,255,0.06)] bg-[rgba(12,12,36,0.5)]"
      >
        <h2 className="text-lg font-semibold text-white mb-4">Subscription</h2>
        <div className="flex items-center justify-between p-4 rounded-xl bg-[rgba(0,240,255,0.03)] border border-[rgba(0,240,255,0.1)]">
          <div>
            <p className="text-white font-medium">Free Trial</p>
            <p className="text-xs text-[#475569]">14 days remaining</p>
          </div>
          <button className="px-4 py-2 rounded-lg text-sm font-semibold text-[#050510] bg-gradient-to-r from-[#00f0ff] to-[#a855f7] hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all">
            Upgrade
          </button>
        </div>
      </motion.div>

      {/* Danger Zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-6 rounded-xl border border-red-500/10 bg-[rgba(12,12,36,0.5)]"
      >
        <h2 className="text-lg font-semibold text-red-400 mb-4">Danger Zone</h2>
        <p className="text-sm text-[#64748b] mb-4">
          Once you delete your account, there is no going back. Please be certain.
        </p>
        <button
          onClick={handleDeleteAccount}
          className="px-4 py-2 rounded-lg text-sm font-semibold text-red-400 border border-red-500/20 hover:bg-red-500/5 transition-all"
        >
          Delete Account
        </button>
      </motion.div>
    </div>
  );
}
