"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Star, Laptop, FileText, Briefcase, Shield, LayoutGrid, Image } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const categories = [
  { id: "all", name: "All Templates", icon: LayoutGrid },
  { id: "simple", name: "Simple", icon: Star },
  { id: "modern", name: "Modern", icon: Laptop },
  { id: "professional", name: "Professional", icon: Briefcase },
  { id: "ats", name: "ATS Friendly", icon: Shield },
  { id: "creative", name: "Creative", icon: Image },
];

// Sample data for preview
const sampleData = {
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

const templates = [
  {
    id: "celestial",
    name: "Celestial",
    description: "Soft neutral tones with refined typography for a sophisticated and professional feel.",
    category: ["all", "professional", "ats"],
    primaryColor: "#1e3a5f",
    layout: "classic",
  },
  {
    id: "galaxy",
    name: "Galaxy",
    description: "A visually striking resume template, perfect for illustrating the breadth and depth of your expertise.",
    category: ["all", "modern"],
    primaryColor: "#2563eb",
    layout: "modern",
  },
  {
    id: "astral",
    name: "Astral",
    description: "Includes a prominent profile image for a personal touch while maintaining professionalism.",
    category: ["all", "professional", "creative"],
    primaryColor: "#57534e",
    layout: "sidebar",
  },
  {
    id: "nova",
    name: "Nova",
    description: "Clean and minimal design optimized for ATS systems with maximum readability.",
    category: ["all", "simple", "ats"],
    primaryColor: "#374151",
    layout: "minimal",
  },
  {
    id: "orbit",
    name: "Orbit",
    description: "Modern layout with creative elements that stand out while remaining professional.",
    category: ["all", "modern", "creative"],
    primaryColor: "#dc2626",
    layout: "bold",
  },
  {
    id: "stellar",
    name: "Stellar",
    description: "Bold typography and structured sections for maximum impact and clarity.",
    category: ["all", "simple", "ats"],
    primaryColor: "#059669",
    layout: "classic",
  },
  {
    id: "aurora",
    name: "Aurora",
    description: "Elegant gradient accents with a modern sidebar layout for creative professionals.",
    category: ["all", "modern", "creative"],
    primaryColor: "#8b5cf6",
    layout: "sidebar",
  },
  {
    id: "zenith",
    name: "Zenith",
    description: "Minimalist design with strong visual hierarchy, perfect for executives and leaders.",
    category: ["all", "professional"],
    primaryColor: "#0891b2",
    layout: "executive",
  },
  {
    id: "pulse",
    name: "Pulse",
    description: "Dynamic and energetic layout ideal for marketing and creative roles.",
    category: ["all", "modern", "creative"],
    primaryColor: "#f97316",
    layout: "modern",
  },
  {
    id: "classic",
    name: "Classic",
    description: "Timeless traditional format trusted by hiring managers across all industries.",
    category: ["all", "simple", "ats", "professional"],
    primaryColor: "#1f2937",
    layout: "classic",
  },
  {
    id: "metro",
    name: "Metro",
    description: "Clean lines and organized sections inspired by modern urban design.",
    category: ["all", "professional", "modern"],
    primaryColor: "#0d9488",
    layout: "minimal",
  },
  {
    id: "bold",
    name: "Bold",
    description: "Statement-making design with strong typography for confident professionals.",
    category: ["all", "modern", "creative"],
    primaryColor: "#be185d",
    layout: "bold",
  },
  {
    id: "harvard",
    name: "Harvard",
    description: "The gold standard resume format used by Harvard Business School. Clean, professional, and universally accepted.",
    category: ["all", "professional", "ats", "simple"],
    primaryColor: "#1e1e1e",
    layout: "harvard",
  },
];

function ResumeTemplateCard({ template, onUseTemplate }: { template: typeof templates[0]; onUseTemplate: (templateId: string) => void }) {
  const color = template.primaryColor;
  
  // Render different layouts based on template type
  const renderPreviewContent = () => {
    switch (template.layout) {
      case "sidebar":
        return (
          <div className="flex h-full">
            {/* Left Sidebar */}
            <div className="w-[35%] p-2" style={{ backgroundColor: color }}>
              <div className="h-8 w-8 mx-auto rounded-full bg-white/30 mb-2" />
              <div className="text-center mb-3">
                <p className="text-[6px] font-bold text-white truncate">{sampleData.name}</p>
                <p className="text-[4px] text-white/80 truncate">{sampleData.title}</p>
              </div>
              <div className="space-y-2">
                <div>
                  <p className="text-[4px] font-bold text-white/90 uppercase mb-1">Contact</p>
                  <p className="text-[3px] text-white/70 truncate">{sampleData.email}</p>
                  <p className="text-[3px] text-white/70">{sampleData.phone}</p>
                </div>
                <div>
                  <p className="text-[4px] font-bold text-white/90 uppercase mb-1">Skills</p>
                  <div className="space-y-0.5">
                    {sampleData.skills.slice(0, 4).map((skill, i) => (
                      <p key={i} className="text-[3px] text-white/70">{skill}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Right Content */}
            <div className="flex-1 p-2 bg-white">
              <div className="mb-2">
                <p className="text-[4px] font-bold uppercase mb-1" style={{ color }}>Experience</p>
                {sampleData.experience.map((exp, i) => (
                  <div key={i} className="mb-1">
                    <p className="text-[4px] font-semibold text-zinc-800">{exp.title}</p>
                    <p className="text-[3px] text-zinc-500">{exp.company} • {exp.date}</p>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-[4px] font-bold uppercase mb-1" style={{ color }}>Education</p>
                <p className="text-[4px] font-semibold text-zinc-800">{sampleData.education.degree}</p>
                <p className="text-[3px] text-zinc-500">{sampleData.education.school}</p>
              </div>
            </div>
          </div>
        );
      
      case "modern":
        return (
          <div className="h-full bg-white p-3">
            {/* Header with accent */}
            <div className="mb-2 pb-2" style={{ borderBottom: `2px solid ${color}` }}>
              <p className="text-[8px] font-bold text-zinc-800">{sampleData.name}</p>
              <p className="text-[5px] font-medium" style={{ color }}>{sampleData.title}</p>
              <div className="flex gap-2 mt-1">
                <p className="text-[3px] text-zinc-500">{sampleData.email}</p>
                <p className="text-[3px] text-zinc-500">{sampleData.phone}</p>
              </div>
            </div>
            {/* Two column layout */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-[4px] font-bold uppercase mb-1" style={{ color }}>Experience</p>
                {sampleData.experience.map((exp, i) => (
                  <div key={i} className="mb-1.5">
                    <p className="text-[4px] font-semibold text-zinc-800">{exp.title}</p>
                    <p className="text-[3px] text-zinc-600">{exp.company}</p>
                    <p className="text-[3px] text-zinc-400">{exp.date}</p>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-[4px] font-bold uppercase mb-1" style={{ color }}>Skills</p>
                <div className="flex flex-wrap gap-0.5">
                  {sampleData.skills.map((skill, i) => (
                    <span key={i} className="text-[3px] px-1 py-0.5 rounded" style={{ backgroundColor: `${color}15`, color }}>{skill}</span>
                  ))}
                </div>
                <p className="text-[4px] font-bold uppercase mt-2 mb-1" style={{ color }}>Education</p>
                <p className="text-[3px] font-semibold text-zinc-800">{sampleData.education.degree}</p>
                <p className="text-[3px] text-zinc-500">{sampleData.education.school}</p>
              </div>
            </div>
          </div>
        );
      
      case "bold":
        return (
          <div className="h-full bg-white">
            {/* Bold header */}
            <div className="p-3 text-white" style={{ backgroundColor: color }}>
              <p className="text-[9px] font-black uppercase tracking-wide">{sampleData.name}</p>
              <p className="text-[5px] font-medium opacity-90">{sampleData.title}</p>
            </div>
            <div className="p-2">
              <div className="flex gap-3 mb-2 text-[3px] text-zinc-500">
                <span>{sampleData.email}</span>
                <span>{sampleData.phone}</span>
              </div>
              <div className="mb-2">
                <p className="text-[5px] font-black uppercase mb-1" style={{ color }}>Experience</p>
                {sampleData.experience.map((exp, i) => (
                  <div key={i} className="mb-1">
                    <p className="text-[4px] font-bold text-zinc-800">{exp.title}</p>
                    <p className="text-[3px] text-zinc-500">{exp.company} | {exp.date}</p>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-[5px] font-black uppercase mb-1" style={{ color }}>Skills</p>
                <div className="flex flex-wrap gap-0.5">
                  {sampleData.skills.slice(0, 4).map((skill, i) => (
                    <span key={i} className="text-[3px] px-1 py-0.5 bg-zinc-100 rounded font-medium">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      
      case "minimal":
        return (
          <div className="h-full bg-white p-3">
            <div className="text-center mb-2">
              <p className="text-[8px] font-semibold text-zinc-800">{sampleData.name}</p>
              <p className="text-[4px] text-zinc-500">{sampleData.title}</p>
              <div className="flex justify-center gap-2 mt-1 text-[3px] text-zinc-400">
                <span>{sampleData.email}</span>
                <span>•</span>
                <span>{sampleData.phone}</span>
              </div>
            </div>
            <div className="border-t border-zinc-200 pt-2 mb-2">
              <p className="text-[4px] font-semibold text-zinc-700 uppercase tracking-wide mb-1">Experience</p>
              {sampleData.experience.map((exp, i) => (
                <div key={i} className="mb-1 flex justify-between">
                  <div>
                    <p className="text-[4px] font-medium text-zinc-800">{exp.title}</p>
                    <p className="text-[3px] text-zinc-500">{exp.company}</p>
                  </div>
                  <p className="text-[3px] text-zinc-400">{exp.date}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-zinc-200 pt-2">
              <p className="text-[4px] font-semibold text-zinc-700 uppercase tracking-wide mb-1">Skills</p>
              <p className="text-[3px] text-zinc-600">{sampleData.skills.join(" • ")}</p>
            </div>
          </div>
        );
      
      case "executive":
        return (
          <div className="h-full bg-white p-3">
            <div className="border-b-2 pb-2 mb-2" style={{ borderColor: color }}>
              <p className="text-[9px] font-bold text-zinc-800 tracking-tight">{sampleData.name}</p>
              <p className="text-[5px] font-medium text-zinc-600">{sampleData.title}</p>
            </div>
            <div className="flex gap-3 mb-2 text-[3px] text-zinc-500">
              <span>{sampleData.location}</span>
              <span>{sampleData.email}</span>
              <span>{sampleData.phone}</span>
            </div>
            <div className="mb-2">
              <p className="text-[3px] text-zinc-600 leading-relaxed">{sampleData.summary}</p>
            </div>
            <div className="mb-2">
              <p className="text-[4px] font-bold uppercase mb-1" style={{ color }}>Professional Experience</p>
              {sampleData.experience.map((exp, i) => (
                <div key={i} className="mb-1">
                  <div className="flex justify-between">
                    <p className="text-[4px] font-semibold text-zinc-800">{exp.title}</p>
                    <p className="text-[3px] text-zinc-500">{exp.date}</p>
                  </div>
                  <p className="text-[3px] text-zinc-600">{exp.company}</p>
                </div>
              ))}
            </div>
          </div>
        );
      
      case "harvard":
        return (
          <div className="h-full bg-white p-3">
            {/* Harvard Header - Name centered, contact below */}
            <div className="text-center mb-2 pb-1 border-b border-zinc-900">
              <p className="text-[10px] font-bold text-zinc-900 tracking-wide">{sampleData.name}</p>
              <div className="flex justify-center gap-2 mt-0.5 text-[3px] text-zinc-600">
                <span>{sampleData.location}</span>
                <span>|</span>
                <span>{sampleData.phone}</span>
                <span>|</span>
                <span>{sampleData.email}</span>
              </div>
            </div>
            {/* Education Section - Harvard style puts education first */}
            <div className="mb-2">
              <p className="text-[4px] font-bold text-zinc-900 uppercase tracking-wider border-b border-zinc-300 pb-0.5 mb-1">Education</p>
              <div className="flex justify-between">
                <div>
                  <p className="text-[4px] font-bold text-zinc-800">{sampleData.education.school}</p>
                  <p className="text-[3px] text-zinc-600 italic">{sampleData.education.degree}</p>
                </div>
                <p className="text-[3px] text-zinc-600">{sampleData.education.date}</p>
              </div>
            </div>
            {/* Experience Section */}
            <div className="mb-2">
              <p className="text-[4px] font-bold text-zinc-900 uppercase tracking-wider border-b border-zinc-300 pb-0.5 mb-1">Experience</p>
              {sampleData.experience.map((exp, i) => (
                <div key={i} className="mb-1">
                  <div className="flex justify-between">
                    <p className="text-[4px] font-bold text-zinc-800">{exp.company}</p>
                    <p className="text-[3px] text-zinc-600">{exp.date}</p>
                  </div>
                  <p className="text-[3px] text-zinc-600 italic">{exp.title}</p>
                </div>
              ))}
            </div>
            {/* Skills Section */}
            <div>
              <p className="text-[4px] font-bold text-zinc-900 uppercase tracking-wider border-b border-zinc-300 pb-0.5 mb-1">Additional</p>
              <p className="text-[3px] text-zinc-600"><span className="font-semibold">Skills:</span> {sampleData.skills.join(", ")}</p>
            </div>
          </div>
        );
      
      case "classic":
      default:
        return (
          <div className="h-full bg-white p-3" style={{ borderTop: `3px solid ${color}` }}>
            <div className="text-center mb-2">
              <p className="text-[8px] font-bold uppercase tracking-wide" style={{ color }}>{sampleData.name}</p>
              <p className="text-[4px] text-zinc-600">{sampleData.title}</p>
              <div className="flex justify-center gap-2 mt-1 text-[3px] text-zinc-500">
                <span>{sampleData.email}</span>
                <span>|</span>
                <span>{sampleData.phone}</span>
                <span>|</span>
                <span>{sampleData.location}</span>
              </div>
            </div>
            <div className="mb-2">
              <p className="text-[4px] font-bold uppercase border-b pb-0.5 mb-1" style={{ color, borderColor: color }}>Experience</p>
              {sampleData.experience.map((exp, i) => (
                <div key={i} className="mb-1">
                  <div className="flex justify-between">
                    <p className="text-[4px] font-semibold text-zinc-800">{exp.title}</p>
                    <p className="text-[3px] text-zinc-500">{exp.date}</p>
                  </div>
                  <p className="text-[3px] text-zinc-600">{exp.company}</p>
                </div>
              ))}
            </div>
            <div className="mb-2">
              <p className="text-[4px] font-bold uppercase border-b pb-0.5 mb-1" style={{ color, borderColor: color }}>Education</p>
              <p className="text-[4px] font-semibold text-zinc-800">{sampleData.education.degree}</p>
              <p className="text-[3px] text-zinc-600">{sampleData.education.school} • {sampleData.education.date}</p>
            </div>
            <div>
              <p className="text-[4px] font-bold uppercase border-b pb-0.5 mb-1" style={{ color, borderColor: color }}>Skills</p>
              <div className="flex flex-wrap gap-0.5">
                {sampleData.skills.map((skill, i) => (
                  <span key={i} className="text-[3px] px-1 py-0.5 bg-zinc-100 rounded">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="group"
    >
      {/* Template Preview Card */}
      <div className="relative aspect-3/4 overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm transition-all duration-300 group-hover:shadow-xl group-hover:border-zinc-300">
        {/* Resume Preview with Sample Content */}
        <div className="absolute inset-0">
          {renderPreviewContent()}
        </div>

        {/* Hover Overlay with Use Template Button */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Button 
            onClick={() => onUseTemplate(template.id)}
            className="transform scale-95 transition-transform duration-300 group-hover:scale-100"
            size="lg"
          >
            <FileText className="mr-2 h-4 w-4" />
            Use this template
          </Button>
        </div>

        {/* Template name badge */}
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between border-t border-zinc-100 bg-white/95 px-3 py-2 backdrop-blur-sm">
          <span className="text-xs font-medium text-zinc-700">{template.name}</span>
          <div 
            className="h-4 w-4 rounded-full border border-zinc-200" 
            style={{ backgroundColor: template.primaryColor }}
          />
        </div>
      </div>

      {/* Template Info */}
      <div className="mt-4">
        <h3 className="font-display text-lg font-semibold text-zinc-900">{template.name}</h3>
        <p className="mt-1 text-sm text-zinc-600 leading-relaxed">{template.description}</p>
      </div>
    </motion.div>
  );
}

export default function ResumeTemplatesPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const router = useRouter();

  const handleUseTemplate = (templateId: string) => {
    // Store the selected template in localStorage and navigate to section page
    localStorage.setItem('selectedTemplateId', templateId);
    router.push('/resume/section');
  };

  const filteredTemplates = templates.filter((template) =>
    template.category.includes(activeCategory)
  );

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Stepper */}
      <div className="border-b border-zinc-100 bg-white py-4">
        <div className="mx-auto flex max-w-4xl items-center justify-center gap-4 px-4">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-900 text-xs font-medium text-white">
              1
            </span>
            <span className="text-sm font-medium text-zinc-900">Choose template</span>
          </div>
          <div className="h-px w-8 bg-zinc-200" />
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-200 text-xs font-medium text-zinc-500">
              2
            </span>
            <span className="text-sm text-zinc-500">Enter your details</span>
          </div>
          <div className="h-px w-8 bg-zinc-200" />
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-200 text-xs font-medium text-zinc-500">
              3
            </span>
            <span className="text-sm text-zinc-500">Download resume</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="py-12 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-4xl font-bold text-zinc-900 sm:text-5xl"
        >
          Resume templates
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mx-auto mt-4 max-w-xl text-base text-zinc-600"
        >
          Simple to use and ready in minutes resume templates — give it a try for free now!
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Link
            href="/"
            className="mt-2 inline-block text-sm font-medium text-sky-500 hover:text-sky-600 hover:underline"
          >
            Choose later
          </Link>
        </motion.div>
      </div>

      {/* Category Tabs */}
      <div className="border-b border-zinc-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
            <TabsList className="flex h-auto w-full justify-start gap-1 overflow-x-auto bg-transparent p-0 sm:justify-center">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="flex items-center gap-2 rounded-none border-0 border-b-2 border-transparent px-4 py-3 text-sm font-medium text-zinc-500 transition-all data-[state=active]:border-b-zinc-900 data-[state=active]:text-zinc-900 hover:text-zinc-900 shadow-none"
                >
                  <category.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{category.name}</span>
                  <span className="sm:hidden">{category.name.split(" ")[0]}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTemplates.map((template) => (
            <ResumeTemplateCard 
              key={template.id} 
              template={template} 
              onUseTemplate={handleUseTemplate}
            />
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-zinc-500">No templates found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}

