"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed top-6 left-0 right-0 z-40 px-4 flex justify-center pointer-events-none">
        <nav className="glass-card w-full max-w-7xl rounded-full px-5 py-4 flex justify-between items-center pointer-events-auto md:pr-8">
          <Link href="/" className="flex items-center gap-2 hover-target md:ml-4">
            {/* Desktop Logo: Hidden on mobile, block on md screens and up */}
            <img 
              src="/assets/logo.svg" 
              alt="Rafif Muchsin Logo" 
              className="h-8 w-auto hidden md:block" 
            />
            {/* Mobile Logomark: Block on mobile, hidden on md screens and up */}
            <img 
              src="/assets/logomark.svg" 
              alt="Logo Icon" 
              className="h-5 w-auto block md:hidden" 
            />
          </Link>

          <div className="hidden md:flex gap-8 text-[11px] md:text-sm tracking-widest text-white/70">
            <Link href="/products" className="hover:text-white transition-colors hover-target">Catalog</Link>
            <Link href="?modal=reports" scroll={false}>Reports</Link>
            <Link href="?modal=about" scroll={false}>About</Link>
            <Link href="?modal=contact" scroll={false}>Contact</Link>
          </div>

          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-[11px] tracking-widest uppercase text-white/70 hover:text-white transition-colors hover-target px-2 py-1 flex items-center gap-2"
          >
            {isOpen ? <X size={16} /> : <Menu size={16} />}
            {isOpen ? "CLOSE" : "MENU"}
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl z-35 flex flex-col items-center justify-center md:hidden"
          >
            <div className="flex flex-col gap-8 text-center text-sm tracking-[0.2em] uppercase text-white/70">
              <Link href="/products" onClick={() => setIsOpen(false)} className="hover:text-white transition-colors">Catalog</Link>
              <Link href="?modal=reports" scroll={false}>Reports</Link>
              <Link href="?modal=about" scroll={false}>About</Link>
              <Link href="?modal=contact" scroll={false}>Contact</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}