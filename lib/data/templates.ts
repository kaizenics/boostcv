import { TemplateLayout } from '../types/resume';

export interface TemplateData {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  primaryColor: string;
  category: string[];
  layout: TemplateLayout;
}

// Sample resume data for template previews
export const sampleResumeData = {
  name: "Sarah Johnson",
  title: "Senior Product Designer",
  email: "sarah.j@email.com",
  phone: "(555) 123-4567",
  location: "San Francisco, CA",
  summary: "Creative product designer with 8+ years of experience crafting user-centered digital experiences.",
  experience: [
    { title: "Senior Product Designer", company: "TechCorp Inc.", date: "2021 - Present" },
    { title: "UI/UX Designer", company: "StartupXYZ", date: "2018 - 2021" },
  ],
  education: { degree: "B.A. in Design", school: "Stanford University", date: "2014 - 2018" },
  skills: ["Figma", "React", "User Research", "Prototyping", "Design Systems"],
};

// Template category definitions
export const templateCategories = [
  { id: "all", name: "All Templates" },
  { id: "simple", name: "Simple" },
  { id: "modern", name: "Modern" },
  { id: "professional", name: "Professional" },
  { id: "ats", name: "ATS Friendly" },
  { id: "creative", name: "Creative" },
] as const;

// All resume templates
export const templates: TemplateData[] = [
  {
    id: "celestial",
    name: "Celestial",
    description: "Soft neutral tones with refined typography for a sophisticated and professional feel.",
    thumbnail: "/templates/celestial.png",
    primaryColor: "#1e3a5f",
    category: ["all", "professional", "ats"],
    layout: "classic",
  },
  {
    id: "galaxy",
    name: "Galaxy",
    description: "A visually striking resume template, perfect for illustrating the breadth and depth of your expertise.",
    thumbnail: "/templates/galaxy.png",
    primaryColor: "#2563eb",
    category: ["all", "modern"],
    layout: "modern",
  },
  {
    id: "astral",
    name: "Astral",
    description: "Includes a prominent profile image for a personal touch while maintaining professionalism.",
    thumbnail: "/templates/astral.png",
    primaryColor: "#57534e",
    category: ["all", "professional", "creative"],
    layout: "sidebar",
  },
  {
    id: "nova",
    name: "Nova",
    description: "Clean and minimal design optimized for ATS systems with maximum readability.",
    thumbnail: "/templates/nova.png",
    primaryColor: "#374151",
    category: ["all", "simple", "ats"],
    layout: "minimal",
  },
  {
    id: "orbit",
    name: "Orbit",
    description: "Modern layout with creative elements that stand out while remaining professional.",
    thumbnail: "/templates/orbit.png",
    primaryColor: "#dc2626",
    category: ["all", "modern", "creative"],
    layout: "bold",
  },
  {
    id: "stellar",
    name: "Stellar",
    description: "Bold typography and structured sections for maximum impact and clarity.",
    thumbnail: "/templates/stellar.png",
    primaryColor: "#059669",
    category: ["all", "simple", "ats"],
    layout: "classic",
  },
  {
    id: "aurora",
    name: "Aurora",
    description: "Elegant gradient accents with a modern sidebar layout for creative professionals.",
    thumbnail: "/templates/aurora.png",
    primaryColor: "#8b5cf6",
    category: ["all", "modern", "creative"],
    layout: "sidebar",
  },
  {
    id: "zenith",
    name: "Zenith",
    description: "Minimalist design with strong visual hierarchy, perfect for executives and leaders.",
    thumbnail: "/templates/zenith.png",
    primaryColor: "#0891b2",
    category: ["all", "professional"],
    layout: "executive",
  },
  {
    id: "pulse",
    name: "Pulse",
    description: "Dynamic and energetic layout ideal for marketing and creative roles.",
    thumbnail: "/templates/pulse.png",
    primaryColor: "#f97316",
    category: ["all", "modern", "creative"],
    layout: "modern",
  },
  {
    id: "classic",
    name: "Classic",
    description: "Timeless traditional format trusted by hiring managers across all industries.",
    thumbnail: "/templates/classic.png",
    primaryColor: "#1f2937",
    category: ["all", "simple", "ats", "professional"],
    layout: "classic",
  },
  {
    id: "metro",
    name: "Metro",
    description: "Clean lines and organized sections inspired by modern urban design.",
    thumbnail: "/templates/metro.png",
    primaryColor: "#0d9488",
    category: ["all", "professional", "modern"],
    layout: "minimal",
  },
  {
    id: "bold",
    name: "Bold",
    description: "Statement-making design with strong typography for confident professionals.",
    thumbnail: "/templates/bold.png",
    primaryColor: "#be185d",
    category: ["all", "modern", "creative"],
    layout: "bold",
  },
  {
    id: "harvard",
    name: "Harvard",
    description: "The gold standard resume format used by Harvard Business School. Clean, professional, and universally accepted.",
    thumbnail: "/templates/harvard.png",
    primaryColor: "#1e1e1e",
    category: ["all", "professional", "ats", "simple"],
    layout: "harvard",
  },
];
