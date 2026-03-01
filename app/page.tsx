"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";

const revealVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: { 
      duration: 1.2, 
      ease: [0.22, 1, 0.36, 1] as const
    }
  }
} as const;

export default function Home() {
  return (
    <main className="relative h-screen w-screen overflow-hidden flex flex-col justify-center items-center px-6 text-center">
      <Navbar />
      
      {/* Background */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
        <div className="absolute inset-0 bg-black/50 mix-blend-multiply z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.85)_100%)] z-10" />
        <video autoPlay loop muted playsInline className="w-full h-full object-cover grayscale-40 opacity-70">
          <source src="/assets/bg.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Hero Content */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
        className="relative z-20 max-w-4xl flex flex-col items-center"
      >
        <motion.h1 variants={revealVariants} className="text-5xl md:text-6xl lg:text-8xl font-medium tracking-tight mb-8 leading-[1.1]">
          Stay informed,<br />
          <span className="text-white/60 font-light">effortless.</span>
        </motion.h1>
        
        <motion.p variants={revealVariants} className="text-lg md:text-xl font-light text-white/80 max-w-lg mb-12 leading-relaxed text-balance">
          Structured market intelligence for decision makers, stripped of noise and optimized for execution.
        </motion.p>

        <motion.div variants={revealVariants}>
          <Link href="https://app.rafifmsn.com" className="group flex items-center gap-4 sm:text-lg md:text-xl font-light hover-target">
            <span className="animated-underline pb-1">Access the reports</span>
            <span className="group-hover:translate-x-3 transition-transform duration-500 ease-out pb-1">→</span>
          </Link>
        </motion.div>
      </motion.div>

      {/* Footer Links */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={revealVariants}
        className="absolute bottom-8 text-[10px] font-mono tracking-widest text-white/30 uppercase z-20"
      >
        <div className="flex gap-x-4">
          <a href="https://x.com/rafifmsn" target="_blank" rel="noreferrer" className="hover:text-white transition-colors hover-target">Twitter</a>
          <a href="https://github.com/rafifmsn" target="_blank" rel="noreferrer" className="hover:text-white transition-colors hover-target">Github</a>
          <a href="https://linkedin.com/in/rafifmsn" target="_blank" rel="noreferrer" className="hover:text-white transition-colors hover-target">LinkedIn</a>
        </div>
      </motion.div>
    </main>
  );
}