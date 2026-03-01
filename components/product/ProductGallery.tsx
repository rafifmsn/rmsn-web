"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function ProductGallery({ images }: { images: string[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  // Fallback if no images are provided
  const displayImages = images?.length > 0 ? images : ["/og.png"];

  const handleScroll = (direction: "left" | "right") => {
    if (trackRef.current) {
      const scrollAmount = 200;
      trackRef.current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsLightboxOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <div className="lg:sticky lg:top-40">
        {/* Main Image */}
        <div 
          onClick={() => setIsLightboxOpen(true)}
          className="glass-card rounded-3xl overflow-hidden relative aspect-video w-full group cursor-pointer hover-target mb-6"
        >
          <img 
            src={displayImages[activeIndex]} 
            alt="Product view" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
            <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
              <Maximize2 size={16} />
              <span className="text-[10px] uppercase tracking-widest">Enlarge</span>
            </div>
          </div>
        </div>

        {/* Thumbnail Track */}
        {displayImages.length > 1 && (
          <div className="relative w-full group/track">
            <div ref={trackRef} className="flex gap-4 overflow-x-auto hide-scrollbar snap-x snap-mandatory scroll-smooth pb-4">
              {displayImages.map((src, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={cn(
                    "shrink-0 w-32 md:w-44 aspect-video rounded-xl overflow-hidden border-2 transition-all duration-500 hover-target snap-start scroll-ml-6",
                    activeIndex === idx ? "border-white/80 opacity-100" : "border-transparent opacity-40 hover:opacity-80"
                  )}
                >
                  <img src={src} className="w-full h-full object-cover" alt={`Thumbnail ${idx + 1}`} />
                </button>
              ))}
            </div>
            
            <button onClick={() => handleScroll("left")} className="absolute left-2 top-[calc(50%-1rem)] -translate-y-1/2 z-10 bg-black/60 backdrop-blur-md p-2 rounded-full border border-white/10 opacity-0 group-hover/track:opacity-100 transition-opacity hover:bg-white/20 hover-target">
              <ChevronLeft size={16} />
            </button>
            <button onClick={() => handleScroll("right")} className="absolute right-2 top-[calc(50%-1rem)] -translate-y-1/2 z-20 bg-black/60 backdrop-blur-md p-2 rounded-full border border-white/10 opacity-100 md:opacity-0 md:group-hover/track:opacity-100 transition-opacity hover:bg-white/20 hover-target">
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-xl z-100 flex items-center justify-center p-4 md:p-12"
            onClick={(e) => { if (e.target === e.currentTarget) setIsLightboxOpen(false); }}
          >
            <button onClick={() => setIsLightboxOpen(false)} className="absolute top-6 right-6 md:top-10 md:right-10 text-white/50 hover:text-white transition-all duration-300 z-110 hover-target p-2 bg-white/5 hover:bg-white/10 rounded-full">
              <X size={24} />
            </button>
            <motion.img 
              initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
              src={displayImages[activeIndex]} 
              className="max-w-full max-h-full object-contain rounded-xl shadow-2xl relative z-105" 
              alt="Enlarged view" 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}