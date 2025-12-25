
"use client";

import { useState } from "react";
import { FileText, Download, Eye, Clock, Plus } from "lucide-react";
import { CreateResumeCard } from "@/components/dashboard/create-resume-card";
import { ResumeCard } from "@/components/dashboard/resume-card";
import { StatsCard } from "@/components/dashboard/stats-card";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { TipsCard } from "@/components/dashboard/tips-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Mock data - replace with real data from your database
const mockResumes: Array<{
  id: string;
  title: string;
  updatedAt: string;
  template: string;
}> = [];

// Example with resumes:
// const mockResumes = [
//   { id: "1", title: "Software Engineer Resume", updatedAt: "2 hours ago", template: "Professional" },
//   { id: "2", title: "Product Manager CV", updatedAt: "Yesterday", template: "Modern" },
//   { id: "3", title: "Marketing Specialist", updatedAt: "3 days ago", template: "Creative" },
// ];

export default function Dashboard() {
  const [resumes] = useState(mockResumes);
  const hasResumes = resumes.length > 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground lg:text-3xl">
            Welcome back! 👋
          </h1>
          <p className="text-muted-foreground">
            {hasResumes
              ? "Continue working on your resumes or create a new one."
              : "Get started by creating your first resume."}
          </p>
        </div>
        {hasResumes && (
          <Button asChild>
            <Link href="/resume/templates">
              <Plus className="h-4 w-4" />
              New Resume
            </Link>
          </Button>
        )}
      </div>

      {/* Stats - Only show if user has resumes */}
      {hasResumes && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Resumes"
            value={resumes.length}
            description="Documents created"
            icon={FileText}
          />
          <StatsCard
            title="Downloads"
            value={12}
            description="All time"
            icon={Download}
            trend={{ value: 15, isPositive: true }}
          />
          <StatsCard
            title="Views"
            value={48}
            description="Resume views"
            icon={Eye}
            trend={{ value: 8, isPositive: true }}
          />
          <StatsCard
            title="Last Activity"
            value="2h ago"
            description="Recent update"
            icon={Clock}
          />
        </div>
      )}

      {/* Quick Actions */}
      <QuickActions />

      {/* Resume Tips */}
      <TipsCard />

      {/* Recent Resumes Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">
            {hasResumes ? "Recent Resumes" : "My Resumes"}
          </h2>
          {hasResumes && (
            <Link
              href="/dashboard/documents"
              className="text-sm text-foreground hover:underline"
            >
              View all
            </Link>
          )} 
        </div>

        {hasResumes ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {resumes.slice(0, 4).map((resume) => (
              <ResumeCard
                key={resume.id}
                id={resume.id}
                title={resume.title}
                updatedAt={resume.updatedAt}
                template={resume.template}
              />
            ))}
          </div>
        ) : (
          <CreateResumeCard />
        )}
      </div>

      {/* Getting Started - Only show if no resumes */}
      {!hasResumes && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">
            Getting Started
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-muted/10 dark:bg-muted/800">
                <span className="text-lg font-bold text-foreground">1</span>
              </div>
              <h3 className="font-medium text-foreground">Choose a Template</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Pick from our collection of professional, ATS-friendly resume templates.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-muted/10 dark:bg-muted/800">
                <span className="text-lg font-bold text-foreground">2</span>
              </div>
              <h3 className="font-medium text-foreground">Fill in Your Details</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Add your experience, skills, and education with our easy-to-use editor.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-muted/10 dark:bg-muted/800">
                <span className="text-lg font-bold text-foreground">3</span>
              </div>
              <h3 className="font-medium text-foreground">Download & Apply</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Export your resume as PDF and start applying to your dream jobs.
              </p>
            </div> 
          </div>
        </div>
      )}
    </div>
  );
}