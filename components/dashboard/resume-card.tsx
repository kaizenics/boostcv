"use client";

import { FileText, MoreVertical, Download, Trash2, Edit3, Copy, Eye } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ResumeCardProps {
  id: string;
  title: string;
  updatedAt: string;
  template: string;
}

export function ResumeCard({ id, title, updatedAt, template }: ResumeCardProps) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="group relative rounded-xl border border-border bg-card p-4 transition-all hover:shadow-md">
      {/* Preview Thumbnail */}
      <div className="mb-4 flex h-40 items-center justify-center rounded-lg bg-muted/50">
        <FileText className="h-12 w-12 text-muted-foreground/50" />
      </div>

      {/* Content */}
      <div className="space-y-1">
        <h3 className="font-medium text-foreground line-clamp-1">{title}</h3>
        <p className="text-xs text-muted-foreground">
          Updated {updatedAt}
        </p>
        <p className="text-xs text-muted-foreground">
          Template: {template}
        </p>
      </div>

      {/* Actions */}
      <div className="absolute right-2 top-2">
        <div className="relative">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setShowMenu(!showMenu)}
            className="opacity-0 transition-opacity group-hover:opacity-100"
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
          
          {showMenu && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setShowMenu(false)} 
              />
              <div className="absolute right-0 top-full z-20 mt-1 w-40 rounded-lg border border-border bg-popover p-1 shadow-lg">
                <button className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted/10">
                  <Eye className="h-4 w-4" />
                  Preview
                </button>
                <button className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted/10">
                  <Edit3 className="h-4 w-4" />
                  Edit
                </button>
                <button className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted/10">
                  <Copy className="h-4 w-4" />
                  Duplicate
                </button>
                <button className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted/10">
                  <Download className="h-4 w-4" />
                  Download
                </button>
                <button className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-muted/10">
                  <Trash2 className="h-4 w-4" />
                  Delete
                </button> 
              </div>
            </>
          )}
        </div>
      </div>

      {/* Hover overlay */}
      <Link
        href={`/resume/${id}`}
        className="absolute inset-0 z-0 rounded-xl"
        aria-label={`Edit ${title}`}
      />
    </div>
  );
}
