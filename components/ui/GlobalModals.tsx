"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import Link from "next/link";

export function GlobalModals() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeModal = searchParams.get("modal");

  const closeModal = () => {
    router.push(window.location.pathname, { scroll: false });
  };

  if (!activeModal) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-xl z-50 flex items-center justify-center p-4 md:p-12"
        onClick={(e) => e.target === e.currentTarget && closeModal()}
      >
        <button onClick={closeModal} className="absolute top-6 right-6 md:top-10 md:right-10 text-white/50 hover:text-white hover:rotate-90 transition-all duration-300 z-60 p-2 bg-white/5 hover:bg-white/10 rounded-full">
          <X size={24} />
        </button>

        {/* --- REPORTS MODAL --- */}
        {activeModal === "reports" && (
          <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} className="w-full max-w-6xl max-h-[85vh] overflow-y-auto hide-scrollbar">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-5xl font-medium mb-4">Structured Assets</h3>
              <p className="text-white/60 font-light max-w-xl mx-auto text-balance">I research industries, decode business models, and map market entry paths into structured formats operators can actually use.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Industry Entry Model", desc: "Full breakdown of what it actually costs, requires, and risks to enter a specific industry." },
                { title: "Market Viability Matrix", desc: "Which business model variants survive in a given market, and specifically why others fail." },
                { title: "Cost Structure Engine", desc: "Where the money actually goes in an industry, categorized by model type and geography." },
                { title: "Regulatory Risk Map", desc: "Jurisdiction-by-jurisdiction compliance burden and the barriers most operators miss." },
                { title: "Supply Chain Map", desc: "Supplier tiers, logistics layers, and identifying where the real bottlenecks are located." },
              ].map((report, i) => (
                <div key={i} className="glass-card rounded-2xl p-6 hover:bg-white/5 transition-colors">
                  <h4 className="text-xl font-medium mb-3">{report.title}</h4>
                  <p className="text-sm text-white/60 font-light leading-relaxed">{report.desc}</p>
                </div>
              ))}
              <Link href="/products" className="glass-card rounded-2xl p-6 hover:bg-white/10 transition-colors flex flex-col justify-between">
                <div>
                  <h4 className="text-xl font-medium mb-3">Vertical Intelligence Pack</h4>
                  <p className="text-sm opacity-80 font-light leading-relaxed">Everything above, bundled for one complete industry.</p>
                </div>
                <div className="mt-4 text-sm font-medium flex items-center gap-2">Explore Pack <ArrowRight size={14} /></div>
              </Link>
            </div>
          </motion.div>
        )}

        {/* --- ABOUT MODAL --- */}
        {activeModal === "about" && (
          <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} className="w-full max-w-3xl glass-card p-8 md:p-16 rounded-3xl overflow-y-auto max-h-[85vh] hide-scrollbar">
            <h3 className="text-3xl md:text-5xl font-medium mb-8">I&apos;m Rafif.</h3>
            <div className="space-y-6 text-white/80 font-light leading-relaxed">
              <p className="text-white font-medium">I look at how industries actually work — not the stories you see online, but the real stuff that decides whether a business makes it or not.</p>
              <p>I spend most of my time at the intersection of software development, business, and finance. I possess a highly structured approach to research and a genuine interest in market mechanics.</p>
              <p>By treating research as a living process, I look beyond the paperwork to how markets are truly constructed, focusing on the supply chains and cost structures that define the bottom line.</p>
              <div className="pt-4 border-t border-white/10 text-white/50">
                For inquiries: <a href="mailto:rafif@rafifmsn.com" className="underline hover:text-white">rafif@rafifmsn.com</a>
              </div>
            </div>
          </motion.div>
        )}

        {/* --- CONTACT MODAL --- */}
        {activeModal === "contact" && (
          <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} className="w-full max-w-2xl glass-card p-5 md:p-20 rounded-3xl text-center">
            <h2 className="text-2xl md:text-5xl font-medium mb-6">Start the Conversation</h2>
            <p className="text-white/60 font-light mb-8 text-balance">Reach out for purchasing inquiries, partnership opportunities, or custom intelligence tailored to your market.</p>
            <a href="https://s.id/rafifmsn" className="inline-block px-8 py-4 bg-white text-black rounded-full font-medium hover:scale-105 transition-transform">
              Get in Touch
            </a>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}