import { motion } from "motion/react";
import { 
  Globe, 
  Handshake, 
  Lightbulb, 
  MessageSquare, 
  FlaskConical, 
  Droplets, 
  Stethoscope, 
  ShieldCheck, 
  Search, 
  Waves, 
  GraduationCap, 
  Truck,
  Target,
  PenTool,
  CheckCircle2,
  BarChart3,
  Users,
  Network,
  Award,
  Heart,
  Phone,
  Mail,
  ExternalLink
} from "lucide-react";

const brutalistEase = [0.25, 1, 0.5, 1];

export default function Assignment() {
  return (
    <div className="pt-28 md:pt-40 bg-[#050505] text-white min-h-screen">
      {/* Hero Section */}
      <section className="px-6 max-w-7xl mx-auto mb-32 relative">
        <motion.div
           initial="hidden"
           whileInView="visible"
           viewport={{ once: false, amount: 0.1 }}
           variants={{
             hidden: { opacity: 0 },
             visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
           }}
           className="grid lg:grid-cols-2 gap-12 items-center"
        >
          <div className="flex flex-col">
            <motion.div 
              variants={{ hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: brutalistEase as any } } }}
              className="text-[#ff0099] font-mono text-xs md:text-sm uppercase tracking-[0.4em] mb-8 flex items-center gap-4"
            >
              <span className="w-12 h-[1px] bg-[#ff0099]" />
              Strategic_Deployment_v2024
            </motion.div>

            <motion.h1 
              variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 1, ease: brutalistEase as any } } }}
              className="font-display text-[10vw] lg:text-[7vw] leading-[0.85] uppercase tracking-tighter mb-8"
            >
              Driving <br />
              <span className="text-[#ff0099]">Sustainable</span> <br />
              Aquaculture <br />
              Forward
            </motion.h1>

            <motion.div 
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 1.5 } } }}
              className="space-y-6 max-w-xl"
            >
              <p className="text-xl md:text-2xl font-bold uppercase tracking-tight text-white/90">
                Local expertise. Global perspective. <br /> Real impact.
              </p>
              <p className="text-white/40 font-medium leading-relaxed">
                Fresh Studio supports aquaculture businesses, investors, suppliers and development partners to grow responsibly through innovation, quality systems and market-ready solutions across Vietnam and beyond.
              </p>
              
              <div className="pt-8 flex items-center gap-6">
                <div className="p-4 border border-[#ff0099] bg-[#ff0099]/5 shrink-0">
                  <div className="font-display text-4xl text-[#ff0099]">18+</div>
                  <div className="font-mono text-[8px] uppercase tracking-widest opacity-60">Years Exp</div>
                </div>
                <p className="text-[10px] md:text-xs font-mono uppercase tracking-widest leading-relaxed opacity-50">
                  Established in Vietnam since 2006, leading the aquaculture landscape with data-driven results.
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div 
            variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: brutalistEase as any } } }}
            className="relative"
          >
            <div className="aspect-[4/5] border border-white/10 overflow-hidden relative group">
              <img 
                src="/4.png" 
                alt="Aquaculture Analysis" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex justify-between items-end">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#ff0099]">System_Status: Active</span>
                  <div className="flex gap-1">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="w-1.5 h-1.5 bg-[#ff0099] rounded-full" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Floating Technical Element */}
            <div className="absolute -top-6 -right-6 w-32 h-32 border-r-2 border-t-2 border-[#ff0099] opacity-30 select-none pointer-events-none" />
          </motion.div>
        </motion.div>
      </section>

      {/* Strategic Pillars Grid */}
      <section className="py-24 md:py-40 border-y border-white/5 bg-white/2">
        <div className="px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-20">
          <div>
            <h2 className="font-display text-4xl md:text-6xl uppercase tracking-tighter mb-12 flex items-center gap-4">
              <span className="text-[#ff0099]">01</span> Why Fresh Studio?
            </h2>
            <div className="space-y-12">
              {[
                { 
                  icon: <Globe size={24} />, 
                  title: "Top Global Producer", 
                  desc: "Vietnam is one of the world's leading seafood producers and exporters. A dynamic industry with strong growth." 
                },
                { 
                  icon: <Handshake size={24} />, 
                  title: "Innovation Bridge", 
                  desc: "We bridge international innovation with local execution. Deep understanding of local conditions." 
                },
                { 
                  icon: <Lightbulb size={24} />, 
                  title: "Practical Solutions", 
                  desc: "We turn expertise into practical solutions. Helping clients improve productivity, sustainability, and market access." 
                }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="w-12 h-12 shrink-0 border border-white/10 flex items-center justify-center text-[#ff0099] group-hover:bg-[#ff0099] group-hover:text-white transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-bold uppercase tracking-wider mb-2">{item.title}</h3>
                    <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-display text-4xl md:text-6xl uppercase tracking-tighter mb-12 flex items-center gap-4 text-right justify-end">
              Our Core <span className="text-[#ff0099]">Capabilities</span> <span className="text-[#ff0099]">02</span>
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <MessageSquare />, title: "Technical Advisory" },
                { icon: <FlaskConical />, title: "R&D Support" },
                { icon: <Droplets />, title: "Water Quality" },
                { icon: <Stethoscope />, title: "Fish Health" },
                { icon: <ShieldCheck />, title: "QA & Compliance" },
                { icon: <Search />, title: "Market INTEL" }
              ].map((cap, i) => (
                <div key={i} className="p-6 border border-white/10 hover:border-[#ff0099]/30 transition-all group">
                  <div className="mb-4 text-[#ff0099] group-hover:scale-110 transition-transform">{cap.icon}</div>
                  <p className="font-mono text-[10px] uppercase tracking-widest font-black leading-tight">{cap.title}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { icon: <Waves />, title: "Sustainable Production" },
                { icon: <GraduationCap />, title: "Training & Extension" },
                { icon: <Truck />, title: "Supply Chain" }
              ].map((mod, i) => (
                <div key={i} className="flex flex-col items-center text-center p-4">
                  <div className="mb-2 opacity-50">{mod.icon}</div>
                  <span className="font-mono text-[7px] uppercase tracking-widest opacity-40">{mod.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* R&D Farm Showcase */}
      <section className="py-24 md:py-40 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-20">
          <div className="lg:w-1/2 space-y-12">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-2 h-2 bg-[#ff0099] animate-pulse" />
                <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-[#ff0099]">Facility_Log_Archive</span>
              </div>
              <h2 className="font-display text-5xl md:text-7xl uppercase leading-[0.85] tracking-tighter mb-8">
                R&D Farm <br />
                <span className="text-[#ff0099]">Can Tho</span>, VN
              </h2>
              <p className="text-white/40 font-medium leading-relaxed max-w-md">
                A dedicated indoor facility where innovations are validated under Vietnamese conditions with measurable results.
              </p>
            </div>

            <div className="space-y-6">
              {[
                "500 m² indoor R&D farm",
                "Biosecure hygiene rooms",
                "Multiple testing tanks & systems",
                "Practical demonstrations for partners"
              ].map((point, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="w-6 h-px bg-[#ff0099]/40 group-hover:w-10 transition-all font-mono text-[8px] flex items-end justify-end text-[#ff0099] pb-1">+{i+1}</div>
                  <span className="uppercase font-bold tracking-widest text-sm">{point}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 grid grid-cols-2 gap-4">
            <div className="aspect-square border border-white/10 overflow-hidden relative group">
              <img src="/3.png" alt="Lab Research" className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 border-[10px] border-[#ff0099]/5 pointer-events-none" />
            </div>
            <div className="aspect-square border border-white/10 overflow-hidden relative group translate-y-8">
              <img src="/2.png" alt="Shrimp Analysis" className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 border-[10px] border-white/5 pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-24 md:py-40 bg-white text-black relative overflow-hidden">
        {/* Background ponds preview */}
        <div className="absolute inset-0 opacity-10 grayscale pointer-events-none">
          <img src="/1.png" alt="Background Ponds" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
        
        <div className="px-6 max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-end">
            <div>
              <h2 className="font-display text-5xl md:text-8xl uppercase tracking-tighter leading-none mb-12">
                Our <br /> <span className="text-[#ff0099]">Approach</span>
              </h2>
              <div className="grid sm:grid-cols-2 gap-8">
                {[
                  { icon: <Target />, label: "Understand", desc: "We listen, learn and analyze your challenges and goals." },
                  { icon: <PenTool />, label: "Design", desc: "We co-create practical, proven and sustainable solutions." },
                  { icon: <CheckCircle2 />, label: "Deliver", desc: "We implement, support and build capabilities." },
                  { icon: <BarChart3 />, label: "Impact", desc: "We measure results and drive long-term value." }
                ].map((item, i) => (
                  <div key={i} className="p-8 border border-black/10 bg-black/5 hover:bg-white transition-all group">
                    <div className="mb-4 text-black group-hover:text-[#ff0099] transition-colors">{item.icon}</div>
                    <h3 className="font-bold uppercase tracking-wider mb-2">{item.label}</h3>
                    <p className="text-black/50 text-[10px] font-medium leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-12">
              <h3 className="font-display text-3xl uppercase tracking-tight border-b-2 border-[#ff0099] pb-4">Trusted Partner</h3>
              <div className="grid grid-cols-2 gap-12">
                {[
                  { icon: <Users />, label: "Multidisciplinary Analysts" },
                  { icon: <Network />, label: "Strong Local Network" },
                  { icon: <Award />, label: "High Ethical Standards" },
                  { icon: <Heart />, label: "Passionate Sustainability" }
                ].map((p, i) => (
                  <div key={i} className="space-y-3">
                    <div className="text-[#ff0099]">{p.icon}</div>
                    <p className="font-mono text-[8px] uppercase tracking-[0.2em] font-black leading-tight text-black/60">{p.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 md:py-40 px-6 max-w-7xl mx-auto text-center">
        <motion.div
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1, ease: brutalistEase as any }}
        >
          <h2 className="font-display text-[10vw] leading-none uppercase tracking-tighter mb-12">
            Let's build the <br /> <span className="text-[#ff0099]">Future</span> together
          </h2>
          
          <div className="flex flex-wrap justify-center gap-12 border-t border-white/10 pt-20">
             <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 border border-white/10 flex items-center justify-center text-[#ff0099]">
                   <Phone size={24} />
                </div>
                <div className="space-y-1">
                   <p className="font-mono text-[10px] uppercase tracking-widest opacity-40">Call_Direct</p>
                   <p className="font-bold">+84 (0)28 5410 5533</p>
                </div>
             </div>
             
             <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 border border-white/10 flex items-center justify-center text-[#ff0099]">
                   <Mail size={24} />
                </div>
                <div className="space-y-1">
                   <p className="font-mono text-[10px] uppercase tracking-widest opacity-40">Write_Us</p>
                   <p className="font-bold">info@freshstudio.vn</p>
                </div>
             </div>

             <div className="flex flex-col items-center gap-4">
                <div className="w-24 h-24 bg-white p-2 shrink-0">
                   <img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://www.freshstudio.vn" alt="QR Code" className="w-full h-full object-contain" />
                </div>
                <p className="font-mono text-[8px] uppercase tracking-widest opacity-50">Scan to visit<br />Official Website</p>
             </div>
          </div>

          <div className="mt-32 pt-12 border-t border-white/10 flex justify-between items-center text-[#ff0099]">
             <span className="font-mono text-[10px] uppercase tracking-[1em]">Fresh_Studio_Aquaculture</span>
             <ExternalLink size={16} className="animate-pulse" />
          </div>
        </motion.div>
      </section>

      {/* Technical Footer Padding */}
      <div className="pb-32" />
    </div>
  );
}
