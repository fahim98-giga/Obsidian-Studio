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

// Brand Generation AI Service
app.post("/api/generate-brief", async (req, res) => {
  try {
    const { brandName, industry, styleVibe, customInfo } = req.body;

    if (!brandName) {
      return res.status(400).json({ error: "Brand name is required." });
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
    res.json(parsedBrief);
  } catch (error: any) {
    console.error("Error generating brand brief:", error);
    res.status(500).json({
      error: "Failed to generate brand brief due to a server error.",
      details: error.message || String(error)
    });
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
