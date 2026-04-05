"use client";

import { motion } from "framer-motion";
import { FileText, Download, Calendar, Clock } from "lucide-react";

const mockReports = [
  { title: "Weekly Visibility Report", date: "Apr 5, 2026", type: "Weekly", status: "ready" },
  { title: "Monthly GEO Analysis", date: "Apr 1, 2026", type: "Monthly", status: "ready" },
  { title: "Competitor Benchmark Q1", date: "Mar 31, 2026", type: "Quarterly", status: "ready" },
  { title: "Weekly Visibility Report", date: "Mar 29, 2026", type: "Weekly", status: "ready" },
];

export default function ReportsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Reports</h1>
        <p className="text-[#64748b] mt-1">Automated visibility reports and insights</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        {["Weekly", "Monthly", "Quarterly"].map((period, i) => (
          <motion.div
            key={period}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-5 rounded-xl border border-[rgba(0,240,255,0.06)] bg-[rgba(12,12,36,0.5)]"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-[#00f0ff] to-[#a855f7]">
                <Calendar className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-white font-semibold">{period}</h3>
            </div>
            <p className="text-xs text-[#64748b]">
              {period === "Weekly" && "Every Monday at 9am"}
              {period === "Monthly" && "1st of each month"}
              {period === "Quarterly" && "End of quarter"}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-white">Recent Reports</h2>
        {mockReports.map((report, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center justify-between p-4 rounded-xl border border-[rgba(0,240,255,0.06)] bg-[rgba(12,12,36,0.5)] hover:border-[rgba(0,240,255,0.15)] transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-[rgba(0,240,255,0.08)]">
                <FileText className="w-5 h-5 text-[#00f0ff]" />
              </div>
              <div>
                <h3 className="text-white font-medium">{report.title}</h3>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs text-[#475569] flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {report.date}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[rgba(0,240,255,0.08)] text-[#00f0ff]">
                    {report.type}
                  </span>
                </div>
              </div>
            </div>
            <button className="p-2 rounded-lg text-[#475569] hover:text-[#00f0ff] hover:bg-[rgba(0,240,255,0.05)] opacity-0 group-hover:opacity-100 transition-all">
              <Download className="w-5 h-5" />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
