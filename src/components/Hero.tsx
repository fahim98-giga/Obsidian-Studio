import { motion } from "motion/react";
import { Sparkles, ArrowDown, ChevronRight, Compass } from "lucide-react";

interface HeroProps {
  onExploreClick: () => void;
  onGeneratorClick: () => void;
}

export default function Hero({ onExploreClick, onGeneratorClick }: HeroProps) {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505] px-4 pt-16">
      {/* Decorative Grid and Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(34,211,238,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.08),transparent_50%)]" />
      
      {/* Grid Pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015]" 
        style={{
          backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
          backgroundSize: "24px 24px"
        }}
      />

      <div className="relative max-w-5xl mx-auto text-center z-10">
        {/* Minimal Agency Chip */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/5 border border-cyan-500/20 text-cyan-400 text-xs tracking-wider uppercase font-mono mb-8 backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
          <span>FUTURISTIC VISUAL DESIGN LAB</span>
        </motion.div>

        {/* Big Premium Brand Name */}
        <motion.h1 
          className="font-display text-5xl sm:text-7xl md:text-8xl font-black text-white tracking-tighter uppercase italic mb-6 relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Obsidian <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 neon-glow-cyan">Studio</span>
        </motion.h1>

        {/* Subtitle Roles */}
        <motion.p 
          className="font-sans text-lg sm:text-2xl text-gray-400 tracking-wide font-light max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Graphic & Creative Visual Designer
          <span className="block text-xs font-mono text-gray-500 mt-3 tracking-[0.4em] uppercase font-medium">
            Logo Design &bull; Brand Identity &bull; 3D Visuals
          </span>
        </motion.p>

        {/* Action Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <button 
            id="btn_explore_portfolio"
            onClick={onExploreClick}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-medium px-8 py-3.5 rounded-xl hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
          >
            <span>Explore Showcase</span>
            <ChevronRight className="w-4 h-4 text-white" />
          </button>
          
          <button 
            id="btn_ai_brief"
            onClick={onGeneratorClick}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#0a0a0c] hover:bg-[#121217] text-gray-300 font-medium px-8 py-3.5 rounded-xl border border-white/5 hover:border-cyan-500/30 transition-all duration-300 cursor-pointer"
          >
            <Compass className="w-4 h-4 text-cyan-400" />
            <span>AI Prompt & Brand Engine</span>
          </button>
        </motion.div>

        {/* Mouse scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-60 hover:opacity-100 cursor-pointer hidden md:flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 1, delay: 1 }}
          onClick={onExploreClick}
        >
          <span className="text-xs font-mono text-gray-400 tracking-widest uppercase">Scroll to details</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="w-4 h-4 text-cyan-400" />
          </motion.div>
        </motion.div>
      </div>

      {/* Futuristic Floating Orb elements */}
      <div className="absolute top-1/4 left-10 w-48 h-48 rounded-full bg-cyan-600/5 blur-[80px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-10 w-64 h-64 rounded-full bg-purple-600/5 blur-[100px] pointer-events-none animate-pulse" />
    </section>
  );
}
