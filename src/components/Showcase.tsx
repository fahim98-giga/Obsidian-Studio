import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SHOWCASE_PROJECTS } from "../projectsData";
import { ShowcaseProject } from "../types";
import { Eye, Copy, Check, X, Palette, HelpCircle, Sparkles } from "lucide-react";

export default function Showcase() {
  const [selectedProject, setSelectedProject] = useState<ShowcaseProject | null>(null);
  const [copiedTextType, setCopiedTextType] = useState<"original" | "canva" | "hex" | null>(null);
  const [copiedHexValue, setCopiedHexValue] = useState<string | null>(null);

  const handleCopy = (text: string, type: "original" | "canva" | "hex", hexHex?: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTextType(type);
    if (hexHex) setCopiedHexValue(hexHex);
    setTimeout(() => {
      setCopiedTextType(null);
      setCopiedHexValue(null);
    }, 2000);
  };

  return (
    <section id="portfolio" className="py-24 bg-[#050505] relative px-4 border-t border-white/5">
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-cyan-600/5 blur-[180px] pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        {/* Title Block */}
        <div className="flex flex-col mb-16">
          <div className="flex items-center gap-2 mb-2 font-mono text-xs uppercase tracking-widest text-cyan-400">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>04 // MUSEUM</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-black uppercase italic text-white tracking-tight flex items-center">
            Creative <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 ml-2">Studio Showcase</span>
            <span className="ml-4 h-[1px] w-16 sm:w-24 bg-cyan-500/20"></span>
          </h2>
          <p className="font-sans text-sm text-gray-450 max-w-lg mt-3 font-light leading-relaxed">
            Each project consists of high-end graphical prototypes and corresponding custom-curated AI text prompt blueprints.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SHOWCASE_PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -6 }}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer rounded-2xl bg-gradient-to-br from-zinc-900 to-black border border-white/10 hover:border-cyan-500/30 overflow-hidden transition-all duration-300"
            >
              {/* Image Preview Container */}
              <div className="relative aspect-[4/3] bg-black overflow-hidden border-b border-white/5">
                <img
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Overlay Hover details */}
                <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2.5 backdrop-blur-xs">
                  <div className="w-11 h-11 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
                    <Eye className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-xs text-cyan-300 uppercase tracking-widest font-medium">Inspect Prompt Engine</span>
                </div>
              </div>

              {/* Text Description */}
              <div className="p-6">
                <span className="font-mono text-[10px] uppercase text-cyan-400 tracking-wider font-semibold">
                  {project.category}
                </span>
                <h3 className="font-sans text-lg font-bold text-slate-100 tracking-wide mt-1 group-hover:text-cyan-300 transition-colors">
                  {project.title}
                </h3>
                <p className="font-sans text-xs text-gray-450 line-clamp-2 mt-2 font-light leading-relaxed">
                  {project.description}
                </p>

                {/* Swatch Previews */}
                <div className="flex items-center gap-1.5 mt-4">
                  {project.colorPalette.map((col) => (
                    <div
                      key={col.hex}
                      className="w-4 h-4 rounded-full border border-white/10"
                      style={{ backgroundColor: col.hex }}
                      title={`${col.name}: ${col.hex}`}
                    />
                  ))}
                  <span className="font-mono text-[9px] text-gray-500 ml-1 uppercase">Palette Config</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal Drawer Details */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="absolute inset-0 bg-black/95 backdrop-blur-xs"
              />

              {/* Modal Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 350 }}
                className="relative w-full max-w-3xl bg-gradient-to-br from-zinc-900 to-black border border-white/10 rounded-3xl overflow-hidden shadow-2xl z-10 max-h-[90vh] flex flex-col"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/80 border border-white/10 text-gray-400 hover:text-white hover:border-cyan-500/30 transition-all z-20 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Content Area (Scrollable to prevent cutoff) */}
                <div className="overflow-y-auto flex-1">
                  
                  {/* Hero Image */}
                  <div className="relative h-64 sm:h-80 bg-black border-b border-white/5">
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
                    
                    <div className="absolute bottom-6 left-6 right-6">
                      <span className="font-mono text-xs uppercase text-cyan-400 tracking-widest font-semibold bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 rounded-md backdrop-blur-md">
                        {selectedProject.category}
                      </span>
                      <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight mt-3">
                        {selectedProject.title}
                      </h3>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 space-y-8 animate-fade-in">
                    {/* Design concept description */}
                    <div className="space-y-3">
                      <h4 className="font-mono text-xs uppercase text-gray-500 tracking-wider">Concept Rationale</h4>
                      <p className="font-sans text-sm sm:text-base text-gray-300 font-light leading-relaxed">
                        {selectedProject.description}
                      </p>
                    </div>

                    {/* Bento row (Details & Palette) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Highlights */}
                      <div className="space-y-3">
                        <h4 className="font-mono text-xs uppercase text-gray-500 tracking-wider">Aesthetic Highlights</h4>
                        <ul className="space-y-2">
                          {selectedProject.highlights.map((h) => (
                            <li key={h} className="flex items-center gap-2.5 text-xs text-gray-300 font-light">
                              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Interactive Color Swatch Selector */}
                      <div className="space-y-3">
                        <h4 className="font-mono text-xs uppercase text-gray-500 tracking-wider flex items-center gap-1.5">
                          <Palette className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Color Spectrum (Click to copy)</span>
                        </h4>
                        <div className="grid grid-cols-3 gap-2">
                          {selectedProject.colorPalette.map((col) => {
                            const isCopied = copiedTextType === "hex" && copiedHexValue === col.hex;
                            return (
                              <button
                                key={col.hex}
                                onClick={() => handleCopy(col.hex, "hex", col.hex)}
                                className="p-2 sm:p-2.5 rounded-xl bg-[#050505] border border-white/5 hover:border-cyan-500/30 text-left transition-all active:scale-95 group/swatch cursor-pointer"
                              >
                                <div
                                  className="w-full h-8 rounded-lg mb-2 relative overflow-hidden"
                                  style={{ backgroundColor: col.hex }}
                                >
                                  {isCopied && (
                                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white">
                                      <Check className="w-4 h-4 text-emerald-400" />
                                    </div>
                                  )}
                                </div>
                                <span className="block text-[9px] font-mono text-gray-400 font-semibold truncate uppercase">
                                  {col.name}
                                </span>
                                <span className="block text-[8px] font-mono text-gray-500 tracking-wider uppercase">
                                  {col.hex}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* AI Prompt Blueprints */}
                    <div className="space-y-6 pt-6 border-t border-white/5">
                      
                      {/* Original Professional Prompt */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <h4 className="font-mono text-xs uppercase text-gray-500 tracking-wider flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                            <span>Imagen / Midjourney Blueprint</span>
                          </h4>
                          <button
                            onClick={() => handleCopy(selectedProject.originalPrompt, "original")}
                            className="flex items-center gap-1 px-2.5 py-1 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 hover:bg-cyan-500/25 text-[10px] font-mono transition-all cursor-pointer"
                          >
                            {copiedTextType === "original" ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-400" />
                                <span>Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy Blueprint</span>
                              </>
                            )}
                          </button>
                        </div>
                        <div className="p-4 rounded-xl bg-black border border-white/5 font-mono text-xs text-gray-300 leading-relaxed block overflow-x-auto whitespace-pre-wrap">
                          {selectedProject.originalPrompt}
                        </div>
                      </div>

                      {/* Canva Friendly layout Prompt */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <h4 className="font-mono text-xs uppercase text-gray-500 tracking-wider flex items-center gap-1.5">
                            <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
                            <span>Canva Vector layout Prompt</span>
                          </h4>
                          <button
                            onClick={() => handleCopy(selectedProject.canvaPrompt, "canva")}
                            className="flex items-center gap-1 px-2.5 py-1 rounded bg-purple-500/10 border border-purple-500/20 text-purple-300 hover:bg-purple-500/25 text-[10px] font-mono transition-all cursor-pointer"
                          >
                            {copiedTextType === "canva" ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-400" />
                                <span>Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy Prompt</span>
                              </>
                            )}
                          </button>
                        </div>
                        <div className="p-4 rounded-xl bg-black border border-white/5 font-mono text-xs text-gray-300 leading-relaxed block overflow-x-auto whitespace-pre-wrap">
                          {selectedProject.canvaPrompt}
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
