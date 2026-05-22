import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, CheckCircle, Mail, MapPin, Globe, ArrowRight } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "Logo Design",
    details: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setIsSubmitting(true);
    // Simulate API storage
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      service: "Logo Design",
      details: ""
    });
    setIsSubmitted(false);
  };

  return (
    <section id="contact" className="py-24 bg-[#050505] relative px-4 border-t border-white/5">
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Studio Contact Info (Left Column) */}
          <div className="md:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="font-mono text-xs uppercase tracking-widest text-[#22d3ee] font-semibold">
                Available for Freelance
              </span>
              <h2 className="font-display text-4xl sm:text-5xl font-black uppercase italic text-white tracking-tight">
                Secure <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Obsidian</span>
              </h2>
              <p className="font-sans text-sm text-gray-450 leading-relaxed font-light">
                Let's collaborate on your logo, visual branding guidelines, or high-fidelity 3D brand assets. We usually respond to inquiries within 24 working hours.
              </p>
            </div>

            {/* Direct Contact Handles */}
            <div className="space-y-4 pt-4 border-t border-white/5 font-mono text-xs text-gray-400">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-black border border-white/10 flex items-center justify-center text-cyan-400">
                  <Mail className="w-4 h-4" />
                </div>
                <span>hello@obsidianstudio.co</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-black border border-white/10 flex items-center justify-center text-cyan-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <span>Global Digital Operations</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-black border border-white/10 flex items-center justify-center text-purple-400">
                  <Globe className="w-4 h-4" />
                </div>
                <span>www.obsidianstudio.co</span>
              </div>
            </div>
          </div>

          {/* Contact Console Form (Right Column) */}
          <div className="md:col-span-7 bg-gradient-to-br from-zinc-900 to-black border border-white/10 p-6 sm:p-8 rounded-2xl relative">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono uppercase text-gray-550 tracking-wider">Your Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Liam Sterling"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 transition-colors"
                        required
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono uppercase text-gray-550 tracking-wider">Email Address</label>
                      <input
                        type="email"
                        placeholder="liam@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 transition-colors"
                        required
                      />
                    </div>
                  </div>

                  {/* Service selector */}
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono uppercase text-gray-550 tracking-wider">Required Capability</label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-[#050505] border border-white/10 rounded-xl px-3 py-3 text-sm text-slate-350 focus:outline-none focus:border-cyan-500/50 transition-colors"
                    >
                      <option>Logo Design</option>
                      <option>Full Brand Identity Package</option>
                      <option>3D Logo Visualization</option>
                      <option>Social Media Design Kit</option>
                      <option>General Collaboration</option>
                    </select>
                  </div>

                  {/* Descriptions */}
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono uppercase text-gray-550 tracking-wider">Design Brief Parameters</label>
                    <textarea
                      placeholder="Outline any project constraints, visual materials, key timelines, etc..."
                      rows={4}
                      value={formData.details}
                      onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                      className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 transition-colors resize-none"
                    />
                  </div>

                  {/* Actions Trigger */}
                  <button
                    type="submit"
                    disabled={isSubmitting || !formData.name || !formData.email}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 font-medium text-white hover:opacity-90 disabled:opacity-40 select-none cursor-pointer hover:shadow-[0_0_20px_rgba(34,211,238,0.25)] transition-all"
                  >
                    <span>{isSubmitting ? "Transmitting Inquiries..." : "Transmit Briefing"}</span>
                    {!isSubmitting && <Send className="w-4 h-4 ml-1" />}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center text-center py-12 px-4 space-y-6"
                >
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <CheckCircle className="w-7 h-7" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">Transmission Verified</h3>
                    <p className="font-sans text-sm text-gray-400 max-w-sm mx-auto font-light leading-relaxed">
                      Your design inquiry has been successfully transmitted. Obsidian Studio has queued this request and will respond shortly.
                    </p>
                  </div>

                  <button
                    onClick={handleReset}
                    className="flex items-center gap-2 bg-black border border-white/10 text-xs font-mono text-cyan-400 hover:border-cyan-550 px-5 py-2.5 rounded-xl active:scale-95 transition-all uppercase cursor-pointer hover:text-white"
                  >
                    <span>Draft Another Brief</span>
                    <ArrowRight className="w-3 px-0 inline scroll-smooth" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
