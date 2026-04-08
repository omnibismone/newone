import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate, useInView } from "motion/react";
import { Briefcase, Target, Lightbulb, Users, ArrowRight, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const brutalistEase = [0.25, 1, 0.5, 1];

function AnimatedNumber({ value }: { value: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, { duration: 2, ease: brutalistEase as any });
      return controls.stop;
    } else {
      count.set(0);
    }
  }, [isInView, count, value]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export default function Home() {
  const [expandedJob, setExpandedJob] = useState<number | null>(null);

  return (
    <div className="pt-28 md:pt-40">
      {/* Hero Section */}
      <section className="px-6 max-w-7xl mx-auto">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
          className="flex flex-col items-start"
        >
          <motion.p 
            variants={{ hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: brutalistEase as any } } }}
            className="text-[#ff0099] font-bold tracking-wider md:tracking-widest uppercase text-xs sm:text-sm md:text-sm mb-4 md:mb-6 border border-[#ff0099] px-3 md:px-4 pt-[10px] pb-[6px] rounded-full whitespace-nowrap md:ml-[3px]"
          >
            Bringing Static Concepts to Life
          </motion.p>
          
          <div className="flex flex-col w-full uppercase font-display tracking-normal leading-[0.95] mb-8 md:mb-12">
            <motion.h1 
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.05 }
                }
              }}
              className="text-[16vw] md:text-[12vw] text-white m-0 p-0 flex flex-nowrap"
            >
              {"Multimedia".split("").map((char, i) => (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 100 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: brutalistEase as any } }
                  }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </motion.h1>
            <motion.h1 
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.05, delayChildren: 0.5 }
                }
              }}
              className="text-[16vw] md:text-[12vw] text-[#ff0099] m-0 p-0 flex flex-nowrap"
            >
              {"Designer".split("").map((char, i) => (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 100 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: brutalistEase as any } }
                  }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </motion.h1>
          </div>
          
          <motion.div 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 1, ease: brutalistEase as any } } }}
            className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12 max-w-4xl pb-4 md:pb-0"
          >
            <p className="text-lg sm:text-xl md:text-2xl text-white/80 leading-relaxed font-medium flex-1">
              I bring together creative vision and technical expertise. With experience across fast-paced industries, I help companies craft compelling visual stories, build engaging multimedia content, and elevate their brand presence.
            </p>
            <Link to="/portfolio" className="relative flex items-center justify-center bg-[#ff0099] text-white w-28 h-28 md:w-32 md:h-32 rounded-full font-bold uppercase tracking-wider hover:scale-110 transition-transform duration-300 shrink-0 group mt-4 md:mt-0 self-center md:self-auto">
              {/* Rotating compass ring */}
              <motion.div 
                animate={{ rotate: 360 }} 
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-2 border border-dashed border-[#ff0099]/60 rounded-full group-hover:border-[#ff0099] transition-colors duration-300"
              />
              <span className="flex items-center gap-2 translate-x-[2px]">
                Explore 
                <motion.div
                  className="-ml-[7px] md:-ml-[4px]"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowRight size={20} />
                </motion.div>
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Marquee Divider */}
      <div className="w-full overflow-hidden bg-[#ff0099] text-white py-4 md:py-6 my-16 md:my-32 transform lg:-rotate-2 lg:scale-110 flex whitespace-nowrap">
        <div className="marquee-content font-display text-5xl uppercase tracking-wider flex-shrink-0">
          <span>{"FIGMA • BLENDER • PREMIERE PRO • AFTER EFFECTS • PHOTOSHOP • ILLUSTRATOR • LIGHTROOM • GENERATIVE AI • CAPCUT • FIGMA • BLENDER • PREMIERE PRO • AFTER EFFECTS • PHOTOSHOP • ILLUSTRATOR • LIGHTROOM • GENERATIVE AI • CAPCUT • "}</span>
        </div>
        <div className="marquee-content font-display text-5xl uppercase tracking-wider flex-shrink-0" aria-hidden="true">
          <span>{"FIGMA • BLENDER • PREMIERE PRO • AFTER EFFECTS • PHOTOSHOP • ILLUSTRATOR • LIGHTROOM • GENERATIVE AI • CAPCUT • FIGMA • BLENDER • PREMIERE PRO • AFTER EFFECTS • PHOTOSHOP • ILLUSTRATOR • LIGHTROOM • GENERATIVE AI • CAPCUT • "}</span>
        </div>
      </div>

      {/* Stats Section - Brutalist Style */}
      <section className="px-6 max-w-7xl mx-auto mb-32">
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, ease: brutalistEase as any }}
            className="p-12 border-2 border-white/20 hover:border-[#ff0099] transition-colors duration-300 group"
          >
            <div className="font-display text-8xl md:text-9xl text-white group-hover:text-[#ff0099] transition-colors duration-300 mb-6 flex items-baseline tracking-normal">
              <AnimatedNumber value={10} /><span className="text-5xl text-[#ff0099]">+</span>
            </div>
            <h3 className="text-2xl font-bold uppercase tracking-widest mb-4">Years Experience</h3>
            <p className="text-white/60 text-lg">
              A decade of evolving from digital marketing to specialized multimedia design, motion graphics, and video production.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: brutalistEase as any }}
            className="p-12 border-2 border-white/20 hover:border-[#ff0099] transition-colors duration-300 group"
          >
            <div className="font-display text-8xl md:text-9xl text-white group-hover:text-[#ff0099] transition-colors duration-300 mb-6 flex items-baseline tracking-normal whitespace-nowrap">
              <AnimatedNumber value={233} /><span className="text-5xl text-[#ff0099]">+</span>
            </div>
            <h3 className="text-2xl font-bold uppercase tracking-widest mb-4">Videos Produced</h3>
            <p className="text-white/60 text-lg">
              Expert in cross-platform adaptation. Seamlessly transforming core assets (16:9 to 9:16) to maximize engagement across all digital touchpoints.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-16 md:py-32 bg-white text-black px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
            }}
            className="font-display text-7xl md:text-9xl uppercase tracking-normal mb-20"
          >
            <motion.span className="block" variants={{ hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0, transition: { duration: 1.5, ease: brutalistEase as any } } }}>Core</motion.span>
            <motion.span className="block" variants={{ hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0, transition: { duration: 1.5, ease: brutalistEase as any } } }}>Expertise</motion.span>
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: <Target size={48} strokeWidth={1.5} />,
                title: "Visual Design",
                desc: "Crafting high-impact visuals from social media assets to digital interfaces, ensuring brand consistency across all touchpoints."
              },
              {
                icon: <Lightbulb size={48} strokeWidth={1.5} />,
                title: "Video Production",
                desc: "Delivering full-cycle video solutions from editing to sound design. I specialize in crafting engagement-focused content that scales seamlessly across all digital platforms."
              },
              {
                icon: <Users size={48} strokeWidth={1.5} />,
                title: "Motion Graphics",
                desc: "Crafting 2D animations and visual effects that capture attention. My focus is on seamless transitions and rhythmic motion that enhance the aesthetic of digital products."
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ duration: 0.8, delay: i * 0.3, ease: brutalistEase as any }}
                className="flex flex-col group"
              >
                <div className="mb-8 text-black group-hover:text-[#ff0099] transition-colors duration-300 group-hover:scale-110 origin-left">
                  {item.icon}
                </div>
                <h3 className="font-display text-4xl uppercase tracking-wide mb-6">{item.title}</h3>
                <p className="text-black/70 text-lg leading-relaxed font-medium">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-16 md:py-32 px-6 max-w-7xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="font-display text-7xl md:text-9xl uppercase tracking-normal mb-20 text-[#ff0099]"
        >
          Experience
        </motion.h2>
        
        <div className="space-y-0">
          {[
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
            },
          ].map((job, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group flex flex-col py-8 border-b border-white/20 hover:border-[#ff0099] transition-colors duration-300 cursor-pointer"
              onClick={() => setExpandedJob(expandedJob === i ? null : i)}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="flex-1 pr-8">
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="font-display text-4xl md:text-5xl uppercase tracking-wide text-white group-hover:text-[#ff0099] transition-colors duration-300">{job.role}</h3>
                    <ChevronDown 
                      size={32} 
                      className={`text-white/30 transition-transform duration-300 ${expandedJob === i ? "rotate-180 text-[#ff0099]" : "group-hover:text-[#ff0099]"}`} 
                    />
                  </div>
                  <div className="text-white/60 text-xl font-bold uppercase tracking-widest">{job.company}</div>
                </div>
                <div className="mt-6 md:mt-0 text-lg font-bold text-white bg-[#ff0099] px-6 py-2 rounded-full self-start md:self-auto uppercase tracking-widest opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 md:-translate-x-4 md:group-hover:translate-x-0">
                  {job.date}
                </div>
              </div>
              <AnimatePresence>
                {expandedJob === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0, marginTop: 0 }}
                    animate={{ height: "auto", opacity: 1, marginTop: 24 }}
                    exit={{ height: 0, opacity: 0, marginTop: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <ul className="text-white/80 text-lg leading-relaxed max-w-4xl border-l-2 border-[#ff0099] pl-6 py-2 space-y-3 list-outside ml-6 marker:text-[#ff0099] text-pretty">
                      {job.responsibilities.map((resp, idx) => (
                        <li key={idx} className="pl-2">{resp}</li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
