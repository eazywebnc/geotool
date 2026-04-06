import Link from "next/link";
import { EcosystemFooter } from "./ecosystem-footer";

export function Footer() {
  return (
    <footer className="border-t border-[rgba(0,240,255,0.06)] py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#00f0ff] to-[#a855f7] flex items-center justify-center">
              <span className="text-xs font-bold text-[#050510]">G</span>
            </div>
            <span className="text-base font-bold text-white">
              GEO<span className="text-[#00f0ff]">Tool</span>
            </span>
          </div>
          <div className="flex gap-8 text-sm text-[#64748b]">
            <Link href="#features" className="hover:text-white transition-colors">Features</Link>
            <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="/auth/login" className="hover:text-white transition-colors">Login</Link>
          </div>
          <p className="text-xs text-[#475569]">
            Built by{" "}
            <a href="https://eazyweb.nc" className="text-[#00f0ff] hover:underline">
              EazyWebNC
            </a>
          </p>
        </div>
        <EcosystemFooter />
      </div>
    </footer>
  );
}
