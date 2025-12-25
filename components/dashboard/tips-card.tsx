"use client";

import { Lightbulb, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const tips = [
  "Use action verbs like 'developed', 'managed', or 'created' to start your bullet points.",
  "Quantify your achievements with numbers and percentages when possible.",
  "Tailor your resume for each job application by matching keywords from the job description.",
  "Keep your resume to 1-2 pages maximum for most industries.",
  "Use a clean, ATS-friendly format to ensure your resume passes automated screening.",
];

export function TipsCard() {
  const [currentTip, setCurrentTip] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const nextTip = () => {
    setCurrentTip((prev) => (prev + 1) % tips.length);
  };

  return (
    <div className="relative rounded-xl border border-border bg-card p-4">
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => setDismissed(true)}
        className="absolute right-2 top-2 h-6 w-6 text-muted-foreground hover:bg-muted/10"
      >
        <X className="h-4 w-4" />
      </Button>
      <div className="flex gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted/10">
          <Lightbulb className="h-5 w-5 text-muted-foreground" />
        </div>
        <div className="space-y-2 pr-6">
          <p className="text-sm font-medium text-foreground">
            Resume Tip #{currentTip + 1}
          </p>
          <p className="text-sm text-muted-foreground">
            {tips[currentTip]}
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={nextTip}
            className="h-7 px-2 text-xs text-muted-foreground hover:bg-muted/10"
          >
            Next tip →
          </Button>
        </div>
      </div>
    </div>
  );
}
