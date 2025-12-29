'use client';

import { ResumeStep, RESUME_STEPS } from '@/lib/types/resume';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: ResumeStep;
  completedSteps: ResumeStep[];
  onStepClick: (step: ResumeStep) => void;
}

export function StepIndicator({ currentStep, completedSteps, onStepClick }: StepIndicatorProps) {
  const currentIndex = RESUME_STEPS.findIndex((s) => s.id === currentStep);

  return (
    <div className="w-full">
      {/* Desktop view */}
      <div className="hidden md:flex items-center justify-between relative">
        {/* Progress line */}
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-border">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{
              width: `${(currentIndex / (RESUME_STEPS.length - 1)) * 100}%`,
            }}
          />
        </div>

        {RESUME_STEPS.map((step, index) => {
          const isCompleted = completedSteps.includes(step.id);
          const isCurrent = step.id === currentStep;
          const isPast = index < currentIndex;

          return (
            <button
              key={step.id}
              onClick={() => onStepClick(step.id)}
              className="relative z-10 flex flex-col items-center gap-2 group"
            >
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all border-2',
                  isCurrent
                    ? 'bg-primary text-primary-foreground border-primary'
                    : isCompleted || isPast
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background text-muted-foreground border-muted-foreground/30 group-hover:border-primary/50'
                )}
              >
                {isCompleted ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <span
                className={cn(
                  'text-xs font-medium whitespace-nowrap',
                  isCurrent
                    ? 'text-primary'
                    : isCompleted || isPast
                    ? 'text-foreground'
                    : 'text-muted-foreground'
                )}
              >
                {step.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Mobile view */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">
            Step {currentIndex + 1} of {RESUME_STEPS.length}
          </span>
          <span className="text-sm text-muted-foreground">
            {RESUME_STEPS[currentIndex].label}
          </span>
        </div>
        <div className="h-2 bg-border rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{
              width: `${((currentIndex + 1) / RESUME_STEPS.length) * 100}%`,
            }}
          />
        </div>
        <div className="flex justify-between mt-2">
          {RESUME_STEPS.map((step, index) => (
            <button
              key={step.id}
              onClick={() => onStepClick(step.id)}
              className={cn(
                'w-6 h-6 rounded-full flex items-center justify-center text-xs',
                index === currentIndex
                  ? 'bg-primary text-primary-foreground'
                  : index < currentIndex || completedSteps.includes(step.id)
                  ? 'bg-primary/20 text-primary'
                  : 'bg-muted text-muted-foreground'
              )}
            >
              {completedSteps.includes(step.id) ? (
                <Check className="h-3 w-3" />
              ) : (
                index + 1
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
