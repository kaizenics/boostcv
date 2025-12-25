"use client";

import { useState } from "react";
import { FileText, Search, Filter, Grid, List, Plus, SortAsc } from "lucide-react";
import { CreateResumeCard } from "@/components/dashboard/create-resume-card";
import { ResumeCard } from "@/components/dashboard/resume-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Mock data - replace with real data from your database
const mockResumes: Array<{
  id: string;
  title: string;
  updatedAt: string;
  template: string;
  createdAt: Date;
}> = [];

// Example with resumes:
// const mockResumes = [
//   { id: "1", title: "Software Engineer Resume", updatedAt: "2 hours ago", template: "Professional", createdAt: new Date() },
//   { id: "2", title: "Product Manager CV", updatedAt: "Yesterday", template: "Modern", createdAt: new Date() },
//   { id: "3", title: "Marketing Specialist", updatedAt: "3 days ago", template: "Creative", createdAt: new Date() },
//   { id: "4", title: "Data Analyst Resume", updatedAt: "1 week ago", template: "Minimal", createdAt: new Date() },
//   { id: "5", title: "UX Designer Portfolio", updatedAt: "2 weeks ago", template: "Creative", createdAt: new Date() },
// ];

type ViewMode = "grid" | "list";

export default function DocumentsPage() {
  const [resumes] = useState(mockResumes);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const hasResumes = resumes.length > 0;

  const filteredResumes = resumes.filter((resume) =>
    resume.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground lg:text-3xl">
            Documents
          </h1>
          <p className="text-muted-foreground">
            Manage all your resumes and cover letters in one place.
          </p>
        </div>
        <Button asChild>
          <Link href="/resume/templates">
            <Plus className="h-4 w-4" />
            New Resume
          </Link>
        </Button>
      </div>

      {/* Toolbar */}
      {hasResumes && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <SortAsc className="h-4 w-4" />
              Sort
            </Button>
            <div className="flex items-center rounded-lg border border-border p-1">
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => setViewMode("grid")}
                className={cn(
                  "h-7 w-7",
                  viewMode === "grid" && "bg-muted/10"
                )}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => setViewMode("list")}
                className={cn(
                  "h-7 w-7",
                  viewMode === "list" && "bg-muted/10"
                )}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      {hasResumes ? (
        <>
          {filteredResumes.length > 0 ? (
            <div
              className={cn(
                viewMode === "grid"
                  ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "space-y-3"
              )}
            >
              {filteredResumes.map((resume) => (
                viewMode === "grid" ? (
                  <ResumeCard
                    key={resume.id}
                    id={resume.id}
                    title={resume.title}
                    updatedAt={resume.updatedAt}
                    template={resume.template}
                  />
                ) : (
                  <div
                    key={resume.id}
                    className="flex items-center gap-4 rounded-lg border border-border bg-card p-4 transition-colors hover:bg-muted/10"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                      <FileText className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground truncate">
                        {resume.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {resume.template} • Updated {resume.updatedAt}
                      </p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/resume/${resume.id}`}>Edit</Link>
                    </Button>
                  </div>
                )
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="mt-4 font-medium text-foreground">No results found</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Try adjusting your search query
              </p>
            </div>
          )}
        </>
      ) : (
        <div className="space-y-6">
          <CreateResumeCard />
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <FileText className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="mt-4 font-medium text-foreground">No documents yet</h3>
            <p className="mt-1 text-sm text-muted-foreground max-w-sm">
              Create your first resume to get started. All your documents will appear here.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}