export interface ProjectColor {
  name: string;
  hex: string;
}

export interface ShowcaseProject {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  originalPrompt: string;
  canvaPrompt: string;
  highlights: string[];
  colorPalette: ProjectColor[];
}

export interface BriefColor {
  name: string;
  hex: string;
  description: string;
}

export interface BriefAIPrompt {
  toolType: string;
  title: string;
  textPrompt: string;
}

export interface BrandBrief {
  conceptTitle: string;
  conceptDescription: string;
  brandPersona: string;
  colorPalette: BriefColor[];
  aiPrompts: BriefAIPrompt[];
  designDirectives: string[];
}
