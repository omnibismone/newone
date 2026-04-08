import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, BezierDefinition } from "motion/react";
import { ArrowLeft, Cpu, Zap, Globe, Terminal, Activity, Radio, Database, Shield, Settings, Wifi, Battery, AlertTriangle, Users, X, ExternalLink, Folder, Code, Layers, Monitor, Play, ChevronDown, ArrowLeftRight } from "lucide-react";
import { Link } from "react-router-dom";

const sciFiEase: BezierDefinition = [0.16, 1, 0.3, 1];

type Project = {
  id: string;
  title: string;
  category: string;
  youtubeId?: string;
  image: string;
  desc: string;
  tags: string[];
  beforeAfterPairs?: { before: string; after: string; label: string }[];
};

const MultiImageComparison = ({ pairs }: { pairs: { before: string; after: string; label: string }[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full h-full flex flex-col bg-black/40">
      <div className="flex gap-2 p-3 border-b border-[#00f2ff]/20 overflow-x-auto scrollbar-hide">
        {pairs.map((pair, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`px-3 py-1.5 text-[10px] font-mono font-bold tracking-widest uppercase transition-all border ${
              activeIndex === index 
                ? 'bg-[#00f2ff] text-black border-[#00f2ff] shadow-[0_0_10px_#00f2ff]' 
                : 'bg-white/5 text-white/50 border-white/10 hover:border-[#00f2ff]/50 hover:text-white'
            }`}
          >
            {pair.label}
          </button>
        ))}
      </div>
      <div className="flex-1 relative min-h-0">
        <ImageComparisonSlider before={pairs[activeIndex].before} after={pairs[activeIndex].after} />
      </div>
    </div>
  );
};

const ImageComparisonSlider = ({ before, after }: { before: string, after: string }) => {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

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
      className="relative w-full h-full cursor-ew-resize select-none bg-black overflow-hidden"
      onMouseMove={(e) => handleMove(e.clientX)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      onClick={(e) => handleMove(e.clientX)}
    >
      <img src={after} alt="After" className="absolute inset-0 w-full h-full object-contain pointer-events-none" referrerPolicy="no-referrer" />
      <img 
        src={before} 
        alt="Before" 
        className="absolute inset-0 w-full h-full object-contain pointer-events-none" 
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }} 
        referrerPolicy="no-referrer"
      />
      <div className="absolute top-0 bottom-0 w-[1px] bg-[#00f2ff] pointer-events-none z-10 shadow-[0_0_10px_#00f2ff]" style={{ left: `${position}%` }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-black border border-[#00f2ff] rounded-full shadow-[0_0_15px_#00f2ff] flex items-center justify-center text-[#00f2ff]">
          <ArrowLeftRight className="w-4 h-4" />
        </div>
      </div>
      <div className="absolute bottom-4 left-4 bg-black/60 border border-[#00f2ff]/30 text-[#00f2ff] px-2 py-1 text-[8px] font-mono font-bold tracking-widest pointer-events-none z-10 uppercase">Before</div>
      <div className="absolute bottom-4 right-4 bg-black/60 border border-[#00f2ff]/30 text-[#00f2ff] px-2 py-1 text-[8px] font-mono font-bold tracking-widest pointer-events-none z-10 uppercase">After</div>
    </div>
  );
};

const projects = [
  {
    id: "PRJ_01",
    title: "Perfume Advertising",
    category: "3D MOTION GRAPHICS",
    youtubeId: "gEF2-nWq11c",
    image: "https://img.youtube.com/vi/gEF2-nWq11c/maxresdefault.jpg",
    desc: "Neural-inspired 3D motion graphics and product design for luxury perfume branding.",
    tags: ["BLENDER", "AFTER EFFECTS", "VFX"]
  },
  {
    id: "PRJ_02",
    title: "Digital Product Transformation",
    category: "UI/UX & VISUAL ENHANCEMENT",
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
    desc: "Next-gen dashboard interface and visual refresh for digital products, optimizing UX/UI.",
    tags: ["FIGMA", "UI/UX", "PROTOTYPING"]
  },
  {
    id: "PRJ_03",
    title: "ASO Before & After",
    category: "VISUAL CONVERSION",
    image: "https://make.ct.ws/wp-content/uploads/2025/07/Image_ASO_Before-and-After.png",
    desc: "Visual conversion and store assets optimization for maximum engagement and app store presence.",
    tags: ["PHOTOSHOP", "MARKETING", "ASO"]
  },
  {
    id: "PRJ_04",
    title: "Webtoon Trailer",
    category: "CINEMATIC MOTION",
    youtubeId: "Px3VdJx-o14",
    image: "https://img.youtube.com/vi/Px3VdJx-o14/maxresdefault.jpg",
    desc: "Cinematic motion, VFX, and sound design for high-impact webtoon trailers.",
    tags: ["PREMIERE PRO", "SOUND DESIGN", "VFX"]
  }
];

const experience = [
  { 
    role: "Freelance Multimedia Designer", 
    company: "Freelance", 
    date: "08/2024 - 03/2026", 
    responsibilities: [
      "Managed end-to-end creative projects, including 2D design, UI/UX, and video editing for diverse clients.",
      "Collaborated with stakeholders to define visual identities and deliver high-quality digital assets.",
      "Ensured brand consistency across multiple platforms through strategic design solutions."
    ]
  },
  { 
    role: "Multimedia Designer", 
    company: "CELEBe", 
    date: "05/2023 - 02/2024", 
    responsibilities: [
      "Created detailed brand guidelines.",
      "Supported and guidance for interns.",
      "Combined Canva, Figma and AI innovatively.",
      "Contributed recommendations to enhance UX/UI for the CELEBe app.",
      "Implemented Jira to help the design team manage their tasks more efficiently.",
      "Collaborated and contributed ideas with the marketing team on advertising materials."
    ]
  },
  { 
    role: "Multimedia Designer", 
    company: "Comico", 
    date: "05/2020 - 08/2022", 
    responsibilities: [
      "Edited and retouched event images.",
      "Facilitated team development by providing training resources.",
      "Handled tasks from UX/UI team, including document writing, prototyping, testing, and user feedback implementation.",
      "Resolved issues arising between teams such as the marketing, programming, and operation team as Scrum Servant & Master.",
      "Created a comic trailer for social media platforms by brainstorming ideas, creating storyboards, redrawing artwork's detail, mixed music and sound effects.",
      "Managed team tasks with Gantt chart and resource leveling, organized design data using B.E.M, and innovated a process merging Waterfall and Agile methodologies."
    ]
  },
  { 
    role: "Video Editor", 
    company: "Manabie", 
    date: "09/2019 - 03/2020", 
    responsibilities: [
      "Developed guidelines for the team to produce videos more efficiently."
    ]
  },
  { 
    role: "Video Editor", 
    company: "Kiến Guru", 
    date: "05/2019 - 07/2019", 
    responsibilities: [
      "Involved in full production cycle from pre to post production to build up from scratch."
    ]
  },
  { 
    role: "Freelance Video Editor & Colorist", 
    company: "Freelance", 
    date: "10/2016 - 05/2019", 
    responsibilities: [
      "Worked as an independent video editor and colorist for various clients and projects."
    ]
  },
  { 
    role: "Senior Social Media", 
    company: "GTOKEN", 
    date: "04/2015 - 10/2016", 
    responsibilities: [
      "Trained and supervised interns.",
      "Planned and executed online/offline events.",
      "Produced teasers to post on Youtube channel."
    ]
  },
  { 
    role: "Digital Marketing Executive", 
    company: "Youngworld Tech", 
    date: "07/2014 - 04/2015", 
    responsibilities: [
      "Planned new game's landing page concept.",
      "Optimized CocCoc, Facebook , Google Ads.",
      "Supported user in Sign Up, Payment, Bugs.",
      "Planned and executed online/offline events.",
      "Collaborated with the developers and designers to build landing pages.",
      "Developed a marketing strategy for new products, including branding, media plan.",
      "Analyzed customer insights, consumer needs and demands to understand their behaviors.",
      "Been in charge of analyzing statistical data (ROI, PCU, ACU, DAU, NRU, PU, Revenue,...)"
    ]
  }
];

const skills = [
  { name: "VISUAL DESIGN", level: 95, color: "#00f2ff" }, // Cyan
  { name: "VIDEO PRODUCTION", level: 90, color: "#39ff14" }, // Green
  { name: "MOTION GRAPHICS", level: 85, color: "#ff00ff" } // Pink
];

const techStack = ["FIGMA", "BLENDER", "PREMIERE PRO", "AFTER EFFECTS", "PHOTOSHOP", "ILLUSTRATOR", "GENERATIVE AI", "CAPCUT"];

const HUDBox = ({ title, children, className = "", icon: Icon, accentColor = "#00f2ff", onClick }: { title?: string, children: React.ReactNode, className?: string, icon?: any, accentColor?: string, onClick?: () => void }) => (
  <div 
    className={`relative border bg-black/60 p-4 shadow-[0_0_15px_rgba(0,242,255,0.05)] font-space ${className}`} 
    style={{ borderColor: `${accentColor}4d` }}
    onClick={onClick}
  >
    {/* Corner Accents */}
    <div className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t-2 border-l-2 shadow-[0_0_8px_currentColor]" style={{ borderColor: accentColor, color: accentColor }} />
    <div className="absolute -top-[1px] -right-[1px] w-3 h-3 border-t-2 border-r-2 shadow-[0_0_8px_currentColor]" style={{ borderColor: accentColor, color: accentColor }} />
    <div className="absolute -bottom-[1px] -left-[1px] w-3 h-3 border-b-2 border-l-2 shadow-[0_0_8px_currentColor]" style={{ borderColor: accentColor, color: accentColor }} />
    <div className="absolute -bottom-[1px] -right-[1px] w-3 h-3 border-b-2 border-r-2 shadow-[0_0_8px_currentColor]" style={{ borderColor: accentColor, color: accentColor }} />
    
    {title && (
      <div className="flex items-center gap-2 mb-4">
        {Icon && <Icon size={14} style={{ color: accentColor, filter: `drop-shadow(0 0 5px ${accentColor})` }} />}
        <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em]" style={{ color: accentColor, filter: `drop-shadow(0 0 3px ${accentColor}80)` }}>{title}</span>
      </div>
    )}
    {children}
  </div>
);

export default function SciFi() {
  const [activeTab, setActiveTab] = useState<string>("ABOUT");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [activeLogIndex, setActiveLogIndex] = useState(0);
  const [visibleChars, setVisibleChars] = useState(0);
  const [logs] = useState<string[]>([
    "LOADING NEURAL INTERFACE...",
    "SCANNING HARDWARE ASSETS...",
    "ESTABLISHING SECURE LINK...",
    "CONTENT_SYNC: BDNN.SPACE...",
    "INITIALIZING QUANTUM CORE...",
    "DECRYPTING ARCHIVE_77...",
    "BYPASSING FIREWALL_V4...",
    "ACCESSING PORTFOLIO_DATA...",
    "OPTIMIZING VISUAL_ENGINE...",
    "RENDERING ASSETS..."
  ]);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  const sectionRefs: Record<string, React.RefObject<HTMLDivElement>> = {
    ABOUT: aboutRef,
    EXPERIENCE: experienceRef,
    PROJECTS: projectsRef,
  };

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    
    const logTimer = setInterval(() => {
      setActiveLogIndex(prev => {
        if (prev < logs.length) {
          setVisibleChars(0);
          return prev + 1;
        }
        return prev;
      });
    }, 1200);

    return () => {
      clearInterval(timer);
      clearInterval(logTimer);
    };
  }, [logs.length]);

  useEffect(() => {
    if (activeLogIndex < logs.length) {
      const charTimer = setInterval(() => {
        setVisibleChars(prev => {
          if (prev < logs[activeLogIndex].length) return prev + 1;
          clearInterval(charTimer);
          return prev;
        });
      }, 25);
      return () => clearInterval(charTimer);
    }
  }, [activeLogIndex, logs]);

  useEffect(() => {
    const observerOptions = {
      root: scrollContainerRef.current,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute("data-section");
          if (sectionId) {
            setActiveTab(sectionId);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, [logs.length]); // Added logs.length to ensure it re-runs if needed, though logs is static now

  const scrollToSection = (section: string) => {
    const ref = sectionRefs[section];
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-[#00080c] text-white font-space selection:bg-[#00f2ff] selection:text-black relative overflow-hidden p-6 crt-overlay">
      {/* CRT Overlays - Global (Reduced opacity for subtle feel) */}
      <div className="fixed inset-0 z-[100] pointer-events-none scanlines opacity-[0.02]" />
      <div className="fixed inset-0 z-[101] pointer-events-none flicker" />
      
      {/* Background Grid & Glows */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00f2ff11_1px,transparent_1px),linear-gradient(to_bottom,#00f2ff11_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(0,242,255,0.05),transparent_70%)]" />
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-[#00f2ff]/10 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-[#ff00ff]/10 blur-[120px] rounded-full" />
      </div>

      {/* Top Left: Station Info */}
      <div className="absolute top-6 left-6 z-50">
        <div className="relative group">
          <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-[#00f2ff] shadow-[0_0_10px_#00f2ff]" />
          <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-[#00f2ff] shadow-[0_0_10px_#00f2ff]" />
          <div className="bg-black/80 border border-[#00f2ff]/40 px-5 py-3 shadow-[0_0_15px_rgba(0,242,255,0.1)] glitch-container flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <Zap size={10} className="text-[#00f2ff] animate-pulse shrink-0" />
              <div className="text-[10px] font-mono text-[#00f2ff] tracking-widest font-bold w-fit">
                STATUS: ACTIVE // AVAILABLE
              </div>
            </div>
            <div className="text-2xl font-black font-space tracking-tighter text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] glitch-text w-fit" data-text="NGUYEN NGAN STATION">NGUYEN NGAN STATION</div>
          </div>
        </div>
      </div>

      {/* Top Right: Local Time */}
      <div className="absolute top-6 right-6 z-50 flex flex-col items-end gap-4">
        <div className="relative">
          <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-[#00f2ff] shadow-[0_0_10px_#00f2ff]" />
          <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-[#00f2ff] shadow-[0_0_10px_#00f2ff]" />
          <div className="bg-black/80 border border-[#00f2ff]/40 px-5 py-3 text-right shadow-[0_0_15px_rgba(0,242,255,0.1)]">
            <div className="text-[10px] font-mono text-[#00f2ff] tracking-widest mb-1 uppercase font-bold">Local_Time</div>
            <div className="text-xl font-black font-mono tracking-tighter text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">{time}</div>
          </div>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="relative z-10 grid grid-cols-12 gap-6 pt-24 h-[calc(100vh-120px)]">
        
        {/* Left Column: Navigation & Logs */}
        <div className="col-span-12 md:col-span-3 flex flex-col gap-6">
          <HUDBox title="NAVIGATION" icon={Layers} className="border-[#00f2ff]/40 shadow-[0_0_15px_rgba(0,242,255,0.05)]">
            <div className="space-y-1">
              {["ABOUT", "PROJECTS", "EXPERIENCE"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => scrollToSection(tab)}
                  className={`w-full text-left px-4 py-3 text-[12px] font-mono font-bold tracking-[0.3em] transition-all relative overflow-hidden ${
                    activeTab === tab ? "bg-[#00f2ff] text-black shadow-[0_0_15px_#00f2ff]" : "text-white/50 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div layoutId="navActive" className="absolute inset-0 bg-[#00f2ff] -z-10" />
                  )}
                </button>
              ))}
            </div>
          </HUDBox>

          <HUDBox title="SYSTEM_LOGS" icon={Terminal} className="overflow-hidden border-[#39ff14]/30" accentColor="#39ff14">
            <div className="space-y-1.5 font-mono text-[10px] text-[#39ff14]">
              {logs.map((log, i) => {
                if (i > activeLogIndex) return null;
                
                const isCurrentLine = i === activeLogIndex;
                const displayText = isCurrentLine ? log.substring(0, visibleChars) : log;
                
                return (
                  <div key={i} className="flex gap-2">
                    <span className="text-[#39ff14]/40 shrink-0">[{i.toString().padStart(2, '0')}]</span>
                    <div className="flex flex-wrap items-center">
                      {displayText.split("").map((char, charIdx) => (
                        <motion.span
                          key={charIdx}
                          initial={{ opacity: 0, color: "#fff" }}
                          animate={{ opacity: 1, color: "#39ff14" }}
                          transition={{ duration: 0.05 }}
                        >
                          {char === " " ? "\u00A0" : char}
                        </motion.span>
                      ))}
                      {isCurrentLine && i < logs.length && (
                        <motion.span
                          animate={{ opacity: [1, 0] }}
                          transition={{ duration: 0.4, repeat: Infinity }}
                          className="w-1.5 h-3 bg-[#39ff14] ml-0.5"
                        />
                      )}
                    </div>
                  </div>
                );
              })}
              {activeLogIndex === logs.length && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2"
                >
                  <span className="text-[#39ff14]/40">[{logs.length.toString().padStart(2, '0')}]</span>
                  <span className="animate-pulse text-[#39ff14] font-bold">_</span>
                </motion.div>
              )}
            </div>
          </HUDBox>
        </div>

        {/* Center Column: Content (Scrollable) */}
        <div 
          ref={scrollContainerRef}
          className="col-span-12 md:col-span-6 h-full overflow-y-auto custom-scrollbar px-2 space-y-20 scroll-smooth"
        >
          {/* ABOUT SECTION */}
          <section ref={aboutRef} data-section="ABOUT" className="min-h-full flex flex-col items-center justify-center py-10 text-center font-space">
            <div className="relative w-48 h-48 mb-8 flex items-center justify-center">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute inset-0 border border-dashed border-[#00f2ff]/30 rounded-full shadow-[0_0_15px_rgba(0,242,255,0.1)]" />
              <motion.div animate={{ rotate: -360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute inset-4 border border-[#ff00ff]/50 rounded-full border-t-transparent border-b-transparent shadow-[0_0_20px_rgba(255,0,255,0.2)]" />
              <div className="relative z-10 flex flex-col items-center">
                <Users size={48} className="text-[#00f2ff] drop-shadow-[0_0_10px_rgba(0,242,255,0.8)] animate-pulse mb-2" />
                <span className="text-[8px] font-mono font-bold tracking-[0.5em] text-[#00f2ff] uppercase drop-shadow-[0_0_5px_rgba(0,242,255,0.5)]">Profile_Scan</span>
              </div>
            </div>
            <HUDBox title="SUBJECT_PROFILE" className="max-w-xl border-[#00f2ff]/40 bg-black/60 shadow-[0_0_20px_rgba(0,242,255,0.05)]">
              <h2 className="text-3xl font-bold text-white mb-4 uppercase tracking-tighter drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">Nguyen Ngan</h2>
              <p className="text-white/80 text-sm leading-relaxed uppercase tracking-wider">
                I bring together creative vision and technical expertise. With experience across fast-paced industries, I help companies craft compelling visual stories, build engaging multimedia content, and elevate their brand presence.
              </p>
            </HUDBox>
            <div className="grid grid-cols-2 gap-4 mt-6 w-full max-w-xl">
              <HUDBox title="EXPERIENCE" className="border-[#00f2ff]/30">
                <span className="text-[#00f2ff] text-xl font-mono font-black uppercase drop-shadow-[0_0_10px_rgba(0,242,255,0.6)] tracking-tighter">10+ Years Experience</span>
              </HUDBox>
              <HUDBox title="PRODUCTION" className="border-[#ff00ff]/30" accentColor="#ff00ff">
                <span className="text-[#ff00ff] text-xl font-mono font-black uppercase drop-shadow-[0_0_12px_rgba(255,0,255,0.7)] tracking-tighter">233+ Video Produced</span>
              </HUDBox>
            </div>
          </section>

          {/* PROJECTS SECTION */}
          <section ref={projectsRef} data-section="PROJECTS" className="min-h-full space-y-8 pr-4 font-space py-10">
            <div className="text-[10px] font-mono text-[#00f2ff] tracking-[0.5em] uppercase mb-4 opacity-50">Project_Archives</div>
            {projects.map((project) => (
              <HUDBox 
                key={project.id} 
                className="group border-[#00f2ff]/30 bg-black/60 hover:border-[#00f2ff]/60 transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,242,255,0.15)] relative overflow-hidden cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="absolute inset-0 z-50 pointer-events-none scanlines opacity-[0.05]" />
                <div className="absolute inset-0 z-51 pointer-events-none flicker" />
                
                <div className="flex justify-between items-start mb-2 relative z-10">
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono text-[#00f2ff]/80 font-bold tracking-widest uppercase drop-shadow-[0_0_3px_rgba(0,242,255,0.3)]">{project.category}</span>
                    <h3 className="text-4xl font-black text-white tracking-tighter group-hover:text-[#00f2ff] transition-colors uppercase group-hover:drop-shadow-[0_0_10px_rgba(0,242,255,0.7)]">{project.title}</h3>
                  </div>
                  <ExternalLink size={16} className="text-[#00f2ff]/50 group-hover:text-[#00f2ff] transition-colors cursor-pointer drop-shadow-[0_0_5px_rgba(0,242,255,0.5)]" />
                </div>
                <div className="aspect-video overflow-hidden mb-4 border border-[#00f2ff]/20 group-hover:border-[#00f2ff]/50 transition-colors relative z-10">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" referrerPolicy="no-referrer" />
                </div>
                <p className="text-white/60 text-sm leading-relaxed mb-4 relative z-10">{project.desc}</p>
                <div className="flex flex-wrap gap-2 relative z-10">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-[8px] font-mono px-2 py-1 bg-[#00f2ff]/10 border border-[#00f2ff]/30 text-[#00f2ff] uppercase tracking-widest shadow-[0_0_5px_rgba(0,242,255,0.2)]">
                      {tag}
                    </span>
                  ))}
                </div>
              </HUDBox>
            ))}
          </section>

          {/* EXPERIENCE SECTION */}
          <section ref={experienceRef} data-section="EXPERIENCE" className="min-h-full space-y-6 pr-4 font-space py-10">
            <div className="text-[10px] font-mono text-[#00f2ff] tracking-[0.5em] uppercase mb-4 opacity-50">Experience_Log</div>
            {experience.map((exp, i) => (
              <HUDBox key={i} className="group hover:border-[#00f2ff]/60 transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,242,255,0.1)] bg-black/60">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="text-[#ff00ff] text-[9px] font-mono font-bold tracking-widest drop-shadow-[0_0_5px_rgba(255,0,255,0.4)]">{exp.date}</span>
                    <h3 className="text-xl font-black text-white tracking-tighter group-hover:text-[#00f2ff] transition-colors uppercase group-hover:drop-shadow-[0_0_8px_rgba(0,242,255,0.6)]">{exp.role}</h3>
                    <div className="text-[#00f2ff]/70 text-[10px] font-mono uppercase tracking-widest mt-1">{exp.company}</div>
                  </div>
                </div>
                <ul className="text-white/80 text-sm leading-relaxed mt-3 border-l border-[#00f2ff]/30 pl-4 space-y-2">
                  {exp.responsibilities.map((resp, idx) => (
                    <li key={idx} className="relative pl-4 flex items-start">
                      <span className="absolute left-0 top-[0.6em] w-1 h-1 bg-white/60 rounded-full" />
                      {resp}
                    </li>
                  ))}
                </ul>
              </HUDBox>
            ))}
          </section>
        </div>

        {/* Right Column: Metrics & Tech */}
        <div className="col-span-12 md:col-span-3 flex flex-col gap-6">
          <HUDBox title="CORE_EXPERTISE" icon={Activity} className="border-[#00f2ff]/40">
            <div className="space-y-6">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[12px] font-mono text-white/80 tracking-widest uppercase font-bold">{skill.name}</span>
                    <span className="text-[12px] font-mono font-bold" style={{ color: skill.color, filter: `drop-shadow(0 0 5px ${skill.color}80)` }}>{skill.level}%</span>
                  </div>
                  <div className="h-[6px] w-full bg-white/10 relative overflow-hidden rounded-full">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      className="absolute left-0 top-0 bottom-0 shadow-[0_0_12px_rgba(0,0,0,0.5)]"
                      style={{ backgroundColor: skill.color, boxShadow: `0 0 12px ${skill.color}` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </HUDBox>

          <HUDBox title="TECH_STACK" icon={Code} className="border-[#00f2ff]/30" accentColor="#00f2ff">
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span key={tech} className="text-[10px] font-mono px-3 py-1.5 border border-[#00f2ff]/40 text-[#00f2ff] bg-[#00f2ff]/5 uppercase tracking-widest hover:border-[#00f2ff] hover:bg-[#00f2ff]/20 transition-all cursor-default shadow-[0_0_8px_rgba(0,242,255,0.2)] font-bold">
                  {tech}
                </span>
              ))}
            </div>
          </HUDBox>

          <HUDBox title="SECURITY_STATUS" icon={Shield} className="border-[#39ff14]/40" accentColor="#39ff14">
            <div className="space-y-4">
              <div className="h-[6px] w-full bg-white/10 relative overflow-hidden rounded-full">
                <motion.div 
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-[#39ff14] shadow-[0_0_12px_#39ff14]"
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[12px] text-white/60 tracking-widest uppercase font-bold">ENCRYPTION</span>
                <span className="text-[12px] font-mono text-[#39ff14] font-bold uppercase drop-shadow-[0_0_8px_rgba(57,255,20,0.6)]">Active</span>
              </div>
            </div>
          </HUDBox>
        </div>
      </div>

      {/* Bottom HUD Elements */}
      <div className="absolute bottom-6 left-6 z-50">
        <div className="bg-black/80 border border-[#39ff14]/40 px-5 py-3 flex items-center gap-3 shadow-[0_0_15px_rgba(57,255,20,0.1)]">
          <div className="w-2 h-2 bg-[#39ff14] animate-pulse rounded-full shadow-[0_0_10px_#39ff14]" />
          <div className="text-[10px] font-mono font-bold text-[#39ff14] tracking-[0.2em] uppercase drop-shadow-[0_0_5px_rgba(57,255,20,0.5)]">System_Online</div>
          <div className="text-[10px] font-mono text-[#39ff14]/60 ml-2 uppercase font-bold">Ver: 2.0.26</div>
        </div>
      </div>

      <div className="absolute bottom-6 right-6 z-50 flex items-center gap-4">
        <Link to="/" className="p-3 border-2 border-[#ff00ff]/50 text-[#ff00ff] hover:bg-[#ff00ff] hover:text-black transition-all shadow-[0_0_15px_rgba(255,0,255,0.2)] hover:shadow-[0_0_20px_rgba(255,0,255,0.5)]">
          <ArrowLeft size={20} />
        </Link>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 p-4 md:p-12 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-6xl aspect-video bg-[#050505] border border-[#00f2ff]/30 shadow-[0_0_50px_rgba(0,242,255,0.2)] flex flex-col overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center px-6 py-4 border-b border-[#00f2ff]/20 bg-black/40">
                <div className="flex flex-col">
                  <span className="text-[8px] font-mono text-[#00f2ff]/60 tracking-[0.3em] uppercase">{selectedProject.category}</span>
                  <h3 className="text-xl font-black text-white tracking-tighter uppercase">{selectedProject.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="w-10 h-10 border border-[#00f2ff]/30 hover:bg-[#00f2ff] hover:text-black transition-all flex items-center justify-center text-[#00f2ff] cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 relative overflow-hidden">
                {selectedProject.youtubeId ? (
                  <div className="w-full h-full">
                    <iframe
                      src={`https://www.youtube.com/embed/${selectedProject.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                      title={selectedProject.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      sandbox="allow-scripts allow-same-origin allow-presentation"
                      className="w-full h-full"
                    ></iframe>
                  </div>
                ) : selectedProject.beforeAfterPairs ? (
                  <MultiImageComparison pairs={selectedProject.beforeAfterPairs} />
                ) : (
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title}
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                )}
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-[#00f2ff]/20 bg-black/40 flex justify-between items-center">
                <p className="text-[10px] font-mono text-white/50 max-w-md uppercase tracking-wider">{selectedProject.desc}</p>
                <div className="flex gap-2">
                  {selectedProject.tags.map(tag => (
                    <span key={tag} className="text-[8px] font-mono px-2 py-1 border border-[#00f2ff]/20 text-[#00f2ff]/60 uppercase tracking-widest">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#00f2ff] z-10" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#00f2ff] z-10" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#00f2ff] z-10" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#00f2ff] z-10" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker {
          animation: ticker 30s linear infinite;
          display: inline-block;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #06b6d4;
        }
        @keyframes scan {
          from { transform: translateY(-100%); }
          to { transform: translateY(200%); }
        }
        .animate-scan {
          animation: scan 4s linear infinite;
        }
        
        .scanlines {
          background: linear-gradient(
            to bottom,
            transparent 50%,
            rgba(0, 0, 0, 0.5) 51%,
            transparent 51%
          );
          background-size: 100% 4px;
        }
        
        @keyframes flicker {
          0% { opacity: 0.01; }
          5% { opacity: 0.02; }
          10% { opacity: 0.01; }
          15% { opacity: 0.03; }
          20% { opacity: 0.01; }
          25% { opacity: 0.02; }
          30% { opacity: 0.01; }
          35% { opacity: 0.04; }
          40% { opacity: 0.01; }
          45% { opacity: 0.02; }
          50% { opacity: 0.01; }
          55% { opacity: 0.03; }
          60% { opacity: 0.01; }
          65% { opacity: 0.02; }
          70% { opacity: 0.01; }
          75% { opacity: 0.04; }
          80% { opacity: 0.01; }
          85% { opacity: 0.02; }
          90% { opacity: 0.01; }
          95% { opacity: 0.03; }
          100% { opacity: 0.01; }
        }
        
        .flicker {
          background: rgba(18, 16, 16, 0.1);
          animation: flicker 0.15s infinite;
        }
        
        .crt-overlay {
          text-shadow: 0 0 2px rgba(0, 242, 255, 0.3);
        }

        /* Advanced Glitch Animation */
        .glitch-text {
          position: relative;
          display: inline-block;
        }

        .glitch-text::before,
        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: transparent;
        }

        .glitch-text::before {
          left: 3px;
          text-shadow: -2px 0 #ff00ff;
          clip: rect(44px, 450px, 56px, 0);
          animation: glitch-anim-1 4s infinite linear alternate-reverse;
        }

        .glitch-text::after {
          left: -3px;
          text-shadow: -2px 0 #00f2ff;
          clip: rect(44px, 450px, 56px, 0);
          animation: glitch-anim-2 4s infinite linear alternate-reverse;
        }

        @keyframes glitch-anim-1 {
          0% { clip: rect(10px, 9999px, 20px, 0); }
          5% { clip: rect(30px, 9999px, 40px, 0); }
          10% { clip: rect(50px, 9999px, 60px, 0); }
          15% { clip: rect(70px, 9999px, 80px, 0); }
          20% { clip: rect(90px, 9999px, 100px, 0); }
          25% { clip: rect(10px, 9999px, 50px, 0); }
          30% { clip: rect(60px, 9999px, 20px, 0); }
          35% { clip: rect(40px, 9999px, 70px, 0); }
          40% { clip: rect(80px, 9999px, 30px, 0); }
          45% { clip: rect(20px, 9999px, 90px, 0); }
          50% { clip: rect(10px, 9999px, 20px, 0); }
          55% { clip: rect(30px, 9999px, 40px, 0); }
          60% { clip: rect(50px, 9999px, 60px, 0); }
          65% { clip: rect(70px, 9999px, 80px, 0); }
          70% { clip: rect(90px, 9999px, 100px, 0); }
          75% { clip: rect(10px, 9999px, 50px, 0); }
          80% { clip: rect(60px, 9999px, 20px, 0); }
          85% { clip: rect(40px, 9999px, 70px, 0); }
          90% { clip: rect(80px, 9999px, 30px, 0); }
          95% { clip: rect(20px, 9999px, 90px, 0); }
          100% { clip: rect(10px, 9999px, 20px, 0); }
        }

        @keyframes glitch-anim-2 {
          0% { clip: rect(80px, 9999px, 90px, 0); }
          5% { clip: rect(60px, 9999px, 70px, 0); }
          10% { clip: rect(40px, 9999px, 50px, 0); }
          15% { clip: rect(20px, 9999px, 30px, 0); }
          20% { clip: rect(0px, 9999px, 10px, 0); }
          25% { clip: rect(90px, 9999px, 40px, 0); }
          30% { clip: rect(30px, 9999px, 80px, 0); }
          35% { clip: rect(50px, 9999px, 20px, 0); }
          40% { clip: rect(10px, 9999px, 60px, 0); }
          45% { clip: rect(70px, 9999px, 10px, 0); }
          50% { clip: rect(80px, 9999px, 90px, 0); }
          55% { clip: rect(60px, 9999px, 70px, 0); }
          60% { clip: rect(40px, 9999px, 50px, 0); }
          65% { clip: rect(20px, 9999px, 30px, 0); }
          70% { clip: rect(0px, 9999px, 10px, 0); }
          75% { clip: rect(90px, 9999px, 40px, 0); }
          80% { clip: rect(30px, 9999px, 80px, 0); }
          85% { clip: rect(50px, 9999px, 20px, 0); }
          90% { clip: rect(10px, 9999px, 60px, 0); }
          95% { clip: rect(70px, 9999px, 10px, 0); }
          100% { clip: rect(80px, 9999px, 90px, 0); }
        }

        .glitch-container:hover .glitch-text::before,
        .glitch-container:hover .glitch-text::after {
          display: block;
        }
      `}} />
    </div>
  );
}
