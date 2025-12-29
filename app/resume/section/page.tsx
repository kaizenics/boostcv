'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { StepIndicator } from '@/components/resume/step-indicator';
import { ResumePreview } from '@/components/resume/resume-preview';
import { DownloadDialog } from '@/components/resume/download-dialog';
import {
  ContactsForm,
  ExperienceForm,
  EducationForm,
  SkillsForm,
  SummaryForm,
  FinalizeForm,
} from '@/components/resume/forms';
import {
  ResumeData,
  ResumeStep,
  RESUME_STEPS,
  createEmptyResumeData,
} from '@/lib/types/resume';
import { resumeTemplates } from '@/lib/resume-templates';
import { ArrowLeft, ArrowRight, Download, Eye, EyeOff } from 'lucide-react';

export default function ResumeSectionPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<ResumeStep>('contacts');
  const [completedSteps, setCompletedSteps] = useState<ResumeStep[]>([]);
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [showPreview, setShowPreview] = useState(true);
  const [showDownloadDialog, setShowDownloadDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get the selected template from localStorage
    const templateId = localStorage.getItem('selectedTemplateId');
    
    if (!templateId) {
      // No template selected, redirect to templates page
      router.push('/resume/templates');
      return;
    }

    // Check if template exists
    const template = resumeTemplates.find((t) => t.id === templateId);
    if (!template) {
      router.push('/resume/templates');
      return;
    }

    // Check if there's existing resume data in localStorage
    const savedData = localStorage.getItem('resumeData');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        if (parsed.templateId === templateId) {
          setResumeData(parsed);
        } else {
          setResumeData(createEmptyResumeData(templateId));
        }
      } catch {
        setResumeData(createEmptyResumeData(templateId));
      }
    } else {
      setResumeData(createEmptyResumeData(templateId));
    }

    setIsLoading(false);
  }, [router]);

  // Auto-save to localStorage
  useEffect(() => {
    if (resumeData) {
      localStorage.setItem('resumeData', JSON.stringify(resumeData));
    }
  }, [resumeData]);

  if (isLoading || !resumeData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your resume...</p>
        </div>
      </div>
    );
  }

  const currentStepIndex = RESUME_STEPS.findIndex((s) => s.id === currentStep);
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === RESUME_STEPS.length - 1;

  const goToNextStep = () => {
    if (!isLastStep) {
      // Mark current step as completed
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep]);
      }
      setCurrentStep(RESUME_STEPS[currentStepIndex + 1].id);
    }
  };

  const goToPreviousStep = () => {
    if (!isFirstStep) {
      setCurrentStep(RESUME_STEPS[currentStepIndex - 1].id);
    }
  };

  const handleStepClick = (step: ResumeStep) => {
    setCurrentStep(step);
  };

  const renderCurrentForm = () => {
    switch (currentStep) {
      case 'contacts':
        return (
          <ContactsForm
            data={resumeData.contact}
            onChange={(contact) => setResumeData({ ...resumeData, contact })}
          />
        );
      case 'experience':
        return (
          <ExperienceForm
            data={resumeData.experiences}
            onChange={(experiences) => setResumeData({ ...resumeData, experiences })}
          />
        );
      case 'education':
        return (
          <EducationForm
            data={resumeData.educations}
            onChange={(educations) => setResumeData({ ...resumeData, educations })}
          />
        );
      case 'skills':
        return (
          <SkillsForm
            data={resumeData.skills}
            onChange={(skills) => setResumeData({ ...resumeData, skills })}
          />
        );
      case 'summary':
        return (
          <SummaryForm
            data={resumeData.summary}
            onChange={(summary) => setResumeData({ ...resumeData, summary })}
          />
        );
      case 'finalize':
        return (
          <FinalizeForm
            data={resumeData.finalize}
            onChange={(finalize) => setResumeData({ ...resumeData, finalize })}
          />
        );
      default:
        return null;
    }
  };

  const getNextButtonLabel = () => {
    if (isLastStep) {
      return 'Download Resume';
    }
    return `${RESUME_STEPS[currentStepIndex + 1].label}`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <div className="px-4 py-6">
        <div className="flex gap-6">
          {/* Form Section with Header and Navigation */}
          <div className={`flex-1 ${showPreview ? 'lg:max-w-[55%]' : ''} pb-24`}>
            {/* Step Indicator - Form Section Only */}
            <div className="bg-background border rounded-lg shadow-sm mb-4 p-4">
              <StepIndicator
                currentStep={currentStep}
                completedSteps={completedSteps}
                onStepClick={handleStepClick}
              />
            </div>

            {/* Form Content */}
            <div className="bg-background rounded-lg border p-6 mb-4">
              {renderCurrentForm()}
            </div>

            {/* Bottom Navigation - Fixed at Bottom of Form Section */}
            <div className={`fixed bottom-0 left-0 bg-background p-4 z-30 ${showPreview ? 'lg:w-[calc(55%-1.5rem)]' : 'w-full'}`}>
              <div className="flex items-center justify-between px-4">
                <Button
                  variant="outline"
                  onClick={goToPreviousStep}
                  disabled={isFirstStep}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>

                <div className="flex items-center gap-2">
                  {/* Toggle Preview Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPreview(!showPreview)}
                    className="hidden lg:flex"
                  >
                    {showPreview ? (
                      <>
                        <EyeOff className="mr-2 h-4 w-4" />
                        Hide Preview
                      </>
                    ) : (
                      <>
                        <Eye className="mr-2 h-4 w-4" />
                        Show Preview
                      </>
                    )}
                  </Button>

                  {/* Next/Download Button */}
                  {isLastStep ? (
                    <Button onClick={() => router.push('/resume/final-resume')}>
                      <Download className="mr-2 h-4 w-4" />
                      Download Resume
                    </Button>
                  ) : (
                    <Button onClick={goToNextStep}>
                      {getNextButtonLabel()}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Preview Section - Independent */}
          {showPreview && (
            <div className="hidden lg:block lg:w-[45%] sticky top-6 self-start">
              <ResumePreview data={resumeData} className="max-h-[calc(100vh-48px)] overflow-auto" />
            </div>
          )}
        </div>
      </div>

      {/* Download Dialog */}
      <DownloadDialog
        data={resumeData}
        isOpen={showDownloadDialog}
        onClose={() => setShowDownloadDialog(false)}
      />
    </div>
  );
}
