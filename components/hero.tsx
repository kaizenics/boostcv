"use client";

import { motion } from "motion/react";
import Link from "next/link";
import DisplayCards from "@/components/ui/display-cards";

export function Hero() {
    return (
        <section className="relative flex min-h-250 md:min-h-screen items-center justify-center overflow-hidden bg-white dark:bg-zinc-950">
            <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
                <div className="grid gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-8 lg:items-center">
                    {/* Left Column - Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col justify-center"
                    >
                        {/* Main Heading */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-zinc-900 dark:text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl "
                        >
                            Professional resumes.{" "}
                            <span className="text-zinc-900 dark:text-white">
                                Completely free.
                            </span>
                        </motion.h1>

                        {/* Subheading */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="mt-4 sm:mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-zinc-600 dark:text-zinc-400"
                        >
                            Build professional resumes that get you noticed by hiring managers. Simple, powerful tools to accelerate your career success.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="mt-8 sm:mt-10 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4"
                        >
                            <Link href="/resume/templates">
                            <button className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100">
                                Create New Resume
                            </button>
                            </Link>
                            <Link href="/resume/templates">
                            <button className="inline-flex items-center justify-center rounded-xl border-2 border-zinc-200 bg-white px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold text-zinc-900 transition-all duration-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-transparent dark:text-zinc-100 dark:hover:bg-zinc-900">
                                Improve My Resume
                            </button>
                            </Link>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8"
                        >
                            <div className="flex flex-col">
                                <span className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white">48%</span>
                                <span className="mt-1 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">more likely to get hired</span>
                            </div>
                            <div className="hidden sm:block h-12 w-px bg-zinc-200 dark:bg-zinc-700" />
                            <div className="flex flex-col">
                                <span className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white">12%</span>
                                <span className="mt-1 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">better pay with your next job</span>
                            </div>
                        </motion.div>
                    </motion.div>

                    <div className="relative flex items-center justify-center mb-0 md:mb-20">
                        <DisplayCards />
                    </div>
                </div>

            </div>
        </section>
    );
}
