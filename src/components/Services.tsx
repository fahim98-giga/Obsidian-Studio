import { ReactNode } from "react";
import { motion } from "motion/react";
import { PenTool, BrainCircuit, Box, Share2, Server } from "lucide-react";

interface Service {
  icon: ReactNode;
  title: string;
  description: string;
  features: string[];
}

export default function Services() {
  const servicesList: Service[] = [
    {
      icon: <PenTool className="w-5 h-5 text-cyan-400" />,
      title: "Custom Logo Design",
      description: "Sophisticated corporate vector marks, responsive typography, and distinct high-concept layouts designed from pure artistic vision.",
      features: ["Symmetric construction grids", "Fully vector source deliverables", "Horizontal, vertical & monochrome variants"]
    },
    {
      icon: <BrainCircuit className="w-5 h-5 text-purple-400" />,
      title: "Full Brand Identity Package",
      description: "A complete global style manual mapping voice, primary color combinations, typographical layouts, and logo usage guidelines.",
      features: ["Typography pairing system", "Cooperative secondary palettes", "Comprehensive style book manual"]
    },
    {
      icon: <Box className="w-5 h-5 text-cyan-400" />,
      title: "3D Logo Visualization",
      description: "Dimensional renders using virtual material concepts (glass refractions, brushed metallic shells, matte obisidan textures) for pitch decks.",
      features: ["High-fidelity Octane renders", "Refraction & light casting tests", "Animated turntables available"]
    },
    {
      icon: <Share2 className="w-5 h-5 text-purple-400" />,
      title: "Social Media Design Kit",
      description: "Dynamic digital templates, high-contrast banner graphics, and custom visual templates matching the brand style guide.",
      features: ["LinkedIn & Twitter cover kits", "Instagram templates & patterns", "Custom stream or slide layout designs"]
    }
  ];

  return (
    <section id="services" className="py-24 bg-[#050505] relative px-4 border-t border-white/5">
      {/* Decorative Radial glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/5 blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        {/* Title block */}
        <div className="flex flex-col mb-16">
          <div className="flex items-center gap-2 mb-2 font-mono text-xs uppercase tracking-widest text-cyan-400">
            <Server className="w-3.5 h-3.5 text-cyan-400" />
            <span>02 // CAPABILITIES</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-black uppercase italic text-white tracking-tight flex items-center">
            Our Studio <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 ml-2">Services</span>
            <span className="ml-4 h-[1px] w-16 sm:w-24 bg-cyan-500/20"></span>
          </h2>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {servicesList.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4, borderColor: "rgba(34, 211, 238, 0.25)" }}
              className="p-8 rounded-2xl bg-gradient-to-br from-zinc-900 to-black border border-white/10 hover:shadow-[0_4px_30px_rgba(34,211,238,0.05)] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header Icon & Title */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-black border border-white/10 flex items-center justify-center">
                    {service.icon}
                  </div>
                  <h3 className="font-display text-xl font-medium text-white">{service.title}</h3>
                </div>

                <p className="font-sans text-sm text-gray-400 leading-relaxed mb-6 font-light">
                  {service.description}
                </p>
              </div>

              {/* Feature items */}
              <ul className="space-y-2 pt-4 border-t border-white/5">
                {service.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-2.5 text-xs font-mono text-gray-500">
                    <span className="w-1 h-3.5 bg-cyan-500/30 rounded-sm" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
