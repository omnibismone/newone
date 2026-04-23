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
          <Link 
            to="/assignment" 
            className={`${location.pathname === '/assignment' ? 'text-[#ff0099]' : 'text-white'} hover:text-[#ff0099] transition-colors`}
          >
            Assignment
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

      {/* Redesigned Footer - Pink Background */}
      <footer ref={footerRef} className="bg-[#ff0099] text-white pt-24 md:pt-40 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Top Section: Massive Statement */}
          <div className="mb-24 md:mb-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: brutalistEase as any }}
              className="text-center"
            >
              <h2 className="font-display text-[18vw] md:text-[12vw] leading-[0.8] uppercase tracking-tighter mb-12">
                Let's <span className="italic font-serif lowercase tracking-normal opacity-90">work</span> <br />
                Together
              </h2>
              <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                <a href="mailto:ngan.bui@outlook.com" className="px-8 py-4 border border-white/30 rounded-full hover:bg-white hover:text-[#ff0099] transition-all duration-300 font-bold uppercase tracking-widest text-sm">
                  Send an Email
                </a>
                <a href="tel:0906975246" className="px-8 py-4 border border-white/30 rounded-full hover:bg-white hover:text-[#ff0099] transition-all duration-300 font-bold uppercase tracking-widest text-sm">
                  Quick Call
                </a>
              </div>
            </motion.div>
          </div>

          {/* Middle Section: Balanced Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 mb-24 pt-16 border-t border-white/20">
            <div className="space-y-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-50">01 / Contact</span>
              <div className="flex flex-col gap-3">
                <a href="mailto:ngan.bui@outlook.com" className="text-sm font-bold uppercase hover:opacity-70 transition-opacity">ngan.bui@outlook.com</a>
                <a href="tel:0906975246" className="text-sm font-bold uppercase hover:opacity-70 transition-opacity">0906.975.246</a>
              </div>
            </div>

            <div className="space-y-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-50">02 / Explore</span>
              <div className="flex flex-col gap-3">
                <Link to="/" className="text-sm font-bold uppercase hover:opacity-70 transition-opacity">Profile</Link>
                <Link to="/portfolio" className="text-sm font-bold uppercase hover:opacity-70 transition-opacity">Work</Link>
                <Link to="/assignment" className="text-sm font-bold uppercase hover:opacity-70 transition-opacity">Assignment</Link>
                <Link to="/scifi" className="text-sm font-bold uppercase hover:opacity-70 transition-opacity">Sci-Fi Version</Link>
              </div>
            </div>

            <div className="space-y-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-50">03 / Services</span>
              <div className="flex flex-col gap-3 text-sm font-bold uppercase opacity-80">
                <span>Creative Direction</span>
                <span>Video Production</span>
                <span>AI Integration</span>
              </div>
            </div>

            <div className="space-y-6 flex flex-col items-start md:items-end">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-50">04 / Social</span>
              <div className="flex flex-col items-start md:items-end gap-3">
                <a href="#" className="text-sm font-bold uppercase hover:opacity-70 transition-opacity flex items-center gap-1">LinkedIn <ArrowUpRight size={14} /></a>
                <a href="#" className="text-sm font-bold uppercase hover:opacity-70 transition-opacity flex items-center gap-1">Instagram <ArrowUpRight size={14} /></a>
              </div>
            </div>
          </div>

          {/* Bottom Section: Copyright */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-white/20 text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
            <p>© {new Date().getFullYear()} Nguyen Ngan. All Rights Reserved.</p>
            <button onClick={scrollToTop} className="hover:text-white transition-colors flex items-center gap-2 group">
              Back to Top <ArrowUp size={12} className="group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
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
          isFooterInView ? 'bg-[#ff0099] text-white' : 'bg-[#ff0099] text-white'
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
