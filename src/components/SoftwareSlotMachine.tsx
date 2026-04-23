import { useState, useEffect, useRef } from "react";
import { motion, useAnimation, AnimatePresence } from "motion/react";
import { Zap, Trophy, ChevronDown } from "lucide-react";

const softwares = [
  "FIGMA", "BLENDER", "PREMIERE", "AFTER EFFECTS", 
  "PHOTOSHOP", "ILLUSTRATOR", "LIGHTROOM", "AI", "CAPCUT"
];

const Reel = ({ targetIndex, isSpinning, delay }: { targetIndex: number, isSpinning: boolean, delay: number }) => {
  const controls = useAnimation();
  
  useEffect(() => {
    if (isSpinning) {
      const spin = async () => {
        // Initial fast spin
        await controls.start({
          y: [0, -1000],
          transition: { 
            duration: 1.5, 
            ease: "linear", 
            repeat: Infinity,
            delay: delay 
          }
        });
      };
      spin();
    } else {
      // Stop at target index
      const itemHeight = 80;
      controls.start({
        y: -(targetIndex * itemHeight),
        transition: { 
          type: "spring", 
          damping: 15, 
          stiffness: 100,
          duration: 1
        }
      });
    }
  }, [isSpinning, targetIndex, controls, delay]);

  return (
    <div className="h-[80px] overflow-hidden bg-black/40 border-x border-white/10 relative w-full md:w-48">
      <motion.div
        animate={controls}
        className="flex flex-col"
      >
        {/* Triple the list to ensure smooth looping during spin */}
        {[...softwares, ...softwares, ...softwares].map((sw, i) => (
          <div 
            key={i} 
            className="h-[80px] flex items-center justify-center text-sm md:text-lg font-black uppercase tracking-tighter text-white border-b border-white/5"
          >
            {sw}
          </div>
        ))}
      </motion.div>
      {/* Glass overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black via-transparent to-black opacity-60" />
    </div>
  );
};

export default function SoftwareSlotMachine() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [results, setResults] = useState([0, 1, 2]);
  const [jackpot, setJackpot] = useState(false);
  const [isLeverPulled, setIsLeverPulled] = useState(false);

  const spin = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setIsLeverPulled(true);
    setJackpot(false);
    
    setTimeout(() => setIsLeverPulled(false), 400);

    setTimeout(() => {
      const newResults = [
        Math.floor(Math.random() * softwares.length),
        Math.floor(Math.random() * softwares.length),
        Math.floor(Math.random() * softwares.length)
      ];
      
      if (Math.random() > 0.85) {
        const winIdx = Math.floor(Math.random() * softwares.length);
        newResults[0] = winIdx;
        newResults[1] = winIdx;
        newResults[2] = winIdx;
      }

      setResults(newResults);
      setIsSpinning(false);
      
      if (newResults[0] === newResults[1] && newResults[1] === newResults[2]) {
        setJackpot(true);
      }
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center gap-12 py-20 relative">
      {/* Background Brick Pattern Simulation */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

      <div className="relative flex flex-col items-center">
        {/* Top Sun/Crown Neon */}
        <div className="mb-[-10px] relative z-20">
          <div className="w-16 h-8 border-t-4 border-orange-500 rounded-t-full shadow-[0_-5px_15px_#f97316]" />
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-1 h-4 bg-orange-500 rounded-full shadow-[0_0_10px_#f97316]" 
                   style={{ transform: `rotate(${(i - 2) * 30}deg) translateY(-10px)` }} />
            ))}
          </div>
        </div>

        <div className="relative flex items-center">
          {/* Main Neon Frame */}
          <div className="relative z-10 bg-black/40 backdrop-blur-md p-6 md:p-10 border-4 border-purple-500 rounded-[2rem] shadow-[0_0_40px_rgba(168,85,247,0.4),inset_0_0_20px_rgba(168,85,247,0.2)] min-w-[320px] md:min-w-[600px]">
            
            {/* Slots Container */}
            <div className="flex gap-3 md:gap-6 bg-black/60 rounded-2xl p-4 border-2 border-purple-500/30 shadow-[inset_0_0_30px_rgba(0,0,0,0.9)]">
              <div className="flex gap-2 md:gap-4 w-full">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="flex-1 border-4 border-white rounded-xl overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                    <Reel targetIndex={results[i]} isSpinning={isSpinning} delay={i * 0.1} />
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Text Section */}
            <div className="mt-10 flex flex-col items-center gap-2">
              <div className="flex items-center gap-6 w-full justify-center">
                <div className="flex flex-col gap-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-8 h-1.5 bg-orange-500 rounded-full shadow-[0_0_10px_#f97316]" />
                  ))}
                </div>
                <h3 className="font-display text-6xl md:text-8xl text-purple-500 italic tracking-tighter shadow-purple-500 drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]">
                  SLOT
                </h3>
                <div className="flex flex-col gap-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-8 h-1.5 bg-orange-500 rounded-full shadow-[0_0_10px_#f97316]" />
                  ))}
                </div>
              </div>
              
              <div className="w-full h-1 bg-white/20 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.1)]" />
              
              <h3 className="font-display text-5xl md:text-7xl text-orange-500 tracking-[0.2em] shadow-orange-500 drop-shadow-[0_0_15px_rgba(249,115,22,0.8)]">
                MACHINE
              </h3>
            </div>
          </div>

          {/* Neon Lever */}
          <div className="relative h-64 w-16 ml-4 z-0 flex flex-col items-center justify-center">
            <motion.div
              animate={{ rotate: isLeverPulled ? 90 : 0 }}
              transition={{ duration: 0.4, type: "spring", damping: 12, stiffness: 200 }}
              onClick={spin}
              className={`cursor-pointer group relative origin-bottom flex flex-col items-center pb-16 ${isSpinning ? 'pointer-events-none opacity-50' : ''}`}
            >
              {/* Neon Handle Ball */}
              <div className="w-12 h-12 rounded-full border-4 border-orange-500 bg-black shadow-[0_0_25px_#f97316] group-hover:shadow-[0_0_40px_#f97316] transition-all duration-300 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-orange-500 animate-pulse" />
              </div>
              {/* Neon Rod */}
              <div className="w-2 h-32 bg-white shadow-[0_0_15px_white]" />
            </motion.div>
            
            {/* Lever Base */}
            <div className="w-10 h-16 bg-black border-2 border-white/30 rounded-lg shadow-[0_0_15px_rgba(255,255,255,0.1)]" />
          </div>
        </div>

        {/* Winner Overlay */}
        <AnimatePresence>
          {jackpot && (
            <motion.div
              initial={{ scale: 0, opacity: 0, rotate: -10 }}
              animate={{ scale: 1.2, opacity: 1, rotate: 0 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none"
            >
              <div className="bg-black/90 border-4 border-yellow-400 text-yellow-400 px-12 py-8 rounded-2xl font-black uppercase tracking-[0.5em] shadow-[0_0_60px_rgba(250,204,21,0.6)] flex flex-col items-center gap-4">
                <div className="flex gap-6">
                  <Trophy size={40} className="animate-bounce text-yellow-400" />
                  <span className="text-5xl italic">JACKPOT</span>
                  <Trophy size={40} className="animate-bounce text-yellow-400" />
                </div>
                <div className="text-sm tracking-[1em] text-white animate-pulse">SYSTEM_JACKPOT_777</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-col items-center gap-4">
        <p className="text-purple-500/60 text-[10px] font-black uppercase tracking-[0.5em] animate-pulse">
          {isSpinning ? "CALCULATING_STACK..." : "PULL_ORANGE_HANDLE"}
        </p>
        {!isSpinning && (
          <motion.div 
            animate={{ y: [0, 6, 0] }} 
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-orange-500"
          >
            <ChevronDown size={28} />
          </motion.div>
        )}
      </div>
    </div>
  );
}
