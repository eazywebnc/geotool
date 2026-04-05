"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

function ParticleGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 240, 255, ${p.opacity})`;
        ctx.fill();

        particles.slice(i + 1).forEach((p2) => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 240, 255, ${0.05 * (1 - dist / 150)})`;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />;
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParticleGrid />
      <div className="absolute inset-0 gradient-mesh" />
      <div className="absolute inset-0 bg-grid" />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#050510_70%)]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-[rgba(0,240,255,0.15)] bg-[rgba(0,240,255,0.05)] text-sm text-[#00f0ff]">
            <Sparkles className="w-4 h-4" />
            <span>Generative Engine Optimization</span>
          </div>
        </motion.div>

        <motion.h1
          className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9] mb-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
        >
          <span className="block text-white">Dominate</span>
          <span className="block bg-gradient-to-r from-[#00f0ff] via-[#a855f7] to-[#00f0ff] bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient-shift_4s_ease_infinite]">
            AI Search
          </span>
          <span className="block text-white">Engines</span>
        </motion.h1>

        <motion.p
          className="max-w-2xl mx-auto text-lg sm:text-xl text-[#94a3b8] mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          Track and optimize how your brand appears in ChatGPT, Perplexity,
          Gemini, and every AI-powered search engine. Real-time rankings,
          actionable insights, automated reports.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
        >
          <Link
            href="/auth/register"
            className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-[#050510] bg-[#00f0ff] rounded-xl overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(0,240,255,0.3)]"
          >
            <span className="relative z-10">Start Free Trial</span>
            <ArrowRight className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#00f0ff] to-[#a855f7] opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
          <Link
            href="#features"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white border border-[rgba(0,240,255,0.2)] rounded-xl transition-all hover:bg-[rgba(0,240,255,0.05)] hover:border-[rgba(0,240,255,0.4)]"
          >
            See How It Works
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
          {[
            { value: "500+", label: "Brands Tracked" },
            { value: "12M+", label: "Queries Analyzed" },
            { value: "3.2x", label: "Avg. Visibility Boost" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-glow-cyan text-[#00f0ff]">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-[#64748b] mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
