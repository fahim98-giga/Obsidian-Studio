import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy initialization check for GoogleGenAI
let aiInstance: GoogleGenAI | null = null;
function getAi(): GoogleGenAI {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined in the environment variables.");
    }
    aiInstance = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiInstance;
}

// REST API Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Procedural Brand Brief Generator Fallback
function generateProceduralBrief(brandName: string, industry: string, styleVibe: string, customInfo: string) {
  let paletteName = "Strategic Aesthetic";
  let mainColorHex = "#22d3ee";
  let mainColorDesc = "A vibrant cyan focal accent.";
  let accentColorHex = "#a855f7";
  let accentColorDesc = "A striking purple core representing digital creativity.";
  let baseDarkHex = "#050505";
  let baseDarkDesc = "Deep obsidian absolute dark tone.";
  let highlightHex = "#fafafa";
  let highlightDesc = "A pristine white for typography contrast.";
  
  let designDirectives = [
    "Retain extremely spacious layouts with more than 40% clean negative space.",
    "Adopt high-contrast light borders (1px border-white/10) rather than heavy solid elements.",
    "Pair heavy geometric display font faces with wide-tracked monospaced parameters."
  ];

  if (industry === "SaaS & AI Tech") {
    paletteName = "Cyber Energy Loop";
    mainColorHex = "#22d3ee";
    mainColorDesc = "The core neon cyan energy grid, representing live computation.";
    accentColorHex = "#a855f7";
    accentColorDesc = "Deep cognitive ultraviolet layer signaling rapid innovation.";
    baseDarkHex = "#050508";
    baseDarkDesc = "Obsidian deep-space void canvas foundation.";
    highlightHex = "#f8fafc";
    highlightDesc = "Pristine white accent for interface telemetry data.";
    designDirectives = [
      "Implement subtle 1px cyan neon border glows around primary content cards.",
      "Utilize letter tracking (tracking-widest) on all monospaced meta labels.",
      "Prioritize dynamic layouts with floating elements and custom vector indicators."
    ];
  } else if (industry === "Luxury Fashion") {
    paletteName = "Atelier Obsidian";
    mainColorHex = "#d4af37";
    mainColorDesc = "A champagne metallic gold foil hue symbolizing high-end exclusivity.";
    accentColorHex = "#1c1917";
    accentColorDesc = "Sleek organic volcanic basalt texture shading.";
    baseDarkHex = "#020202";
    baseDarkDesc = "Imperial jet black, presenting expensive architectural contrast.";
    highlightHex = "#f5f5f4";
    highlightDesc = "Premium raw ivory shade mimicking tailored silk canvas.";
    designDirectives = [
      "Employ pristine editorial serif typography for main headings.",
      "Strictly enforce asymmetrical layouts with vast margin voids representing silence.",
      "Limit design borders to organic soft hair-lines with rich, deep, dark shadow structures."
    ];
  } else if (industry === "Web3 & Crypto") {
    paletteName = "Prism Consensus";
    mainColorHex = "#10b981";
    mainColorDesc = "A high-performance mint green color representing consensus execution.";
    accentColorHex = "#6366f1";
    accentColorDesc = "A decentralized liquidity indigo hue marking structural layers.";
    baseDarkHex = "#030712";
    baseDarkDesc = "Vast cryptographic ledger dark void base.";
    highlightHex = "#f3f4f6";
    highlightDesc = "Premium ledger silver shade for secure technical labels.";
    designDirectives = [
      "Embed subtle isometric wireframe overlays or layered glassmorphic cards.",
      "Employ dynamic tracking coordinates (e.g. UTC, blocks) as structural header tags.",
      "Enforce standard micro-mono font pairings with high-contrast indicator dots."
    ];
  } else if (industry === "Eco & Organic") {
    paletteName = "Carbon Terra Loop";
    mainColorHex = "#059669";
    mainColorDesc = "Moss green tone reflecting biological carbon renewal and growth.";
    accentColorHex = "#d97706";
    accentColorDesc = "A sustainably sourced warm ochre clay representing soil earth elements.";
    baseDarkHex = "#060907";
    baseDarkDesc = "A bio-tinted deep botanical undergrowth background.";
    highlightHex = "#f7fee7";
    highlightDesc = "Fresh lime blossom green-yellow for energetic interface tags.";
    designDirectives = [
      "Utilize curved corner radii (24px) to promote natural, organic tactile shapes.",
      "Rely entirely on elegant humanist sans-serif typefaces paired with fine line art.",
      "Acknowledge the carbon-neutral mood with stone-tinted secondary backgrounds."
    ];
  } else if (industry === "Esports & Gaming") {
    paletteName = "Overdrive Kinetic";
    mainColorHex = "#ef4444";
    mainColorDesc = "Vivid kinetic red symbolizing tactical momentum and peak velocity.";
    accentColorHex = "#f97316";
    accentColorDesc = "Peak adrenal orange signaling dynamic competition and high frame rates.";
    baseDarkHex = "#09090b";
    baseDarkDesc = "Carbon-fiber dark textured matte backdrop.";
    highlightHex = "#ffffff";
    highlightDesc = "Highly visible bright tactical armor white highlights.";
    designDirectives = [
      "Utilize aggressive diagonal lines and sharp geometric structural containers.",
      "Contrast dark backdrops with vivid red ambient beam lines in margins.",
      "Pair styled slanted italic titles with compact monospace labels."
    ];
  }

  let conceptTitle = `${brandName} // Synthesized Identity`;
  let conceptDescription = `A bespoke design proposal for ${brandName}, integrating ${styleVibe} aesthetics with professional ${industry} requirements to construct a singular, authentic visual presence.`;
  let brandPersona = "Innovative, high-fidelity, polished, cohesive.";
  
  let canvaPrompt = `Clean corporate card layout for ${brandName}, incorporating minimal custom ${mainColorHex} styling guidelines, balanced negative space.`;
  let mjPrompt = `Cinematic modern logo mark for ${brandName}, ${styleVibe} style, centered, high contrast, ultra detailed, octane render, 8k, --ar 4:3`;
  let blenderPrompt = `3D abstract kinetic structure embodying ${brandName}, floating in spatial darkness, glowing ${mainColorHex} reflections, photo-realistic material render, --ar 4:3`;

  if (styleVibe === "Cosmic Minimalist") {
    conceptTitle = `${brandName} // Stellar Void`;
    conceptDescription = `An elite brand strategy for ${brandName} designed on principles of weightless spatial physics and thin-line galactic structures. Focuses on absolute black grounds paired with deep cyan coordinates.`;
    brandPersona = "Vast, Silent, Celestial, Hyper-Elegant";
    canvaPrompt = `Minimalist celestial concept graphic for ${brandName}. Elegant thin concentric orbits on an absolute dark void, glowing cyan typography, centered grid, space-inspired luxury.`;
    mjPrompt = `A stellar minimalist logo for ${brandName}, abstract geometric star construct made of glass and thin gold threads, floating in raw cinematic space, soft purple backlight, highly polished lens flare, Hasselblad photography, --ar 4:3`;
    blenderPrompt = `Abstract metallic logo sculpture of ${brandName} floating in dark cosmic orbit, subtle neon purple and cyan raytraced reflections, highly detailed matte procedural metal material, cycles renderer, pristine.`;
  } else if (styleVibe === "Futuristic Cyberpunk") {
    conceptTitle = `${brandName} // Neural Overdrive`;
    conceptDescription = `A high-density cybernetic strategy for ${brandName} focusing on holographic interfaces, integrated wiring guides, and razor-sharp digital contrast. Perfect for leading edge tech positioning.`;
    brandPersona = "Aggressive, Terminal-inspired, Chromatic, Loud";
    canvaPrompt = `Futuristic terminal wireframe design template for ${brandName}, featuring integrated digital circuitry vectors, cyan highlight grids, raw monospaced typography guidelines.`;
    mjPrompt = `An aggressive cybernetic tech emblem for ${brandName}, neon cyber lines, highly detailed glowing holographic glyphs, wet Tokyo alley street rain reflections, steam vents, sci-fi computer UI overlay, 8k, --ar 4:3`;
    blenderPrompt = `Sleek high-tech 3D glassmorphic control pad mockup for ${brandName}, organic internal copper traces, glowing neon laser light bars, physical buttons, cycles refractive glass rendering.`;
  } else if (styleVibe === "Premium Noir") {
    conceptTitle = `${brandName} // Silhouette Luxe`;
    conceptDescription = `A dramatic, rich brand architecture modeled after classic cinema, casting luxurious highlights from pitch-dark environments. Centered on luxury textures like obsidian, leather, and sandblasted quartz.`;
    brandPersona = "Seductive, Mysterious, Premium, Architectural";
    canvaPrompt = `Premium graphite brand board for ${brandName}, showcasing extensive matte stone textures, high-contrast spotlight overlays, champagne gold italic lettering.`;
    mjPrompt = `An expensive brand identity monogram for ${brandName}, elegant organic abstract monogram, studio smoke background, dramatic raw side lighting casting long shadows, expensive matte concrete texture, Hasselblad 500c photography, --ar 4:3`;
    blenderPrompt = `Premium jewelry display base displaying ${brandName} brand crest debossed on an organic basalt rock formation, realistic water condensation, singular dramatic softbox spotlight, raytraced shadows.`;
  } else if (styleVibe === "Swiss Brutalism") {
    conceptTitle = `${brandName} // Helvetica Mass`;
    conceptDescription = `A structural brand layout leveraging massive sans-serif layout grids, dense text blocks, raw sandblasted concrete textures, and unapologetic offset spacing rules.`;
    brandPersona = "Raw, Rigid, Modular, Direct";
    canvaPrompt = `Asymmetric Swiss layout brochure for ${brandName}, features a brutalist typography layout on neutral gray background, thick solid black layout bars, structural frame border guides.`;
    mjPrompt = `Brutalist architectural logotype for ${brandName}, monumental steel-reinforced raw concrete block letter structures, pure geographic mass, industrial structural girders, minimalist heavy shadows, 8k, --ar 4:3`;
    blenderPrompt = `Raw structural concrete column, embossed with the ${brandName} flat typographic brand mark, morning structural window shadow cast across the surface, architectural void details.`;
  } else if (styleVibe === "Neomorphic Bio-Tech") {
    conceptTitle = `${brandName} // Organic Synthesis`;
    conceptDescription = `A warm, biophilic strategy for ${brandName} that models software layout after tactile skin membranes, liquid drops, sterile clinical white-rooms, and warm organic interface paths.`;
    brandPersona = "Clinical, Fluid, Tactile, Advanced";
    canvaPrompt = `Tactile clinical UI screen template for ${brandName}, featuring soft extruded plastic neomorphic curves, pristine medical white gradients, emerald green bio indicators.`;
    mjPrompt = `A pristine medical biotech emblem for ${brandName}, custom biological cell structure, glowing emerald translucent organic materials, complex microscopic tissue veins, soft studio lighting, macro photography, 100mm lens, --ar 4:3`;
    blenderPrompt = `A neomorphic silicone control screen featuring ${brandName} logo debossed into soft interactive squishy plastic buttons, warm ambient occlusion, matte material, clinical white and emerald green scheme.`;
  }

  if (customInfo && customInfo.trim().length > 0) {
    conceptDescription += ` Enhanced by user parameters: "${customInfo}".`;
    designDirectives.push(`Ensure user requirements are met: ${customInfo}`);
  }

  return {
    conceptTitle,
    conceptDescription,
    brandPersona,
    colorPalette: [
      { name: "Primary Brand Voice", hex: mainColorHex, description: mainColorDesc },
      { name: "Secondary Signature", hex: accentColorHex, description: accentColorDesc },
      { name: "Visual Zero Point", hex: baseDarkHex, description: baseDarkDesc },
      { name: "Contrast Highlight", hex: highlightHex, description: highlightDesc }
    ],
    aiPrompts: [
      { toolType: "Canva Pro", title: "Corporate Digital Style Guide", textPrompt: canvaPrompt },
      { toolType: "Midjourney v6", title: "Photorealistic Conceptual Identity", textPrompt: mjPrompt },
      { toolType: "Blender 3D", title: "High-Fidelity Spatial Asset", textPrompt: blenderPrompt }
    ],
    designDirectives,
    isSimulated: true
  };
}

// Brand Generation AI Service
app.post("/api/generate-brief", async (req, res) => {
  try {
    const { brandName, industry, styleVibe, customInfo } = req.body;

    if (!brandName) {
      return res.status(400).json({ error: "Brand name is required." });
    }

    // Checking for API Key. If missing, yield to procedural generator immediately
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.log("[Prompt Engine] Missing GEMINI_API_KEY, utilizing local procedural node.");
      const brief = generateProceduralBrief(brandName, industry, styleVibe, customInfo);
      return res.json(brief);
    }

    const ai = getAi();
    const prompt = `
      You are Obsidian Studio's AI Brand & Prompt Consultant.
      Create a highly professional, bespoke corporate creative brief, color palette, and premium design AI prompts for Canva, Midjourney, and 3D visual tools.
      
      Client Input Parameters:
      - Brand Name: "${brandName}"
      - Industry/Niche: "${industry || "Creative Tech"}"
      - Aesthetic Style / Vibe: "${styleVibe || "Futuristic Minimal"}"
      - Additional Details: "${customInfo || "None provided"}"

      Provide the results in the requested JSON structure. Keep it original, premium, and sophisticated.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are an elite, premium, futuristic brand strategist at Obsidian Studio. You construct flawless corporate visual strategies, beautiful color schemes, and ultra-specific text prompts for image generators and design tools. Your tone is elite, modern, and inspiring.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            conceptTitle: {
              type: Type.STRING,
              description: "The creative concept name for this brand identity."
            },
            conceptDescription: {
              type: Type.STRING,
              description: "A 2-3 sentence deep conceptual description of the visual strategy."
            },
            brandPersona: {
              type: Type.STRING,
              description: "The professional tone, voice, and design philosophy (e.g., Elegant, Brutalist, Cosmic Minimal)."
            },
            colorPalette: {
              type: Type.ARRAY,
              description: "A gorgeous, modern color theme with 4 custom colors.",
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING, description: "Unique, design-focused name (e.g. Cyber Jade, Void Black)." },
                  hex: { type: Type.STRING, description: "Standard Hex code (e.g. #0D0D11)." },
                  description: { type: Type.STRING, description: "What this color symbolizes or how to use it." }
                },
                required: ["name", "hex", "description"]
              }
            },
            aiPrompts: {
              type: Type.ARRAY,
              description: "Exactly 3 copy-pasteable prompt recipes for various design tools.",
              items: {
                type: Type.OBJECT,
                properties: {
                  toolType: { type: Type.STRING, description: "Canva Pro, Midjourney v6, or 3D / Blender" },
                  title: { type: Type.STRING, description: "The asset role (e.g., 'Modern Tech Logo Mark', 'Social Graphic Concept')" },
                  textPrompt: { type: Type.STRING, description: "A detailed, ultra-premium visual prompt structured following prompt-engineering best practices." }
                },
                required: ["toolType", "title", "textPrompt"]
              }
            },
            designDirectives: {
              type: Type.ARRAY,
              description: "3-4 actionable graphical guidelines for the designer.",
              items: { type: Type.STRING }
            }
          },
          required: ["conceptTitle", "conceptDescription", "brandPersona", "colorPalette", "aiPrompts", "designDirectives"]
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("Empty response received from the Gemini API.");
    }

    const parsedBrief = JSON.parse(text);
    parsedBrief.isSimulated = false;
    res.json(parsedBrief);
  } catch (error: any) {
    console.error("Error generating brand brief, executing procedural fallback:", error);
    try {
      const brief = generateProceduralBrief(req.body.brandName, req.body.industry, req.body.styleVibe, req.body.customInfo);
      res.json(brief);
    } catch (fallbackError) {
      res.status(500).json({
        error: "Failed to generate brand brief.",
        details: error.message || String(error)
      });
    }
  }
});

async function start() {
  // Vite Integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[FULLSTACK] Server running on http://localhost:${PORT}`);
  });
}

start();
