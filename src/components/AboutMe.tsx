import { motion } from "motion/react";
import { User, ShieldAlert, Award, Star } from "lucide-react";

export default function AboutMe() {
  return (
    <section id="about" className="py-24 bg-[#050505] relative overflow-hidden px-4 border-t border-white/5">
      {/* Glow highlight */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        {/* Section Title */}
        <div className="flex flex-col mb-16">
          <div className="flex items-center gap-2 mb-2 font-mono text-xs uppercase tracking-widest text-cyan-400">
            <User className="w-3.5 h-3.5 text-cyan-400" />
            <span>01 // THE MANIFESTO</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-black uppercase italic text-white tracking-tight flex items-center">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 ml-2">Obsidian Studio</span>
            <span className="ml-4 h-[1px] w-16 sm:w-24 bg-cyan-500/20"></span>
          </h2>
        </div>

        {/* Content Bento Grid Style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Main Manifesto Card */}
          <motion.div 
            whileHover={{ y: -4 }}
            className="md:col-span-2 p-8 rounded-2xl bg-gradient-to-br from-zinc-900 to-black border border-white/10 hover:border-cyan-500/30 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <p className="font-sans text-lg text-gray-300 leading-relaxed mb-6 font-light">
                Obsidian Studio is a freelance visual laboratory dedicated to creating highly tailored, modern interfaces, logos, and high-fidelity 3D brand symbols. As a progressive creator traversing the bridge between modern vector design and AI prompt architecture, we help technical teams and premium brands claim their unique presence.
              </p>
              <p className="font-sans text-base text-gray-400 leading-relaxed font-light">
                We believe in extreme pixel alignment, architectural visual grids, and custom neon-embedded highlights that translate effortlessly across digital formats, printing papers, and spatial systems.
              </p>
            </div>

            {/* Micro Highlights */}
            <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-white/5">
              <div>
                <span className="block text-2xl font-display font-medium text-white">100%</span>
                <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">Passionate Execution</span>
              </div>
              <div>
                <span className="block text-2xl font-display font-medium text-cyan-400">Canva / AI</span>
                <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">Expert prompt structures</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Stats / Approach Card */}
          <div className="space-y-6">
            
            {/* Philosophy Card */}
            <motion.div 
              whileHover={{ y: -4 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-zinc-900 to-black border border-white/10 hover:border-cyan-500/20 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg font-medium text-white mb-2">Our Manifesto</h3>
              <p className="font-sans text-sm text-gray-400 leading-relaxed font-light">
                No templates. No default shapes. We design from initial sketches, combined with specific text prompts, to deliver unique identities.
              </p>
            </motion.div>

            {/* Quality Standard Card */}
            <motion.div 
              whileHover={{ y: -4 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-zinc-900 to-black border border-white/10 hover:border-purple-500/20 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg font-medium text-white mb-2">Modern Grid Systems</h3>
              <p className="font-sans text-sm text-gray-400 leading-relaxed font-light">
                Each project undergoes detailed spacing checks to guarantee optical symmetry and visual weight stability.
              </p>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
