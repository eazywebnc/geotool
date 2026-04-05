"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-[rgba(0,240,255,0.06)] bg-[rgba(5,5,16,0.8)] backdrop-blur-xl"
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00f0ff] to-[#a855f7] flex items-center justify-center">
            <span className="text-sm font-bold text-[#050510]">G</span>
          </div>
          <span className="text-lg font-bold text-white">
            GEO<span className="text-[#00f0ff]">Tool</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-sm text-[#94a3b8] hover:text-white transition-colors">
            Features
          </Link>
          <Link href="#pricing" className="text-sm text-[#94a3b8] hover:text-white transition-colors">
            Pricing
          </Link>
          <Link
            href="/auth/login"
            className="text-sm text-[#94a3b8] hover:text-white transition-colors"
          >
            Log in
          </Link>
          <Link
            href="/auth/register"
            className="px-5 py-2 text-sm font-semibold text-[#050510] bg-[#00f0ff] rounded-lg hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all"
          >
            Get Started
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden border-t border-[rgba(0,240,255,0.06)] bg-[rgba(5,5,16,0.95)] backdrop-blur-xl"
        >
          <div className="px-6 py-4 space-y-4">
            <Link href="#features" onClick={() => setOpen(false)} className="block text-[#94a3b8]">Features</Link>
            <Link href="#pricing" onClick={() => setOpen(false)} className="block text-[#94a3b8]">Pricing</Link>
            <Link href="/auth/login" className="block text-[#94a3b8]">Log in</Link>
            <Link href="/auth/register" className="block w-full text-center py-3 bg-[#00f0ff] text-[#050510] font-semibold rounded-lg">
              Get Started
            </Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
