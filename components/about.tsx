"use client";

import { motion } from "motion/react";
import { Zap, Shield, Target, Users } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Create a professional resume in under 10 minutes with our intuitive builder.",
  },
  {
    icon: Shield,
    title: "ATS-Optimized",
    description: "Every resume passes through applicant tracking systems with flying colors.",
  },
  {
    icon: Target,
    title: "Tailored Content",
    description: "AI-powered suggestions help you highlight your most relevant experience.",
  },
  {
    icon: Users,
    title: "Trusted by Thousands",
    description: "Join 50,000+ professionals who landed their dream jobs using BoostCV.",
  },
];

const resumeTemplates = [
  {
    name: "Modern Pro",
    category: "Professional",
    color: "bg-zinc-900",
    accent: "bg-zinc-700",
  },
  {
    name: "Clean Minimal",
    category: "Minimalist",
    color: "bg-white",
    accent: "bg-zinc-200",
  },
  {
    name: "Executive",
    category: "Corporate",
    color: "bg-zinc-800",
    accent: "bg-zinc-600",
  },
  {
    name: "Creative Edge",
    category: "Creative",
    color: "bg-zinc-100",
    accent: "bg-zinc-400",
  },
  {
    name: "Tech Forward",
    category: "Technology",
    color: "bg-zinc-950",
    accent: "bg-zinc-700",
  },
  {
    name: "Classic",
    category: "Traditional",
    color: "bg-white",
    accent: "bg-zinc-300",
  },
];

function ResumeTemplateCard({ template }: { template: typeof resumeTemplates[0] }) {
  const isDark = template.color.includes("900") || template.color.includes("950") || template.color.includes("800");
  
  return (
    <div className="group cursor-pointer">
      <div className={`relative aspect-3/4 rounded-xl ${template.color} border border-zinc-200 shadow-lg overflow-hidden transition-all duration-300 group-hover:shadow-2xl group-hover:scale-[1.02]`}>
        {/* Resume Template Preview */}
        <div className="absolute inset-0 p-4 sm:p-6">
          {/* Header Section */}
          <div className="flex items-start gap-3">
            <div className={`h-10 w-10 sm:h-12 sm:w-12 rounded-lg ${template.accent}`} />
            <div className="flex-1 space-y-2">
              <div className={`h-3 w-3/4 rounded ${template.accent}`} />
              <div className={`h-2 w-1/2 rounded ${template.accent} opacity-60`} />
            </div>
          </div>
          
          {/* Content Lines */}
          <div className="mt-6 space-y-4">
            <div className="space-y-2">
              <div className={`h-2 w-1/3 rounded ${template.accent} opacity-80`} />
              <div className={`h-1.5 w-full rounded ${template.accent} opacity-40`} />
              <div className={`h-1.5 w-5/6 rounded ${template.accent} opacity-40`} />
              <div className={`h-1.5 w-4/5 rounded ${template.accent} opacity-40`} />
            </div>
            
            <div className="space-y-2">
              <div className={`h-2 w-1/4 rounded ${template.accent} opacity-80`} />
              <div className={`h-1.5 w-full rounded ${template.accent} opacity-40`} />
              <div className={`h-1.5 w-3/4 rounded ${template.accent} opacity-40`} />
            </div>
            
            <div className="space-y-2">
              <div className={`h-2 w-1/3 rounded ${template.accent} opacity-80`} />
              <div className="flex gap-1.5 flex-wrap">
                <div className={`h-4 w-12 rounded ${template.accent} opacity-50`} />
                <div className={`h-4 w-10 rounded ${template.accent} opacity-50`} />
                <div className={`h-4 w-14 rounded ${template.accent} opacity-50`} />
              </div>
            </div>
          </div>
        </div>
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-zinc-900/0 group-hover:bg-zinc-900/10 transition-colors duration-300" />
      </div>
      
      {/* Template Info */}
      <div className="mt-4 text-center">
        <h4 className="font-semibold text-zinc-900">{template.name}</h4>
        <p className="text-sm text-zinc-500">{template.category}</p>
      </div>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="relative bg-zinc-50 py-20 lg:py-32 font-sans">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="font-display text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl">
            Why choose BoostCV?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-zinc-600">
            We make resume building simple, fast, and effective. No fluff, just results.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group rounded-2xl border border-zinc-200 bg-white p-6 transition-all duration-300 hover:border-zinc-300 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 transition-colors group-hover:bg-zinc-900">
                <feature.icon className="h-6 w-6 text-zinc-600 transition-colors group-hover:text-white" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-zinc-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Resume Templates Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-24"
        >
          <div className="text-center mb-12">
            <h3 className="font-display text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
              Professional Templates
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-base text-zinc-600">
              Choose from our collection of beautifully designed, ATS-friendly templates.
            </p>
          </div>

          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {resumeTemplates.map((template, index) => (
                <CarouselItem key={index} className="pl-4 basis-1/2 sm:basis-1/3 lg:basis-1/4">
                  <ResumeTemplateCard template={template} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-2 mt-8">
              <CarouselPrevious className="static translate-y-0 bg-white border-zinc-200 hover:bg-zinc-50 hover:border-zinc-300" />
              <CarouselNext className="static translate-y-0 bg-white border-zinc-200 hover:bg-zinc-50 hover:border-zinc-300" />
            </div>
          </Carousel>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-24 rounded-2xl border border-zinc-200 bg-white p-8 sm:p-12"
        >
          <div className="grid gap-8 sm:grid-cols-3 text-center">
            <div>
              <p className="text-4xl sm:text-5xl font-black text-zinc-900">50K+</p>
              <p className="mt-2 text-sm text-zinc-600">Resumes Created</p>
            </div>
            <div className="border-y sm:border-y-0 sm:border-x border-zinc-200 py-8 sm:py-0">
              <p className="text-4xl sm:text-5xl font-black text-zinc-900">89%</p>
              <p className="mt-2 text-sm text-zinc-600">Interview Rate</p>
            </div>
            <div>
              <p className="text-4xl sm:text-5xl font-black text-zinc-900">4.9★</p>
              <p className="mt-2 text-sm text-zinc-600">User Rating</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
