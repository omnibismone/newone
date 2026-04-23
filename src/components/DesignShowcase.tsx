import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

const designWorks = [
  { id: 1, title: "CYBER_POSTER_01", type: "Social Poster", size: "Vertical", aspect: "aspect-[3/4]", url: "https://picsum.photos/seed/design1/900/1200" },
  { id: 2, title: "PROMO_BANNER_02", type: "Display Ad", size: "Horizontal", aspect: "aspect-[16/9]", url: "https://picsum.photos/seed/design2/1200/675" },
  { id: 3, title: "FEED_ASSET_03", type: "Instagram Square", size: "Square", aspect: "aspect-square", url: "https://picsum.photos/seed/design3/1000/1000" },
  { id: 4, title: "EDITORIAL_04", type: "Digital Layout", size: "Vertical", aspect: "aspect-[3/4]", url: "https://picsum.photos/seed/design4/900/1200" },
  { id: 5, title: "HERO_BANNER_05", type: "Web Header", size: "Horizontal", aspect: "aspect-[21/9]", url: "https://picsum.photos/seed/design5/1500/640" },
  { id: 6, title: "EVENT_POSTER_06", type: "Print Asset", size: "Vertical", aspect: "aspect-[3/4]", url: "https://picsum.photos/seed/design6/900/1200" },
  { id: 7, title: "BRAND_ELEMENT_07", type: "Logo Sheet", size: "Square", aspect: "aspect-square", url: "https://picsum.photos/seed/design7/1000/1000" },
  { id: 8, title: "MOTION_STILL_08", type: "Frame Export", size: "Horizontal", aspect: "aspect-[16/9]", url: "https://picsum.photos/seed/design8/1200/675" },
];

export default function DesignShowcase() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const brutalistEase = [0.25, 1, 0.5, 1];

  const next = () => selectedIdx !== null && setSelectedIdx((selectedIdx + 1) % designWorks.length);
  const prev = () => selectedIdx !== null && setSelectedIdx((selectedIdx - 1 + designWorks.length) % designWorks.length);

  return (
    <section className="pb-24">
      {/* Masonry/Bento Style Grid */}
      <div className="px-6 columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 max-w-[1600px] mx-auto">
        {designWorks.map((work, idx) => (
          <motion.div
            key={work.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`relative group cursor-pointer overflow-hidden border border-white/10 hover:border-[#ff0099]/50 transition-colors duration-500`}
            onClick={() => setSelectedIdx(idx)}
          >
            <div className={`relative ${work.aspect} bg-[#111]`}>
              <img
                src={work.url}
                alt={work.title}
                className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              
              {/* Overlay info */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                <p className="font-mono text-[9px] text-[#ff0099] tracking-[0.3em] mb-1">{work.type}</p>
                <h4 className="font-display text-2xl uppercase">{work.title}</h4>
              </div>

              {/* View Icon */}
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:rotate-12">
                <Maximize2 size={18} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Fullscreen Slider Overlay */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center px-4 md:px-20"
          >
            {/* Close Button */}
            <button 
              onClick={() => setSelectedIdx(null)}
              className="absolute top-8 right-8 text-white/40 hover:text-[#ff0099] transition-colors p-2 z-[110]"
            >
              <X size={40} strokeWidth={1.5} />
            </button>

            {/* Navigation Handles */}
            <div className="absolute inset-y-0 left-0 w-20 md:w-40 flex items-center justify-center group cursor-pointer" onClick={prev}>
              <ChevronLeft size={48} className="text-white/10 group-hover:text-[#ff0099] group-hover:scale-120 transition-all" />
            </div>
            <div className="absolute inset-y-0 right-0 w-20 md:w-40 flex items-center justify-center group cursor-pointer" onClick={next}>
              <ChevronRight size={48} className="text-white/10 group-hover:text-[#ff0099] group-hover:scale-120 transition-all" />
            </div>

            {/* Slide Content */}
            <div className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedIdx}
                  initial={{ opacity: 0, x: 100, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -100, scale: 0.9 }}
                  transition={{ duration: 0.6, ease: brutalistEase as any }}
                  className="w-full h-full flex flex-col items-center justify-center gap-8"
                >
                  <img
                    src={designWorks[selectedIdx].url}
                    alt={designWorks[selectedIdx].title}
                    className="max-w-full max-h-full object-contain shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10"
                    referrerPolicy="no-referrer"
                  />
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-4 mb-2">
                       <div className="w-8 h-[1px] bg-[#ff0099]" />
                       <span className="font-mono text-[#ff0099] text-xs uppercase tracking-[0.4em]">{designWorks[selectedIdx].type}</span>
                       <div className="w-8 h-[1px] bg-[#ff0099]" />
                    </div>
                    <h3 className="font-display text-4xl md:text-6xl uppercase tracking-tighter">{designWorks[selectedIdx].title}</h3>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Counter */}
            <div className="absolute bottom-10 font-display text-2xl text-white/20">
              <span className="text-[#ff0099]">{selectedIdx + 1}</span> / {designWorks.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
