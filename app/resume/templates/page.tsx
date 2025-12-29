"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Star, Laptop, FileText, Image, Briefcase, Shield, LayoutGrid } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const categories = [
  { id: "all", name: "All Templates", icon: LayoutGrid },
  { id: "simple", name: "Simple", icon: Star },
  { id: "modern", name: "Modern", icon: Laptop },
  { id: "one-column", name: "One column", icon: FileText },
  { id: "with-photo", name: "With photo", icon: Image },
  { id: "professional", name: "Professional", icon: Briefcase },
  { id: "ats", name: "ATS", icon: Shield },
];

const templates = [
  {
    id: "celestial",
    name: "Celestial",
    description: "Soft neutral tones with refined typography for a sophisticated and professional feel.",
    category: ["all", "simple", "professional"],
    colors: ["#f5f5f5", "#1a1a1a", "#1e3a5f", "#2563eb", "#14b8a6"],
    layout: "two-column",
    hasPhoto: false,
  },
  {
    id: "galaxy",
    name: "Galaxy",
    description: "A visually striking resume template, perfect for illustrating the breadth and depth of your expertise.",
    category: ["all", "modern", "one-column"],
    colors: ["#f5f5f5", "#e0f2fe", "#bfdbfe", "#fef3c7", "#fde68a"],
    layout: "one-column",
    hasPhoto: false,
  },
  {
    id: "astral",
    name: "Astral",
    description: "Includes a prominent profile image for a personal touch while maintaining professionalism.",
    category: ["all", "with-photo", "professional"],
    colors: ["#e5e5e5", "#d4d4d4", "#a3a3a3", "#78716c", "#57534e"],
    layout: "two-column",
    hasPhoto: true,
  },
  {
    id: "nova",
    name: "Nova",
    description: "Clean and minimal design optimized for ATS systems with maximum readability.",
    category: ["all", "simple", "ats"],
    colors: ["#ffffff", "#f5f5f5", "#e5e5e5", "#d4d4d4", "#a3a3a3"],
    layout: "one-column",
    hasPhoto: false,
  },
  {
    id: "orbit",
    name: "Orbit",
    description: "Modern layout with creative elements that stand out while remaining professional.",
    category: ["all", "modern", "professional"],
    colors: ["#fef2f2", "#fee2e2", "#fecaca", "#fca5a5", "#f87171"],
    layout: "two-column",
    hasPhoto: false,
  },
  {
    id: "stellar",
    name: "Stellar",
    description: "Bold typography and structured sections for maximum impact and clarity.",
    category: ["all", "simple", "one-column", "ats"],
    colors: ["#f0fdf4", "#dcfce7", "#bbf7d0", "#86efac", "#4ade80"],
    layout: "one-column",
    hasPhoto: false,
  },
];

function ResumeTemplateCard({ template, onUseTemplate }: { template: typeof templates[0]; onUseTemplate: (templateId: string) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="group"
    >
      {/* Template Preview Card */}
      <div className="relative aspect-3/4 overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm transition-all duration-300 group-hover:shadow-xl group-hover:border-zinc-300">
        {/* Resume Preview */}
        <div className="absolute inset-0 p-4 sm:p-6">
          {template.hasPhoto ? (
            // With photo layout
            <div className="flex gap-4">
              <div className="h-16 w-16 rounded-lg bg-zinc-200" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-3/4 rounded bg-zinc-800" />
                <div className="h-2 w-1/2 rounded bg-zinc-400" />
                <div className="h-2 w-2/3 rounded bg-zinc-300" />
              </div>
            </div>
          ) : (
            // Standard layout
            <div className="space-y-2">
              <div className="h-4 w-2/3 rounded bg-zinc-800" />
              <div className="h-2 w-1/2 rounded bg-zinc-400" />
            </div>
          )}

          {/* Content sections */}
          <div className={`mt-6 ${template.layout === "two-column" ? "grid grid-cols-3 gap-4" : "space-y-4"}`}>
            {template.layout === "two-column" ? (
              <>
                {/* Left column */}
                <div className="col-span-1 space-y-4">
                  <div className="space-y-2">
                    <div className="h-2 w-full rounded bg-zinc-200" />
                    <div className="h-1.5 w-4/5 rounded bg-zinc-100" />
                    <div className="h-1.5 w-3/5 rounded bg-zinc-100" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 w-full rounded bg-zinc-200" />
                    <div className="h-1.5 w-full rounded bg-zinc-100" />
                    <div className="h-1.5 w-4/5 rounded bg-zinc-100" />
                  </div>
                </div>
                {/* Right column */}
                <div className="col-span-2 space-y-4">
                  <div className="space-y-2">
                    <div className="h-2 w-1/3 rounded bg-zinc-300" />
                    <div className="h-1.5 w-full rounded bg-zinc-100" />
                    <div className="h-1.5 w-full rounded bg-zinc-100" />
                    <div className="h-1.5 w-4/5 rounded bg-zinc-100" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 w-1/4 rounded bg-zinc-300" />
                    <div className="h-1.5 w-full rounded bg-zinc-100" />
                    <div className="h-1.5 w-5/6 rounded bg-zinc-100" />
                    <div className="h-1.5 w-full rounded bg-zinc-100" />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <div className="h-2 w-1/4 rounded bg-zinc-300" />
                  <div className="h-1.5 w-full rounded bg-zinc-100" />
                  <div className="h-1.5 w-full rounded bg-zinc-100" />
                  <div className="h-1.5 w-4/5 rounded bg-zinc-100" />
                </div>
                <div className="space-y-2">
                  <div className="h-2 w-1/3 rounded bg-zinc-300" />
                  <div className="h-1.5 w-full rounded bg-zinc-100" />
                  <div className="h-1.5 w-5/6 rounded bg-zinc-100" />
                </div>
                <div className="space-y-2">
                  <div className="h-2 w-1/4 rounded bg-zinc-300" />
                  <div className="flex flex-wrap gap-1">
                    <div className="h-3 w-10 rounded bg-zinc-100" />
                    <div className="h-3 w-8 rounded bg-zinc-100" />
                    <div className="h-3 w-12 rounded bg-zinc-100" />
                  </div>
                </div>
              </>
            )}
          </div>
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

        {/* Bottom bar */}
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between border-t border-zinc-100 bg-white/90 px-3 py-2 backdrop-blur-sm">
          {/* Color options */}
          <div className="flex gap-1">
            {template.colors.map((color, idx) => (
              <button
                key={idx}
                className="h-5 w-5 rounded-full border border-zinc-200 transition-transform hover:scale-110"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          {/* Download buttons */}
          <div className="flex gap-1">
            <button className="rounded bg-zinc-100 px-2 py-0.5 text-[10px] font-medium text-zinc-600 hover:bg-zinc-200">
              PDF
            </button>
            <button className="rounded bg-zinc-100 px-2 py-0.5 text-[10px] font-medium text-zinc-600 hover:bg-zinc-200">
              DOCX
            </button>
          </div>
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

