"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";

export default function NotFound() {
  const [countdown, setCountdown] = useState(5);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    // Redirect after 5 seconds
    const timeout = setTimeout(() => {
      router.push("/");
    }, 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(timeout);
    };
  }, [router]);

  return (
    <main className="relative h-screen w-screen overflow-hidden flex flex-col justify-center items-center px-6 text-center">
      <Navbar />
      
      {/* Background Gradient to match the rest of the site */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-zinc-900 via-black to-black" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-20 max-w-2xl flex flex-col items-center"
      >
        <h1 className="text-7xl md:text-9xl font-medium tracking-tight mb-4">
          404
        </h1>
        
        <h2 className="text-2xl md:text-3xl font-serif text-white/60 mb-8 text-balance">
          The page you&apos;re looking for is not available.
        </h2>
        
        <p className="text-white/40 font-light mb-12 max-w-md leading-relaxed">
          The path you requested does not exist or has been moved. 
          Redirecting to home in <span className="text-white font-mono">{countdown}</span> seconds...
        </p>

        <Link 
          href="/" 
          className="group flex items-center gap-4 text-lg font-light hover-target"
        >
          <span className="animated-underline pb-1">Return to base</span>
          <span className="group-hover:-translate-x-1 transition-transform duration-500 ease-out pb-1">←</span>
        </Link>
      </motion.div>
    </main>
  );
}