import { motion } from "motion/react";
import { Sliders, Cpu } from "lucide-react";

interface Skill {
  name: string;
  level: number;
  description: string;
  subskills: string[];
}

export default function Skills() {
  const skillsList: Skill[] = [
    {
      name: "Logo Design",
      level: 95,
      description: "Pixel-perfect geometry, optical weight equalization, and custom graphic marks.",
      subskills: ["Geometric Grid Alignment", "Negative Space Balance", "Scalability Testing"]
    },
    {
      name: "Brand Identity Design",
      level: 90,
      description: "Cohesive aesthetic architecture styling manuals and responsive type pairing schemes.",
      subskills: ["Corporate Moodboards", "Typography Hierarchy", "Branding Guidelines"]
    },
    {
      name: "3D Logo Design",
      level: 85,
      description: "Depth renders with custom metallic, glass, and emission textures.",
      subskills: ["Material Shader Nodes", "Holographic Overlays", "Shadow & Depth Contrasts"]
    },
    {
      name: "Social Media Graphics",
      level: 92,
      description: "High-contrast banners, stories, and feed layouts crafted to lock visitor focus.",
      subskills: ["Template Orchestration", "Dynamic Color Gradients", "Banner Framing"]
    },
    {
      name: "Visual Branding",
      level: 88,
      description: "Translating values into physical and digital presence consistency.",
      subskills: ["Asset Packaging", "Aesthetic System Integration", "AI-Powered Directives"]
    }
  ];

  return (
    <section id="skills" className="py-24 bg-[#050505] relative px-4 border-t border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.03),transparent_40%)]" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header Block */}
        <div className="flex flex-col mb-16">
          <div className="flex items-center gap-2 mb-2 font-mono text-xs uppercase tracking-widest text-[#22d3ee]">
            <Cpu className="w-3.5 h-3.5 text-cyan-450" />
            <span>03 // PROFICIENCIES</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-black uppercase italic text-white tracking-tight flex items-center">
            Design <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 ml-2">Engine Proficiencies</span>
            <span className="ml-4 h-[1px] w-16 sm:w-24 bg-cyan-500/20"></span>
          </h2>
        </div>

        {/* Skills List in Bento Card */}
        <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-zinc-900 to-black border border-white/10 backdrop-blur-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skillsList.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="space-y-3"
              >
                {/* Meta details */}
                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="font-sans text-base font-semibold text-white tracking-wide">{skill.name}</h3>
                    <p className="font-sans text-xs text-gray-400 font-light max-w-sm mt-0.5">{skill.description}</p>
                  </div>
                  <span className="font-mono text-sm font-semibold text-cyan-400">{skill.level}%</span>
                </div>

                {/* Progress bar background */}
                <div className="h-2 w-full bg-[#0a0a0c] rounded-full overflow-hidden border border-white/5 relative">
                  {/* Glowing progress slider bar */}
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 relative"
                    style={{
                      boxShadow: "0 0 10px rgba(34,211,238,0.4)"
                    }}
                  />
                </div>

                {/* Tags detailing specific skills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {skill.subskills.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[9px] uppercase tracking-wider text-gray-300 hover:bg-white/10 transition-colors uppercase font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quick statement on bottom */}
          <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="font-mono text-xs text-slate-400 uppercase tracking-widest">ACTIVATED FOR FREELANCE & PARTNERSHIP</span>
            </div>
            <p className="font-sans text-xs text-gray-500 font-light max-w-sm sm:text-right">
              We frequently calibrate these indexes via ongoing professional visual projects and AI prompt evaluation testing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
