import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, X, ArrowLeftRight } from "lucide-react";

const brutalistEase = [0.25, 1, 0.5, 1];

type Project = {
  id: number;
  title: string;
  category: string;
  youtubeId?: string;
  image?: string;
  beforeImage?: string;
  afterImage?: string;
  beforeAfterPairs?: { before: string; after: string; label: string }[];
  link?: string;
  year: string;
};

const MultiImageComparison = ({ pairs }: { pairs: { before: string; after: string; label: string }[], key?: any }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const lastScrollTime = useRef(0);

  const handleWheel = (e: React.WheelEvent) => {
    const now = Date.now();
    if (now - lastScrollTime.current < 800) return; // 800ms cooldown

    if (e.deltaY > 20) {
      setActiveIndex((prev) => (prev + 1) % pairs.length);
      lastScrollTime.current = now;
    } else if (e.deltaY < -20) {
      setActiveIndex((prev) => (prev - 1 + pairs.length) % pairs.length);
      lastScrollTime.current = now;
    }
  };

  return (
    <div className="w-full h-full flex flex-col" onWheel={handleWheel}>
      <div className="flex gap-2 p-4 bg-[#1a1a1a] border-b border-white/10 overflow-x-auto">
        {pairs.map((pair, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeIndex === index 
                ? 'bg-[#ff0099] text-white' 
                : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            {pair.label}
          </button>
        ))}
      </div>
      <div className="flex-1 relative min-h-0">
        <ImageComparisonSlider key={activeIndex} before={pairs[activeIndex].before} after={pairs[activeIndex].after} />
      </div>
    </div>
  );
};

const ImageComparisonSlider = ({ before, after }: { before: string, after: string, key?: any }) => {
  const [position, setPosition] = useState(50);
  const [loadedImages, setLoadedImages] = useState({ before: false, after: false });
  const containerRef = useRef<HTMLDivElement>(null);
  const beforeImgRef = useRef<HTMLImageElement>(null);
  const afterImgRef = useRef<HTMLImageElement>(null);

  React.useEffect(() => {
    if (beforeImgRef.current?.complete) {
      setLoadedImages(prev => ({ ...prev, before: true }));
    }
    if (afterImgRef.current?.complete) {
      setLoadedImages(prev => ({ ...prev, after: true }));
    }
  }, [before, after]);

  const isLoading = !loadedImages.before || !loadedImages.after;

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setPosition(percent);
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full cursor-ew-resize select-none bg-[#111] overflow-hidden"
      onMouseMove={(e) => handleMove(e.clientX)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      onTouchStart={(e) => handleMove(e.touches[0].clientX)}
      onClick={(e) => handleMove(e.clientX)}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-20 bg-[#111]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-4 border-[#ff0099] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-white/40 text-xs font-bold tracking-widest uppercase">Loading Images...</p>
          </div>
        </div>
      )}
      <img 
        ref={afterImgRef}
        src={after} 
        alt="After" 
        className="absolute inset-0 w-full h-full object-contain pointer-events-none" 
        referrerPolicy="no-referrer"
        onLoad={() => setLoadedImages(prev => ({ ...prev, after: true }))}
        onError={() => setLoadedImages(prev => ({ ...prev, after: true }))}
      />
      <img 
        ref={beforeImgRef}
        src={before} 
        alt="Before" 
        className="absolute inset-0 w-full h-full object-contain pointer-events-none" 
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }} 
        referrerPolicy="no-referrer"
        onLoad={() => setLoadedImages(prev => ({ ...prev, before: true }))}
        onError={() => setLoadedImages(prev => ({ ...prev, before: true }))}
      />
      <div 
        className="absolute top-0 bottom-0 w-0.5 bg-white pointer-events-none z-10"
        style={{ left: `${position}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-white rounded-full shadow-[0_0_15px_rgba(0,0,0,0.5)] flex items-center justify-center text-black">
          <ArrowLeftRight className="w-4 h-4 md:w-5 md:h-5" />
        </div>
      </div>
      <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 bg-black/60 text-white px-2 py-1 md:px-3 md:py-1.5 rounded backdrop-blur-sm text-[10px] md:text-xs font-bold tracking-widest pointer-events-none z-10">BEFORE</div>
      <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 bg-black/60 text-white px-2 py-1 md:px-3 md:py-1.5 rounded backdrop-blur-sm text-[10px] md:text-xs font-bold tracking-widest pointer-events-none z-10">AFTER</div>
    </div>
  );
};

const projects: Project[] = [
  {
    id: 1,
    title: "Perfume Advertising",
    category: "3D Motion Graphics & Product Design",
    youtubeId: "gEF2-nWq11c",
    year: "2024"
  },
  {
    id: 4,
    title: "Digital Product Transformation",
    category: "UI/UX & Visual Enhancement",
    image: "https://make.ct.ws/wp-content/uploads/2026/03/4b-scaled.png",
    beforeAfterPairs: [
      {
        before: "https://make.ct.ws/wp-content/uploads/2026/03/4-1-scaled.png",
        after: "https://make.ct.ws/wp-content/uploads/2026/03/4b-scaled.png",
        label: "Visual Refresh"
      },
      {
        before: "https://make.ct.ws/wp-content/uploads/2026/03/1.png",
        after: "https://make.ct.ws/wp-content/uploads/2026/03/1b-scaled.png",
        label: "Optimizing UX/UI"
      }
    ],
    year: "2020"
  },
  {
    id: 3,
    title: "ASO Before & After",
    category: "Visual Conversion & Store Assets Optimization",
    image: "https://make.ct.ws/wp-content/uploads/2025/07/Image_ASO_Before-and-After.png",
    year: "2021"
  },
  {
    id: 2,
    title: "Webtoon Trailer",
    category: "Cinematic Motion, VFX & Sound Design",
    youtubeId: "Px3VdJx-o14",
    year: "2020"
  }
];

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="pt-28 md:pt-40 px-6 max-w-7xl mx-auto min-h-screen">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
        }}
        className="mb-16 md:mb-32"
      >
        <motion.h1 
          variants={{ hidden: { opacity: 0, y: 100 }, visible: { opacity: 1, y: 0, transition: { duration: 1, ease: brutalistEase as any } } }}
          className="font-display text-[18vw] md:text-[15vw] leading-[0.95] md:leading-[0.9] uppercase text-white m-0 p-0 tracking-normal"
        >
          Selected
        </motion.h1>
        <motion.h1 
          variants={{ hidden: { opacity: 0, y: 100 }, visible: { opacity: 1, y: 0, transition: { duration: 1, ease: brutalistEase as any } } }}
          className="font-display text-[18vw] md:text-[15vw] leading-[0.95] md:leading-[0.9] uppercase text-[#ff0099] m-0 p-0 tracking-normal"
        >
          Works
        </motion.h1>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12 gap-y-16 md:gap-y-32">
        {projects.map((project, index) => (
          <motion.div 
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: brutalistEase as any }}
            className="group cursor-pointer"
            onClick={() => setSelectedProject(project)}
          >
            <div className="relative overflow-hidden mb-8 aspect-[4/3] bg-white/5">
              <motion.img 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6, ease: brutalistEase as any }}
                src={project.youtubeId ? `https://img.youtube.com/vi/${project.youtubeId}/maxresdefault.jpg` : project.image} 
                alt={project.title}
                className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  if (e.currentTarget.src.includes('maxresdefault')) {
                    e.currentTarget.src = `https://img.youtube.com/vi/${project.youtubeId}/hqdefault.jpg`;
                  }
                }}
              />
              <div className="absolute inset-0 bg-[#ff0099]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay pointer-events-none"></div>
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-display text-5xl uppercase tracking-wide text-white group-hover:text-[#ff0099] transition-colors duration-300 mb-2">
                  {project.title}
                </h3>
                <p className="text-white/60 font-bold uppercase tracking-widest text-sm">
                  {project.category}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full border-2 border-white/20 flex items-center justify-center group-hover:bg-[#ff0099] group-hover:border-[#ff0099] group-hover:text-white transition-all duration-300 transform group-hover:rotate-45 shrink-0">
                <ArrowUpRight size={24} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-12 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative w-full max-w-7xl flex flex-col bg-[#111] rounded-xl overflow-hidden shadow-2xl border border-white/10 ${
                selectedProject.youtubeId ? 'aspect-video' : 'h-[90vh] lg:h-auto lg:aspect-video'
              }`}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-50 w-12 h-12 bg-black/50 hover:bg-[#ff0099] rounded-full flex items-center justify-center text-white transition-colors duration-300 backdrop-blur-md border border-white/10 cursor-pointer"
              >
                <X size={24} />
              </button>
              
              {selectedProject.youtubeId ? (
                <div className="relative w-full h-full">
                  {/* Invisible overlay to block clicks on the top title bar which links to YouTube */}
                  <div className="absolute top-0 left-0 w-full h-20 z-10"></div>
                  <iframe
                    src={`https://www.youtube.com/embed/${selectedProject.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                    title={selectedProject.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    sandbox="allow-scripts allow-same-origin allow-presentation"
                    className="w-full h-full object-cover"
                  ></iframe>
                </div>
              ) : selectedProject.beforeAfterPairs && selectedProject.beforeAfterPairs.length > 0 ? (
                <MultiImageComparison key={selectedProject.id} pairs={selectedProject.beforeAfterPairs} />
              ) : selectedProject.beforeImage && selectedProject.afterImage ? (
                <ImageComparisonSlider before={selectedProject.beforeImage} after={selectedProject.afterImage} />
              ) : (
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title}
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
