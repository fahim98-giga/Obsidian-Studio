import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BrandBrief } from "../types";
import { 
  Sparkles, 
  Loader2, 
  Copy, 
  Check, 
  Layers, 
  Download, 
  Palette, 
  ArrowRight, 
  SlidersHorizontal,
  Lightbulb,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";

export default function PromptEngine() {
  const [brandName, setBrandName] = useState("");
  const [industry, setIndustry] = useState("SaaS & AI Tech");
  const [styleVibe, setStyleVibe] = useState("Cosmic Minimalist");
  const [customInfo, setCustomInfo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [brief, setBrief] = useState<BrandBrief | null>(null);

  // States for copy actions
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [isCopiedBrief, setIsCopiedBrief] = useState(false);

  // Preset configuration helpers
  const industries = ["SaaS & AI Tech", "Luxury Fashion", "Web3 & Crypto", "Eco & Organic", "Esports & Gaming"];
  const vibes = ["Cosmic Minimalist", "Futuristic Cyberpunk", "Premium Noir", "Swiss Brutalism", "Neomorphic Bio-Tech"];

  const handleGenerate = async (e: FormEvent) => {
    e.preventDefault();
    if (!brandName.trim()) return;

    setIsLoading(true);
    setError(null);
    setBrief(null);

    try {
      const response = await fetch("/api/generate-brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brandName,
          industry,
          styleVibe,
          customInfo
        })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to contact Prompt Engine.");
      }

      const data = await response.json();
      setBrief(data);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "An unexpected error occurred during prompt generation.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyPromptText = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const copyHexCode = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const copyFullBrief = () => {
    if (!brief) return;
    const fullText = `
=== BRAND CREATIVE BRIEF: ${brief.conceptTitle} ===
Brand Target: ${brandName}
Industry: ${industry}
Style Vibe: ${styleVibe}
Brand Persona: ${brief.brandPersona}

CONCEPT DESCRIPTION:
${brief.conceptDescription}

COLOR PALETTE:
${brief.colorPalette.map(c => `- ${c.name} (${c.hex}): ${c.description}`).join("\n")}

AI GENERATED DESIGN PROMPTS:
${brief.aiPrompts.map(p => `[${p.toolType} - ${p.title}]\nPrompt: ${p.textPrompt}`).join("\n\n")}

DESIGN INSTRUCTIONS:
${brief.designDirectives.map((d, i) => `${i+1}. ${d}`).join("\n")}
    `;
    navigator.clipboard.writeText(fullText);
    setIsCopiedBrief(true);
    setTimeout(() => setIsCopiedBrief(false), 2000);
  };

  return (
    <section id="ai-engine" className="py-24 bg-[#050505] relative px-4 border-t border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_100%,rgba(34,211,238,0.03),transparent_40%)]" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Title Block */}
        <div className="flex flex-col mb-16">
          <div className="flex items-center gap-2 mb-2 font-mono text-xs uppercase tracking-widest text-cyan-400 font-semibold">
            <Layers className="w-3.5 h-3.5 animate-spin text-cyan-400" style={{ animationDuration: "10s" }} />
            <span>05 // INTERACTIVE LABORATORY</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-black uppercase italic text-white tracking-tight flex items-center">
            AI Prompt & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-505 ml-2">Brand Engine</span>
            <span className="ml-4 h-[1px] w-16 sm:w-24 bg-cyan-500/20"></span>
          </h2>
          <p className="font-sans text-sm text-gray-455 max-w-xl mt-3 font-light leading-relaxed">
            Need design direction for your own project? Input your brand name and style choices, and our custom Obsidian AI node will compile a complete aesthetic concept and high-quality prompt set.
          </p>
        </div>

        {/* Console layout Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Panel (Left side) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-zinc-900 to-black border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 backdrop-blur-md">
            <h3 className="font-display text-lg font-medium text-white flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
              <span>Identity Controllers</span>
            </h3>

            <form onSubmit={handleGenerate} className="space-y-5">
              
              {/* Brand name input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase text-gray-500 tracking-wider">Company / Brand Name</label>
                <input
                  type="text"
                  placeholder="e.g., Aether Nexus"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 transition-colors"
                  required
                />
              </div>

              {/* Industry preset selection */}
              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase text-gray-500 tracking-wider">Industry Niche</label>
                <div className="flex flex-wrap gap-1.5">
                  {industries.map((ind) => (
                    <button
                      key={ind}
                      type="button"
                      onClick={() => setIndustry(ind)}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-sans transition-all cursor-pointer ${
                        industry === ind 
                          ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400 font-medium" 
                          : "bg-black border-white/5 text-gray-400 hover:text-gray-300 hover:border-white/10"
                      }`}
                    >
                      {ind}
                    </button>
                  ))}
                </div>
              </div>

              {/* Style preset selection */}
              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase text-gray-500 tracking-wider">Aesthetic Theme / Vibe</label>
                <div className="flex flex-wrap gap-1.5">
                  {vibes.map((vib) => (
                    <button
                      key={vib}
                      type="button"
                      onClick={() => setStyleVibe(vib)}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-sans transition-all cursor-pointer ${
                        styleVibe === vib 
                          ? "bg-purple-500/10 border-purple-500/30 text-purple-400 font-medium" 
                          : "bg-black border-white/5 text-gray-400 hover:text-gray-300 hover:border-white/10"
                      }`}
                    >
                      {vib}
                    </button>
                  ))}
                </div>
              </div>

              {/* Additional optional info */}
              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase text-gray-500 tracking-wider">Additional Directives (Optional)</label>
                <textarea
                  placeholder="e.g. Include stylized wave shapes, no shiny metal, focus on green secondary colors."
                  value={customInfo}
                  onChange={(e) => setCustomInfo(e.target.value)}
                  rows={3}
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 transition-colors resize-none"
                />
              </div>

              {/* Submit Trigger */}
              <button
                type="submit"
                disabled={isLoading || !brandName.trim()}
                className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 font-medium text-white transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer disabled:transform-none hover:shadow-[0_0_15px_rgba(34,211,238,0.25)]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span className="font-mono text-xs uppercase tracking-wider">Constructing Blueprint...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-white animate-pulse" />
                    <span>Compile AI Brief</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </>
                )}
              </button>

            </form>
          </div>

          {/* Render Result Screen (Right side) */}
          <div className="lg:col-span-11 xl:col-span-7 h-full">
            <AnimatePresence mode="wait">
              
              {/* Initial placeholder state */}
              {!isLoading && !brief && !error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full border border-dashed border-white/15 rounded-2xl flex flex-col items-center justify-center p-8 text-center min-h-[350px]"
                >
                  <Lightbulb className="w-12 h-12 text-zinc-750 mb-4" />
                  <h4 className="font-display text-base font-semibold text-slate-400">Tactical Blueprint Screen</h4>
                  <p className="font-sans text-xs text-slate-500 max-w-sm mt-1.5 font-light leading-relaxed">
                    Input your brand parameters on the left controls. Once requested, the customized briefing summary, hex palettes, and copies of high-quality Canva templates will render here.
                  </p>
                </motion.div>
              )}

              {/* Loading State Animation */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full bg-gradient-to-br from-zinc-900 to-black border border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center text-center min-h-[400px] space-y-6"
                >
                  <div className="relative animate-bounce">
                    <Loader2 className="w-12 h-12 text-cyan-400 animate-spin" />
                    <div className="absolute inset-0 bg-cyan-400/10 rounded-full blur-md" />
                  </div>
                  
                  <div className="space-y-1.5">
                    <h4 className="font-mono text-xs text-cyan-450 uppercase tracking-widest font-semibold">Running Gemini Brand Core...</h4>
                    <p className="font-sans text-xs text-gray-500 max-w-xs font-light">
                      Orchestrating geometric alignments, resolving typography pairing protocols, and outputting bespoke graphics prompts.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Error boundary state */}
              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-6 rounded-2xl bg-[#120505] border border-red-900/30 flex items-start gap-4 min-h-[160px]"
                >
                  <AlertTriangle className="w-5 h-5 text-red-500 mt-1 shrink-0" />
                  <div className="space-y-1.5">
                    <h4 className="font-display text-sm font-semibold text-red-400">System Generation Failed</h4>
                    <p className="font-sans text-xs text-red-300 leading-relaxed font-light">
                      {error}
                    </p>
                    <p className="font-mono text-[10px] text-red-400/50 pt-2 font-light">
                      Please check your GEMINI_API_KEY environment configuration and try typing another query.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Actual Completed Generation Brief */}
              {brief && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gradient-to-br from-zinc-900 to-black border border-white/10 rounded-2xl p-6 sm:p-8 space-y-8 shadow-xl"
                >
                  
                  {/* Brief Header details */}
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b border-white/5">
                    <div>
                      <span className="font-mono text-[9px] text-cyan-400 uppercase tracking-widest bg-cyan-500/10 border border-cyan-500/15 px-2 py-0.5 rounded-md font-bold">
                        Compiled Identity Brief
                      </span>
                      <h3 className="font-display text-2xl font-bold text-white mt-3 leading-tight">
                        {brief.conceptTitle}
                      </h3>
                      <p className="font-sans text-xs text-gray-400 mt-1 font-light">
                        Formulated Concept for <strong className="font-medium text-slate-200">{brandName}</strong>
                      </p>
                    </div>

                    {/* Copy brief button */}
                    <button
                      onClick={copyFullBrief}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-black border border-white/10 text-xs font-mono text-gray-300 transition-all active:scale-95 cursor-pointer hover:border-cyan-500/30 font-medium hover:text-white"
                    >
                      {isCopiedBrief ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Copied Dossier</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-3.5 h-3.5 text-cyan-455" />
                          <span>Download Brief</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Brand Rationale */}
                  <div className="space-y-2.5">
                    <h4 className="font-mono text-xs uppercase text-gray-500 tracking-wider">Concept Conception & Style</h4>
                    <p className="font-sans text-sm sm:text-base text-gray-200 leading-relaxed font-light">
                      {brief.conceptDescription}
                    </p>
                    <div className="p-3 rounded-lg bg-black border border-white/5 text-xs font-mono text-cyan-300">
                      <span className="text-gray-500">Brand Persona Profile:</span> {brief.brandPersona}
                    </div>
                  </div>

                  {/* Color palette generated */}
                  <div className="space-y-3">
                    <h4 className="font-mono text-xs uppercase text-gray-500 tracking-wider flex items-center gap-1.5">
                       <Palette className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Hex Palette (Click to copy hex)</span>
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {brief.colorPalette.map((col) => {
                        const isCopiedColor = copiedHex === col.hex;
                        return (
                          <button
                            key={col.hex}
                            onClick={() => copyHexCode(col.hex)}
                            className="p-3 rounded-xl bg-black border border-white/5 hover:border-cyan-500/20 text-left transition-all active:scale-95 group/palette flex flex-col justify-between cursor-pointer"
                          >
                            <div className="w-full h-8 rounded-lg mb-2 relative overflow-hidden bg-black border border-white/5" style={{ backgroundColor: col.hex }}>
                              {isCopiedColor && (
                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white">
                                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                                </div>
                              )}
                            </div>
                            <div>
                              <span className="block text-[10px] font-mono text-slate-100 font-bold truncate tracking-wide uppercase">
                                {col.name}
                              </span>
                              <span className="block text-[9px] font-mono text-cyan-400/90 tracking-widest mt-0.5 uppercase">
                                {col.hex}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Generated copy prompts cards */}
                  <div className="space-y-4">
                    <h4 className="font-mono text-xs uppercase text-gray-500 tracking-wider">High Quality AI Prompt Blueprints</h4>
                    
                    <div className="space-y-4">
                      {brief.aiPrompts.map((p, idx) => {
                        const isCopied = copiedIndex === idx;
                        return (
                          <div 
                            key={p.title} 
                            className="p-4 sm:p-5 rounded-xl bg-black border border-white/5 space-y-3"
                          >
                            <div className="flex justify-between items-center">
                              <div>
                                <span className="text-[9px] font-mono uppercase bg-zinc-900 px-2 py-0.5 border border-white/5 text-slate-400 rounded">
                                  {p.toolType}
                                </span>
                                <h5 className="font-display text-sm font-medium text-slate-200 mt-1">{p.title}</h5>
                              </div>
                              
                              <button
                                onClick={() => copyPromptText(p.textPrompt, idx)}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black border border-white/5 text-[10px] font-mono text-cyan-400 transition-all hover:border-cyan-500/30 cursor-pointer"
                              >
                                {isCopied ? (
                                  <>
                                    <Check className="w-3 h-3 text-emerald-400" />
                                    <span>Copied</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3 h-3 text-cyan-400" />
                                    <span>Copy Recipe</span>
                                  </>
                                )}
                              </button>
                            </div>

                            <p className="font-mono text-xs text-gray-400 leading-relaxed font-light select-all bg-black/40 p-3 rounded-lg border border-white/5 max-h-32 overflow-y-auto">
                              {p.textPrompt}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Actions Guidelines Directives checklist */}
                  <div className="space-y-3 pt-6 border-t border-white/5">
                    <h4 className="font-mono text-xs uppercase text-gray-500 tracking-wider">Aesthetic Implementation directives</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {brief.designDirectives.map((d) => (
                        <li key={d} className="flex items-start gap-2.5 text-xs text-slate-355 font-sans font-light">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </motion.div>
              )}

            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
