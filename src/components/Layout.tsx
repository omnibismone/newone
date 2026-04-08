import { Outlet, Link, useLocation } from "react-router-dom";
import { Download, Mail, Phone, ArrowUpRight, ArrowUp } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useState, useEffect, useRef } from "react";

const brutalistEase = [0.25, 1, 0.5, 1];

export default function Layout() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const footerRef = useRef<HTMLElement>(null);
  const isFooterInView = useInView(footerRef);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#ff0099] selection:text-white flex flex-col overflow-x-hidden">
      {/* Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 px-6 flex justify-between items-center transition-all duration-300 ${
          isScrolled 
            ? 'py-4 bg-[#050505]/95 backdrop-blur-md border-b border-white/10 shadow-lg' 
            : 'py-6 bg-transparent'
        }`}
      >
        <Link to="/" className="flex items-center group">
          <img 
            src="/logo.svg" 
            alt="Logo" 
            className="h-10 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              // Fallback if the logo is missing
              e.currentTarget.style.display = 'none';
              const fallback = e.currentTarget.nextElementSibling;
              if (fallback) fallback.classList.remove('hidden');
            }}
          />
          <span className="hidden font-display text-2xl uppercase tracking-wider text-white">
            LOGO
          </span>
        </Link>
        <div className="flex gap-8 font-bold text-sm uppercase tracking-widest">
          <Link 
            to="/" 
            className={`${location.pathname === '/' ? 'text-[#ff0099]' : 'text-white'} hover:text-[#ff0099] transition-colors`}
          >
            Profile
          </Link>
          <Link 
            to="/portfolio" 
            className={`${location.pathname === '/portfolio' ? 'text-[#ff0099]' : 'text-white'} hover:text-[#ff0099] transition-colors`}
          >
            Work
          </Link>
          <a 
            href="https://drive.google.com/uc?export=download&id=1UYK3rw1lCuB31YBJQht7qWWZ4rLKkwGP" 
            download
            className="flex items-center gap-1 font-bold group text-white"
          >
            <span className="animate-cv-gradient">CV</span>
            <Download size={14} strokeWidth={2.5} className="animate-cv-icon relative -top-[2px]" />
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Brutalist Footer */}
      <footer ref={footerRef} className="bg-[#ff0099] text-white pt-16 md:pt-32 pb-12 px-6 mt-16 md:mt-32">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
            }}
            className="font-display text-[12vw] md:text-[10vw] leading-[0.9] uppercase tracking-normal mb-12 whitespace-nowrap overflow-hidden"
          >
            <motion.span className="inline-block mr-[0.25em]" variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: brutalistEase as any } } }}>Contact</motion.span>
            <motion.span className="inline-block" variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: brutalistEase as any } } }}>Me</motion.span>
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-12 border-t border-white/30 pt-12">
            <div className="flex flex-col gap-6">
              <a href="mailto:ngan.bui@outlook.com" className="flex items-center gap-3 md:gap-4 text-white hover:opacity-70 transition-opacity group text-lg sm:text-xl md:text-2xl font-bold uppercase break-all sm:break-normal">
                <Mail className="w-6 h-6 md:w-7 md:h-7 shrink-0" />
                ngan.bui@outlook.com
                <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity -ml-2 shrink-0" />
              </a>
              <a href="tel:0906975246" className="flex items-center gap-3 md:gap-4 text-white hover:opacity-70 transition-opacity group text-lg sm:text-xl md:text-2xl font-bold uppercase">
                <Phone className="w-6 h-6 md:w-7 md:h-7 shrink-0" />
                0906.975.246
                <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity -ml-2 shrink-0" />
              </a>
            </div>
            
            <div className="flex flex-col gap-4 items-start md:items-end font-bold uppercase tracking-widest text-sm">
              {location.pathname === '/' ? (
                <Link to="/portfolio" className="hover:opacity-70 transition-opacity flex items-center gap-2">
                  View Portfolio <ArrowUpRight size={16} className="relative -top-[2px]" />
                </Link>
              ) : (
                <Link to="/" className="hover:opacity-70 transition-opacity flex items-center gap-2">
                  View Profile <ArrowUpRight size={16} className="relative -top-[2px]" />
                </Link>
              )}
              <a href="https://drive.google.com/uc?export=download&id=1UYK3rw1lCuB31YBJQht7qWWZ4rLKkwGP" download className="flex items-center gap-2 font-bold group text-white">
                <span className="animate-cv-gradient">Download CV</span>
                <Download size={16} strokeWidth={2.5} className="animate-cv-icon relative -top-[2px]" />
              </a>
              <p className="mt-8 opacity-50">
                © {new Date().getFullYear()} Nguyen Ngan.
              </p>
            </div>
          </div>

          {/* Version 2.0: Sci-Fi Link - Hidden on Mobile */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-20 pt-12 border-t border-white/20 hidden md:flex justify-center"
          >
            <Link
              to="/scifi"
              className="group relative inline-flex items-center gap-4 px-8 py-4 bg-white text-[#ff0099] font-display text-xl md:text-3xl uppercase tracking-tighter rounded-none border-4 border-white hover:bg-transparent hover:text-white transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                Khám Phá Thêm Phong Cách Khác Tại đây
                <ArrowUpRight className="group-hover:rotate-45 transition-transform duration-300" />
              </span>
              <motion.div 
                className="absolute inset-0 bg-[#050505] translate-y-full group-hover:translate-y-0 transition-transform duration-300"
              />
            </Link>
          </motion.div>
        </div>
      </footer>

      {/* Floating Back to Top Button */}
      <motion.button
        onClick={scrollToTop}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        variants={{
          initial: { scale: 1 },
          hover: { scale: 1.1 },
          tap: { scale: 0.8, y: -15 }
        }}
        className={`fixed bottom-8 right-8 z-50 p-3 rounded-full shadow-lg transition-colors duration-300 ${
          isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        } ${
          isFooterInView ? 'bg-[#050505] text-[#ff0099]' : 'bg-[#ff0099] text-white'
        }`}
        aria-label="Back to Top"
      >
        <motion.div
          variants={{
            initial: { y: 0 },
            hover: { y: [0, -4, 0], transition: { duration: 0.8, repeat: Infinity, ease: "easeInOut" } }
          }}
        >
          <ArrowUp size={24} />
        </motion.div>
      </motion.button>
    </div>
  );
}
