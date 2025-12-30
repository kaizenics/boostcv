'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { DownloadDialog } from '@/components/resume/download-dialog';
import { ResumePreview, DesignOptions, defaultDesignOptions } from '@/components/resume/resume-preview';
import { ResumeData } from '@/lib/types/resume';
import { resumeTemplates } from '@/lib/resume-templates';
import { cn } from '@/lib/utils';
import {
  LayoutTemplate,
  Layers,
  Paintbrush,
  SpellCheck,
  MoreHorizontal,
  Check,
  RotateCcw,
  Pencil,
} from 'lucide-react';

// Sidebar tab types
type SidebarTab = 'templates' | 'sections' | 'design' | 'spellcheck';

const fontFamilies = [
  { name: 'Inter', value: 'Inter, system-ui, sans-serif' },
  { name: 'Roboto', value: 'Roboto, system-ui, sans-serif' },
  { name: 'Open Sans', value: '"Open Sans", system-ui, sans-serif' },
  { name: 'Lato', value: 'Lato, system-ui, sans-serif' },
  { name: 'Montserrat', value: 'Montserrat, system-ui, sans-serif' },
  { name: 'Poppins', value: 'Poppins, system-ui, sans-serif' },
  { name: 'Source Sans Pro', value: '"Source Sans Pro", system-ui, sans-serif' },
  { name: 'Nunito', value: 'Nunito, system-ui, sans-serif' },
  { name: 'Raleway', value: 'Raleway, system-ui, sans-serif' },
  { name: 'Merriweather', value: 'Merriweather, Georgia, serif' },
];

// Color options for templates
const templateColors = ['#1e3a5f', '#f97316', '#3b82f6', '#6b7280', '#f472b6'];

export default function FinalResumePage() {
  const router = useRouter();
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<SidebarTab>('templates');
  const [showDownloadDialog, setShowDownloadDialog] = useState(false);
  const [designOptions, setDesignOptions] = useState<DesignOptions>(defaultDesignOptions);
  const [currentPage, setCurrentPage] = useState(1);
  const [resumeName, setResumeName] = useState('Resume_1');
  const [isEditingName, setIsEditingName] = useState(false);

  useEffect(() => {
    // Get resume data from localStorage
    const savedData = localStorage.getItem('resumeData');
    const templateId = localStorage.getItem('selectedTemplateId');

    if (!savedData || !templateId) {
      router.push('/resume/templates');
      return;
    }

    try {
      const parsed = JSON.parse(savedData);
      setResumeData(parsed);
    } catch {
      router.push('/resume/templates');
      return;
    }

    // Load saved design options if any
    const savedDesign = localStorage.getItem('designOptions');
    if (savedDesign) {
      try {
        setDesignOptions(JSON.parse(savedDesign));
      } catch {
        // Use defaults
      }
    }

    setIsLoading(false);
  }, [router]);

  // Save design options to localStorage
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('designOptions', JSON.stringify(designOptions));
    }
  }, [designOptions, isLoading]);

  // Save resume data changes
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

  // Get active sections based on filled data
  const getActiveSections = () => {
    const sections: { id: string; label: string; active: boolean }[] = [];

    sections.push({
      id: 'contacts',
      label: 'Contacts',
      active: !!(resumeData.contact.firstName || resumeData.contact.lastName || resumeData.contact.email),
    });

    sections.push({
      id: 'experience',
      label: 'Experience',
      active: resumeData.experiences.length > 0,
    });

    sections.push({
      id: 'education',
      label: 'Education',
      active: resumeData.educations.length > 0,
    });

    sections.push({
      id: 'skills',
      label: 'Skills',
      active: resumeData.skills.length > 0,
    });

    sections.push({
      id: 'summary',
      label: 'Summary',
      active: !!resumeData.summary,
    });

    sections.push({
      id: 'languages',
      label: 'Languages',
      active: resumeData.finalize.languages.length > 0,
    });

    sections.push({
      id: 'certifications',
      label: 'Certifications',
      active: resumeData.finalize.certifications.length > 0,
    });

    sections.push({
      id: 'websites',
      label: 'Links',
      active: resumeData.finalize.websites.length > 0,
    });

    sections.push({
      id: 'awards',
      label: 'Awards',
      active: resumeData.finalize.awards.length > 0,
    });

    sections.push({
      id: 'references',
      label: 'References',
      active: resumeData.finalize.references.length > 0,
    });

    sections.push({
      id: 'hobbies',
      label: 'Hobbies',
      active: resumeData.finalize.hobbies.length > 0,
    });

    return sections.filter((s) => s.active);
  };

  const handleTemplateChange = (templateId: string) => {
    setResumeData({ ...resumeData, templateId });
    localStorage.setItem('selectedTemplateId', templateId);
  };

  const resetDesignOptions = () => {
    setDesignOptions(defaultDesignOptions);
  };

  const sidebarTabs: { id: SidebarTab; label: string; icon: React.ReactNode }[] = [
    { id: 'templates', label: 'Templates', icon: <LayoutTemplate className="h-5 w-5" /> },
    { id: 'sections', label: 'Section', icon: <Layers className="h-5 w-5" /> },
    { id: 'design', label: 'Design & Formatting', icon: <Paintbrush className="h-5 w-5" /> },
    { id: 'spellcheck', label: 'Spell check', icon: <SpellCheck className="h-5 w-5" /> },
  ];

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Header */}
      <header className="border-b bg-background px-6 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-zinc-900 dark:text-zinc-100">BoostCV</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Check className="h-4 w-4 text-green-500" />
          <span>Saved</span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => setShowDownloadDialog(true)}
            className="bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900"
          >
            Download PDF
          </Button>
          <Button variant="outline" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-28 border-r bg-muted/30 flex flex-col items-center py-4 gap-2">
          {sidebarTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex flex-col items-center gap-1 p-4 rounded-lg transition-colors w-24 text-center',
                activeTab === tab.id
                  ? 'text-zinc-900 bg-zinc-100 dark:text-zinc-100 dark:bg-zinc-800'
                  : 'text-muted-foreground hover:bg-accent'
              )}
            >
              {tab.icon}
              <span className="text-sm leading-tight">{tab.label}</span>
            </button>
          ))}
        </aside>

        {/* Sidebar Content Panel */}
        <div className="w-1/3 border-r bg-background flex flex-col">
          <div className="p-4 overflow-y-auto flex-1">
            {/* Templates Tab */}
            {activeTab === 'templates' && (
              <div className="space-y-4">
                <h2 className="font-display text-2xl font-bold">Templates</h2>
                <div className="border-b pb-4" />

                {/* Color Options */}
                <div className="flex gap-2">
                  {templateColors.map((color) => (
                    <button
                      key={color}
                      onClick={() => {/* Color selection feature - for future enhancement */}}
                      className="w-8 h-8 rounded-full border-2 border-transparent transition-transform hover:scale-110"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>

                {/* Template Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {resumeTemplates.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => handleTemplateChange(t.id)}
                      className={cn(
                        'relative aspect-3/4 border-2 rounded-lg overflow-hidden transition-all hover:shadow-lg',
                        resumeData.templateId === t.id
                          ? 'border-zinc-900 ring-2 ring-zinc-300 dark:border-zinc-100 dark:ring-zinc-700'
                          : 'border-gray-200 hover:border-gray-300'
                      )}
                    >
                      {/* Template Preview Placeholder */}
                      <div
                        className="absolute inset-0 bg-white p-2"
                        style={{ borderTop: `3px solid ${t.primaryColor}` }}
                      >
                        <div className="space-y-1">
                          <div
                            className="h-3 w-16 mx-auto rounded"
                            style={{ backgroundColor: t.primaryColor }}
                          />
                          <div className="h-1 w-12 mx-auto bg-gray-200 rounded" />
                          <div className="h-1 w-20 mx-auto bg-gray-100 rounded" />
                          <div className="mt-2 space-y-1">
                            <div className="h-1.5 w-full bg-gray-100 rounded" />
                            <div className="h-1.5 w-3/4 bg-gray-100 rounded" />
                            <div className="h-1.5 w-5/6 bg-gray-100 rounded" />
                          </div>
                        </div>
                      </div>
                      {resumeData.templateId === t.id && (
                        <div className="absolute top-1 right-1 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 rounded-full p-0.5">
                          <Check className="h-3 w-3" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sections Tab */}
            {activeTab === 'sections' && (
              <div className="space-y-4">
                <h2 className="font-display text-2xl font-bold">Sections</h2>
                <p className="text-sm text-muted-foreground">
                  These are the sections included in your resume based on the information you provided.
                </p>
                <div className="border-b pb-4" />

                <div className="space-y-2">
                  {getActiveSections().map((section) => (
                    <div
                      key={section.id}
                      className="flex items-center gap-3 p-3 border rounded-lg bg-card"
                    >
                      <div className="h-8 w-8 rounded bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                        <Check className="h-4 w-4 text-zinc-900 dark:text-zinc-100" />
                      </div>
                      <span className="font-medium">{section.label}</span>
                    </div>
                  ))}
                </div>

                <Button
                  variant="outline"
                  className="w-full mt-4"
                  onClick={() => router.push('/resume/section')}
                >
                  Edit Sections
                </Button>
              </div>
            )}

            {/* Design & Formatting Tab */}
            {activeTab === 'design' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-2xl font-bold">Design & Formatting</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetDesignOptions}
                    className="text-muted-foreground"
                  >
                    <RotateCcw className="h-4 w-4 mr-1" />
                    Reset
                  </Button>
                </div>
                <div className="border-b pb-4" />

                {/* Font Family */}
                <div className="space-y-2">
                  <Label>Font Family</Label>
                  <Select
                    value={designOptions.fontFamily}
                    onValueChange={(value) =>
                      setDesignOptions({ ...designOptions, fontFamily: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {fontFamilies.map((font) => (
                        <SelectItem key={font.value} value={font.value}>
                          <span style={{ fontFamily: font.value }}>{font.name}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Font Size */}
                <div className="space-y-2">
                  <Label>Font Size</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      min={8}
                      max={16}
                      value={designOptions.fontSize}
                      onChange={(e) =>
                        setDesignOptions({
                          ...designOptions,
                          fontSize: parseInt(e.target.value) || 11,
                        })
                      }
                      className="w-20"
                    />
                    <span className="text-sm text-muted-foreground">pt</span>
                    <Slider
                      min={8}
                      max={16}
                      step={1}
                      value={[designOptions.fontSize]}
                      onValueChange={(value) =>
                        setDesignOptions({
                          ...designOptions,
                          fontSize: value[0],
                        })
                      }
                      className="flex-1"
                    />
                  </div>
                </div>

                {/* Section Spacing */}
                <div className="space-y-2">
                  <Label>Section Spacing</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      min={8}
                      max={32}
                      value={designOptions.sectionSpacing}
                      onChange={(e) =>
                        setDesignOptions({
                          ...designOptions,
                          sectionSpacing: parseInt(e.target.value) || 16,
                        })
                      }
                      className="w-20"
                    />
                    <span className="text-sm text-muted-foreground">px</span>
                    <Slider
                      min={8}
                      max={32}
                      step={1}
                      value={[designOptions.sectionSpacing]}
                      onValueChange={(value) =>
                        setDesignOptions({
                          ...designOptions,
                          sectionSpacing: value[0],
                        })
                      }
                      className="flex-1"
                    />
                  </div>
                </div>

                {/* Paragraph Spacing */}
                <div className="space-y-2">
                  <Label>Paragraph Spacing</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      min={4}
                      max={24}
                      value={designOptions.paragraphSpacing}
                      onChange={(e) =>
                        setDesignOptions({
                          ...designOptions,
                          paragraphSpacing: parseInt(e.target.value) || 8,
                        })
                      }
                      className="w-20"
                    />
                    <span className="text-sm text-muted-foreground">px</span>
                    <Slider
                      min={4}
                      max={24}
                      step={1}
                      value={[designOptions.paragraphSpacing]}
                      onValueChange={(value) =>
                        setDesignOptions({
                          ...designOptions,
                          paragraphSpacing: value[0],
                        })
                      }
                      className="flex-1"
                    />
                  </div>
                </div>

                {/* Line Spacing */}
                <div className="space-y-2">
                  <Label>Line Spacing</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      min={1}
                      max={3}
                      step={0.1}
                      value={designOptions.lineSpacing}
                      onChange={(e) =>
                        setDesignOptions({
                          ...designOptions,
                          lineSpacing: parseFloat(e.target.value) || 1.5,
                        })
                      }
                      className="w-20"
                    />
                    <Slider
                      min={1}
                      max={3}
                      step={0.1}
                      value={[designOptions.lineSpacing]}
                      onValueChange={(value) =>
                        setDesignOptions({
                          ...designOptions,
                          lineSpacing: value[0],
                        })
                      }
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Spell Check Tab */}
            {activeTab === 'spellcheck' && (
              <div className="space-y-4">
                <h2 className="font-display text-2xl font-bold">Spell Check</h2>
                <div className="border-b pb-4" />
                <div className="text-center py-8">
                  <SpellCheck className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    Spell check feature coming soon!
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    We'll help you catch typos and grammatical errors.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content - Resume Preview */}
        <main className="flex-1 bg-gray-100 dark:bg-gray-900 p-8 overflow-auto">
          <div className="max-w-3xl mx-auto">
            {/* Resume Name */}
            <div className="flex items-center gap-2 mb-4">
              {isEditingName ? (
                <Input
                  value={resumeName}
                  onChange={(e) => setResumeName(e.target.value)}
                  onBlur={() => setIsEditingName(false)}
                  onKeyDown={(e) => e.key === 'Enter' && setIsEditingName(false)}
                  className="w-48 h-8 text-zinc-900 dark:text-zinc-100 font-medium"
                  autoFocus
                />
              ) : (
                <button
                  onClick={() => setIsEditingName(true)}
                  className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-medium hover:underline"
                >
                  {resumeName}
                  <Pencil className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Resume Preview */}
            <ResumePreview
              data={resumeData}
              designOptions={designOptions}
              showScore={false}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </div>
        </main>
      </div>

      {/* Download Dialog */}
      <DownloadDialog
        data={resumeData}
        isOpen={showDownloadDialog}
        onClose={() => setShowDownloadDialog(false)}
        designOptions={designOptions}
      />
    </div>
  );
}
