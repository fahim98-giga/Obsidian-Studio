import { ShowcaseProject } from "./types";

import techLogoImg from "./assets/images/tech_logo_design_1779474790560.png";
import luxuryBrandImg from "./assets/images/luxury_brand_design_1779474811425.png";
import futuristicLogoImg from "./assets/images/futuristic_logo_3d_1779474833462.png";

export const SHOWCASE_PROJECTS: ShowcaseProject[] = [
  {
    id: "minimal-tech-logo",
    title: "Minimal Tech Logo Design",
    category: "Logo Design",
    description: "An absolute flat minimalist tech logo design study, incorporating sharp geometric fine lines on a pure dark, obsidian-like background. Crafted for robust responsiveness at extreme scales.",
    image: techLogoImg,
    highlights: ["Flat Vector Structure", "High-Contrast Balance", "Cybernetic Aesthetics"],
    colorPalette: [
      { name: "Polar White", hex: "#FFFFFF" },
      { name: "Deep Charcoal", hex: "#121216" },
      { name: "Cyber Gray", hex: "#262630" }
    ],
    originalPrompt: "Luxury flat minimalist tech logo design, white abstract geometric cyber symbol on absolute dark background, fine lines, sharp edges, modern tech company branding, high resolution 3D visual render concept, studio lighting",
    canvaPrompt: "Sleek, flat geometric technical icon representing a modular cyber node. Styled with high-contrast, clean lines, and perfectly balanced negative space over a solid dark background."
  },
  {
    id: "luxury-brand-identity",
    title: "Luxury Brand Identity Design",
    category: "Brand Identity Design",
    description: "Sophisticated corporate presentation for elite high-fashion and styling. Features luxury black card overlays with metallic gold elegant serif lettering, set upon an organic slate background.",
    image: luxuryBrandImg,
    highlights: ["Metallic Gold Foil Accents", "Serif Typography Pairing", "Premium Material Textures"],
    colorPalette: [
      { name: "Obsidian Black", hex: "#08080C" },
      { name: "Champagne Gold", hex: "#E2C384" },
      { name: "Brushed Slate", hex: "#23232C" }
    ],
    originalPrompt: "Minimalist luxury fashion brand identity design showcase. Premium black card overlay with gold elegant sophisticated serif typeface logo. Refined stone textures, corporate visual branding mock-up on sleek minimalist dark obsidian surface, studio lighting",
    canvaPrompt: "Elegant corporate luxury styling card layout. Coarse black slate surface with brushed gold-foil typeface details and fine gold thin margins."
  },
  {
    id: "3d-futuristic-logo",
    title: "3D Futuristic Logo Concept",
    category: "3D Logo Visualization",
    description: "An experimental crystal structure refracting neon purple and deep electric blue spectrums. Designed as a concept centerpiece for high-end digital agency models and Web3 platforms.",
    image: futuristicLogoImg,
    highlights: ["Holographic Glass Refraction", "Neon Ambient Radiance", "Octane Organic Materials"],
    colorPalette: [
      { name: "Void Violet", hex: "#1A0F2E" },
      { name: "Neon Blue", hex: "#3B82F6" },
      { name: "Obsidian Core", hex: "#030305" }
    ],
    originalPrompt: "Beautiful 3D futuristic crystal logo concept, glowing neon purple obsidian sculpture with holographic blue glass refraction, floating in empty dark cosmic space with absolute black background, photorealistic octane render, high detailed",
    canvaPrompt: "Neon purple and electric cyan 3D glowing cluster, abstract crystalline orb floating centered in a dark spatial atmosphere, polished glass refraction look."
  }
];
