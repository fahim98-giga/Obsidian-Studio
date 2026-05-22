import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Rocket, ExternalLink, ArrowUp } from "lucide-react";

import Hero from "./components/Hero";
import AboutMe from "./components/AboutMe";
import Services from "./components/Services";
import Skills from "./components/Skills";
import Showcase from "./components/Showcase";
import PromptEngine from "./components/PromptEngine";
import Contact from "./components/Contact";

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Track scroll activity to change header opacity
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Simple active link tracking
      const sections = ["home", "about", "services", "skills", "portfolio", "ai-engine", "contact"];
      const scrollPosition = window.scrollY + 120; // offset for nav height

      for (const sect of sections) {
        const el = document.getElementById(sect);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sect);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80, // header offset height approx
        behavior: "smooth"
      });
      setActiveSection(id);
    }
  };

  const navLinks = [
    { label: "Home", id: "home" },
    { label: "Manifesto", id: "about" },
    { label: "Services", id: "services" },
    { label: "Skills", id: "skills" },
    { label: "Showcase", id: "portfolio" },
    { label: "AI Prompt Engine", id: "ai-engine" },
    { label: "Secure Contract", id: "contact" }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-slate-100 font-sans selection:bg-cyan-500/20 selection:text-white">
      
      {/* Dynamic Header / Navigation */}
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b ${
          scrolled 
            ? "bg-black/90 backdrop-blur-md border-white/5 py-4 shadow-xl" 
            : "bg-transparent border-transparent py-6"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          
          {/* Brand Logo Display */}
          <button 
            onClick={() => scrollToSection("home")}
            className="flex items-center gap-2 group cursor-pointer text-left"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-400 to-purple-500 flex items-center justify-center font-display font-bold text-white shadow-[0_0_12px_rgba(34,211,238,0.3)] group-hover:shadow-[0_0_18px_rgba(34,211,238,0.5)] transition-all">
              O
            </div>
            <div>
              <span className="font-display text-base font-bold text-white tracking-wide block leading-none uppercase italic">
                Obsidian Studio
              </span>
              <span className="font-mono text-[9px] text-cyan-400 tracking-widest uppercase mt-0.5 block leading-none">
                Visual Art Lab
              </span>
            </div>
          </button>

          {/* Large Screen Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`relative px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all rounded-lg select-all cursor-pointer ${
                  activeSection === link.id 
                    ? "text-[#22d3ee]" 
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <span>{link.label}</span>
                {activeSection === link.id && (
                  <motion.div 
                    layoutId="activeNavIndicator"
                    className="absolute bottom-1.5 left-4 right-4 h-0.5 bg-cyan-400 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Call to action on header */}
          <div className="hidden lg:block">
            <button
              onClick={() => scrollToSection("ai-engine")}
              className="flex items-center gap-1.5 bg-cyan-500/10 hover:bg-cyan-500/15 border border-cyan-500/20 px-4 py-2 rounded-xl text-xs font-mono text-cyan-400 font-semibold transition-all cursor-pointer hover:shadow-[0_0_15px_rgba(34,211,238,0.15)]"
            >
              <Rocket className="w-3.5 h-3.5" />
              <span>Prompt Engine</span>
            </button>
          </div>

          {/* Hamburger Mobile Toggle icon */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-black border border-white/10 text-gray-400 hover:text-white transition-all cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>
      </header>

      {/* Mobile Overlying Navigation Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed inset-0 top-[76px] z-30 lg:hidden bg-black/98 backdrop-blur-lg border-t border-white/5 px-4 py-8 overflow-y-auto"
          >
            <div className="max-w-md mx-auto space-y-3 flex flex-col">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`w-full text-left px-5 py-4 rounded-xl text-sm font-display font-medium tracking-wide transition-all border ${
                    activeSection === link.id 
                      ? "bg-cyan-500/10 border-cyan-500/20 text-cyan-300" 
                      : "bg-zinc-900/40 border-white/5 text-gray-400 hover:text-white"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span>{link.label}</span>
                    <span className="font-mono text-[9px] text-gray-650 block">
                      // {link.id.toUpperCase()}
                    </span>
                  </div>
                </button>
              ))}

              <button
                onClick={() => scrollToSection("ai-engine")}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-500 hover:opacity-90 py-4 rounded-xl font-display font-semibold text-sm text-white text-center mt-6 shadow-[0_0_15px_rgba(34,211,238,0.3)]"
              >
                <Rocket className="w-4 h-4" />
                <span>Prompt Console</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mounting Content Sections */}
      <main>
        {/* Hero Landing */}
        <Hero 
          onExploreClick={() => scrollToSection("portfolio")}
          onGeneratorClick={() => scrollToSection("ai-engine")}
        />

        {/* About Manifesto */}
        <AboutMe />

        {/* Capabilities Services */}
        <Services />

        {/* Dynamic Skills Meters */}
        <Skills />

        {/* Museum Showcase Portfolio Layout */}
        <Showcase />

        {/* Prompt Engine Builder Playground */}
        <PromptEngine />

        {/* Secure Form Connections */}
        <Contact />
      </main>

      {/* Footer System Details */}
      <footer className="bg-[#020202] border-t border-white/5 py-12 px-4 font-sans">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-center sm:text-left">
          
          {/* Left Brand info */}
          <div className="space-y-2">
            <h4 className="font-display text-lg font-bold text-slate-100 flex items-center justify-center md:justify-start gap-2 uppercase italic">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>Obsidian Studio</span>
            </h4>
            <p className="font-sans text-xs text-gray-500 font-light max-w-sm">
              Connecting pristine human-grade graphic grid geometry with advanced AI prompt recipe templates.
            </p>
          </div>

          {/* Right copyright credentials */}
          <div className="space-y-2 font-mono text-[10px] text-gray-600 text-center md:text-right">
            <div>
              &copy; {new Date().getFullYear()} Obsidian Studio. All rights reserved.
            </div>
            <div className="flex items-center justify-center md:justify-end gap-1.5">
              <span>Engineered in Google Workspace ecosystem</span>
              <ExternalLink className="w-2.5 h-2.5 text-gray-600" />
            </div>
          </div>

        </div>
      </footer>

      {/* Back to top fixed button */}
      {scrolled && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-black border border-white/10 text-cyan-400 hover:text-white hover:border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.15)] z-30 transition-all transform hover:-translate-y-1 active:scale-95 cursor-pointer flex items-center justify-center"
          title="Scroll to summit"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

    </div>
  );
}
