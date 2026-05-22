import { ShowcaseProject } from "./types";

import neotechLogoImg from "./assets/images/neotech_logo_1779475763524.png";
import obsidianLuxeImg from "./assets/images/obsidian_luxe_1779475781396.png";
import quantumLogoImg from "./assets/images/quantum_logo_1779475797354.png";
import finovaAppImg from "./assets/images/finova_app_1779475814944.png";
import pulseGamingImg from "./assets/images/pulse_gaming_1779475830244.png";
import arcadiaBrandImg from "./assets/images/arcadia_brand_1779475848351.png";

export const SHOWCASE_PROJECTS: ShowcaseProject[] = [
  {
    id: "neotech-logo",
    title: "NeoTech Minimal Logo",
    category: "Logo Design",
    description: "A modern minimal logo designed for a futuristic tech startup. The goal was to create a simple yet powerful identity that represents innovation, speed, and digital growth with a hidden 'N' symbol.",
    image: neotechLogoImg,
    highlights: ["Clean Geometric Shape", "Hidden 'N' Abstract Form", "Modern Flat Tech Style"],
    colorPalette: [
      { name: "Neon Blue Accent", hex: "#22D3EE" },
      { name: "Absolute Black", hex: "#000000" },
      { name: "Cyber Charcoal", hex: "#111115" }
    ],
    originalPrompt: "Futuristic flat minimalist tech company logo design, abstract geometric symbol depicting a hidden letter N, bold neon blue cyber accent color, solid deep black background, extreme high contrast, clean vectors, sharp lines, ultra high resolution visual art mockup, 4:3 aspect ratio",
    canvaPrompt: "Geometric futuristic corporate logo. Modern solid deep indigo icon embedding a stylized speed-oriented letter N vector with glowing neon cyan keylines."
  },
  {
    id: "obsidian-luxe",
    title: "Obsidian Luxe Branding",
    category: "Brand Identity",
    description: "A premium brand identity system designed for a luxury fashion label. Focused on elegance, luxury, simplicity, and high-end visual appeal with premium corporate business card overlays.",
    image: obsidianLuxeImg,
    highlights: ["Premium Logo Design", "Business Card Mockup", "Cohesive Typography System"],
    colorPalette: [
      { name: "Champagne Gold", hex: "#D4AF37" },
      { name: "Obsidian Black", hex: "#08080C" },
      { name: "Pristine White", hex: "#FFFFFF" }
    ],
    originalPrompt: "Premium high-end corporate mockup for luxury fashion label Obsidian Luxe. Sleek black business card design flat overlay on stone table, with champagne metallic gold foil serif typography. Deep charcoal gray and soft white details. Centered, expensive editorial aesthetic, studio lighting, flat lay composition, 4:3 aspect ratio",
    canvaPrompt: "Sophisticated luxury corporate cards side-by-side layout, black leather background textures accented with clean modern gold foil line separators and sleek serif typographic system."
  },
  {
    id: "quantum-logo",
    title: "Quantum 3D Logo Visualization",
    category: "3D Visual Concept",
    description: "A futuristic 3D metallic logo concept designed for a digital agency. Features an intricate metallic structure floating in deep spatial air with elegant soft ambient glow effects.",
    image: quantumLogoImg,
    highlights: ["3D Metallic Surface", "Purple Neon Glimmer", "Floating Gravity Feel"],
    colorPalette: [
      { name: "Neon Purple Glow", hex: "#A855F7" },
      { name: "Metallic Titanium", hex: "#71717A" },
      { name: "Cosmic Dark Space", hex: "#09090B" }
    ],
    originalPrompt: "Experimental futuristic 3D metallic logo floating in dark dark cosmic empty space, glowing soft neon purple ambient light, high tech metallic titanium texture, octane rendering style, geometric crystalline structure, studio lighting, 4:3 aspect ratio",
    canvaPrompt: "Polished futuristic abstract render showcasing an interconnected spatial chrome sphere cluster casting rich warm violet and violet glow reflections against clean pitch dark backdrop."
  },
  {
    id: "finova-app",
    title: "Finova Mobile App Identity",
    category: "Fintech Startup Identity",
    description: "A clean and modern brand identity designed for a mobile finance app. Focused on conveying digital trust, simplicity, and security through visual elements, beautiful gradients, and sleek mockups.",
    image: finovaAppImg,
    highlights: ["Custom Fintech App Logo", "Vibrant UI Gradient Style", "Minimal Interface Graphic Mockup"],
    colorPalette: [
      { name: "Fintech Gradient Blue", hex: "#3B82F6" },
      { name: "Pristine Snow White", hex: "#FAFAFA" },
      { name: "Digital Teal Security", hex: "#14B8A6" }
    ],
    originalPrompt: "Modern clean fintech mobile app brand identity mockup showing a polished clean white and soft blue gradient interface on a black phone mockup, with minimalist app logo and trusted digital security graphic icon, vector elements, elegant shadow, 4:3 aspect ratio",
    canvaPrompt: "Clean dual-tone screen interface template incorporating a geometric corporate finance coin monogram in dynamic royal blue gradient on pure white canvas."
  },
  {
    id: "pulse-gaming",
    title: "Pulse Esports Identity",
    category: "Gaming & Esports Logo",
    description: "A bold and aggressive logo and visual system designed for a competitive gaming team. Employs energetic sharp typography, abstract heartbeat waves, and an intense red neon aesthetic.",
    image: pulseGamingImg,
    highlights: ["Aggressive Sharp Typography", "Abstract Heartbeat Wave", "Dynamic Speed Motion feel"],
    colorPalette: [
      { name: "Aggressive Red Neon", hex: "#EF4444" },
      { name: "Deep Matte Black", hex: "#0A0A0A" },
      { name: "Electric Ember Gray", hex: "#27272A" }
    ],
    originalPrompt: "Bold and aggressive esports gaming team logo design. Sharp stylized typography with abstract neon red glowing pulse wave heart rate shape, energy and speed lines on dark textured black grunge background, cinematic dynamic motion feel, gaming banner, 4:3 aspect ratio",
    canvaPrompt: "Sharp tribal esports brand layout features a powerful scarlet vector graphic of a heartbeat pulse speed icon, styled with sharp angles on a high-contrast dark space background."
  },
  {
    id: "arcadia-brand",
    title: "Arcadia Architecture Studio",
    category: "Architecture Studio Branding",
    description: "A minimal and sophisticated brand identity solution tailored for Arcadia Architecture Studio. Revolves around modular geometric structure, high-end balance, and clean typography layouts.",
    image: arcadiaBrandImg,
    highlights: ["Letterhead Design Brief", "Premium Business Card Mockup", "Structural Balance System"],
    colorPalette: [
      { name: "Architectural Beige", hex: "#F5F5DC" },
      { name: "Jet Slate Black", hex: "#18181B" },
      { name: "Concrete Soft Gray", hex: "#E4E4E7" }
    ],
    originalPrompt: "Extremely minimal sophisticated corporate brand presentation for high-end architecture studio. Business card and structural letterhead layout. Calm elegant beige, jet black, and soft concrete gray color palette. Clean geometry, architectural blueprints background, premium luxury texture, studio photorealistic flat-lay, 4:3 aspect ratio",
    canvaPrompt: "Modern minimalist layout for an architect monograph. Sleek sandstone textured background with structured matte-black geometrical frame and subtle ivory geometric line illustration."
  }
];
