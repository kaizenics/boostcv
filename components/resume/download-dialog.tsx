'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ResumeData } from '@/lib/types/resume';
import { resumeTemplates } from '@/lib/resume-templates';
import { Download, FileText, File, Loader2, Info } from 'lucide-react';

interface DownloadDialogProps {
  data: ResumeData;
  isOpen: boolean;
  onClose: () => void;
}

type DownloadFormat = 'pdf' | 'docx';

export function DownloadDialog({ data, isOpen, onClose }: DownloadDialogProps) {
  const [format, setFormat] = useState<DownloadFormat>('pdf');
  const [isDownloading, setIsDownloading] = useState(false);
  const [showPrintTip, setShowPrintTip] = useState(false);

  const template = resumeTemplates.find((t) => t.id === data.templateId) || resumeTemplates[0];
  const fileName = `${data.contact.firstName || 'Resume'}_${data.contact.lastName || 'CV'}`;

  const handleDownload = async () => {
    setIsDownloading(true);
    
    try {
      // Generate and download the resume
      if (format === 'pdf') {
        setShowPrintTip(true);
        await generatePDF(data, template, fileName);
      } else {
        await generateDOCX(data, template, fileName);
      }
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
              <Download className="h-6 w-6 text-primary" />
            </div>
          </div>
          <DialogTitle className="text-center">Download Your Resume</DialogTitle>
          <DialogDescription className="text-center">
            Choose your preferred format
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Label className="text-sm font-medium">Select Format</Label>
          
          {showPrintTip && format === 'pdf' && (
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Print Settings Tip</AlertTitle>
              <AlertDescription>
                For best results in the print dialog:
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Disable "Headers and footers"</li>
                  <li>Set margins to "None" or "Minimal"</li>
                  <li>Enable "Background graphics"</li>
                </ul>
                <p className="mt-2 text-xs">
                  <strong>Chrome:</strong> More settings → Headers and footers (uncheck)
                </p>
              </AlertDescription>
            </Alert>
          )}
          
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setFormat('pdf')}
              className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                format === 'pdf'
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <FileText className={`h-8 w-8 ${format === 'pdf' ? 'text-primary' : 'text-muted-foreground'}`} />
              <span className="font-medium">PDF</span>
              <span className="text-xs text-muted-foreground">Best for sharing</span>
            </button>

            <button
              onClick={() => setFormat('docx')}
              className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                format === 'docx'
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <File className={`h-8 w-8 ${format === 'docx' ? 'text-primary' : 'text-muted-foreground'}`} />
              <span className="font-medium">DOCX</span>
              <span className="text-xs text-muted-foreground">Easy to edit</span>
            </button>
          </div>

          <div className="bg-muted/50 rounded-lg p-3 text-sm">
            <p className="font-medium mb-1">File: {fileName}.{format}</p>
            <p className="text-muted-foreground text-xs">
              Template: {template.name}
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleDownload} disabled={isDownloading} className="flex-1">
              {isDownloading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Downloading...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Download {format.toUpperCase()}
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// PDF Generation using browser print
async function generatePDF(data: ResumeData, template: { primaryColor: string; name: string }, fileName: string) {
  // Create a hidden iframe for printing
  const printContent = generateResumeHTML(data, template);
  
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Please allow popups to download your resume');
    return;
  }

  printWindow.document.write(printContent);
  printWindow.document.close();
  
  // Wait for content to load then print
  printWindow.onload = () => {
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };
}

// DOCX Generation (creates a simple HTML file that Word can open)
async function generateDOCX(data: ResumeData, template: { primaryColor: string; name: string }, fileName: string) {
  const htmlContent = generateResumeHTML(data, template, true);
  
  const blob = new Blob([htmlContent], {
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  });
  
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${fileName}.doc`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function generateResumeHTML(data: ResumeData, template: { primaryColor: string }, forWord = false): string {
  const styles = `
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { 
        font-family: Arial, sans-serif; 
        font-size: 11pt; 
        line-height: 1.4;
        color: #333;
        max-width: 800px;
        margin: 0 auto;
        padding: 40px;
      }
      .header { text-align: center; margin-bottom: 20px; border-top: 4px solid ${template.primaryColor}; padding-top: 20px; }
      .name { font-size: 24pt; font-weight: bold; color: ${template.primaryColor}; text-transform: uppercase; letter-spacing: 2px; }
      .title { font-size: 12pt; color: #666; margin-top: 5px; }
      .contact-info { font-size: 10pt; color: #666; margin-top: 10px; }
      .section { margin-bottom: 15px; page-break-inside: avoid; }
      .section-title { 
        font-size: 12pt; 
        font-weight: bold; 
        color: ${template.primaryColor}; 
        text-transform: uppercase; 
        border-bottom: 2px solid ${template.primaryColor}; 
        padding-bottom: 5px; 
        margin-bottom: 10px; 
      }
      .entry { margin-bottom: 10px; page-break-inside: avoid; }
      .entry-header { display: flex; justify-content: space-between; }
      .entry-title { font-weight: bold; }
      .entry-date { color: #666; font-size: 10pt; }
      .entry-subtitle { color: #666; font-size: 10pt; }
      .entry-description { margin-top: 5px; font-size: 10pt; white-space: pre-line; }
      .skills-list { display: flex; flex-wrap: wrap; gap: 8px; }
      .skill-tag { background: #f0f0f0; padding: 3px 10px; border-radius: 3px; font-size: 10pt; }
      .summary { font-size: 10pt; color: #444; }
      .page-break { page-break-before: always; }
      @media print {
        body { padding: 20px; }
        @page { 
          margin: 0.5in; 
          size: letter;
        }
        /* Remove browser print headers and footers */
        @page { margin-top: 0.5in; margin-bottom: 0.5in; }
        html, body { height: 100%; width: 100%; }
      }
      /* Additional print rules to remove headers/footers */
      @page { 
        margin-header: 0mm;
        margin-footer: 0mm;
      }
    </style>
  `;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>${data.contact.firstName} ${data.contact.lastName} - Resume</title>
      ${styles}
    </head>
    <body>
      <div class="header">
        <div class="name">${data.contact.firstName || 'Your'} ${data.contact.lastName || 'Name'}</div>
        ${data.contact.desiredJobTitle ? `<div class="title">${data.contact.desiredJobTitle}</div>` : ''}
        <div class="contact-info">
          ${[data.contact.email, data.contact.phone].filter(Boolean).join(' | ')}
        </div>
      </div>

      ${data.summary ? `
        <div class="section">
          <div class="section-title">Professional Summary</div>
          <div class="summary">${data.summary}</div>
        </div>
      ` : ''}

      ${data.experiences.length > 0 ? `
        <div class="section">
          <div class="section-title">Experience</div>
          ${data.experiences.map(exp => `
            <div class="entry">
              <div class="entry-header">
                <span class="entry-title">${exp.jobTitle}${exp.employer ? `, ${exp.employer}` : ''}</span>
                <span class="entry-date">${exp.startDate} - ${exp.isCurrentJob ? 'Present' : exp.endDate}</span>
              </div>
              ${exp.location ? `<div class="entry-subtitle">${exp.location}</div>` : ''}
              ${exp.description ? `<div class="entry-description">${exp.description}</div>` : ''}
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${data.educations.length > 0 ? `
        <div class="section">
          <div class="section-title">Education</div>
          ${data.educations.map(edu => `
            <div class="entry">
              <div class="entry-header">
                <span class="entry-title">${edu.degree}</span>
                <span class="entry-date">${edu.startDate} - ${edu.endDate}</span>
              </div>
              <div class="entry-subtitle">${edu.schoolName}${edu.location ? `, ${edu.location}` : ''}</div>
              ${edu.description ? `<div class="entry-description">${edu.description}</div>` : ''}
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${data.skills.length > 0 ? `
        <div class="section">
          <div class="section-title">Skills</div>
          <div class="skills-list">
            ${data.skills.map(skill => `
              <span class="skill-tag">${skill.name}${skill.showLevel ? ` (${skill.level})` : ''}</span>
            `).join('')}
          </div>
        </div>
      ` : ''}

      ${data.finalize.languages.length > 0 ? `
        <div class="section">
          <div class="section-title">Languages</div>
          <div>${data.finalize.languages.map(l => `${l.name} (${l.proficiency})`).join(', ')}</div>
        </div>
      ` : ''}

      ${data.finalize.certifications.length > 0 ? `
        <div class="section">
          <div class="section-title">Certifications</div>
          ${data.finalize.certifications.map(c => `<div>${c.name} - ${c.issuer} (${c.date})</div>`).join('')}
        </div>
      ` : ''}

      ${data.finalize.awards.length > 0 ? `
        <div class="section">
          <div class="section-title">Awards & Honors</div>
          ${data.finalize.awards.map(a => `<div>${a.title} - ${a.issuer} (${a.date})</div>`).join('')}
        </div>
      ` : ''}

      ${data.finalize.websites.length > 0 ? `
        <div class="section">
          <div class="section-title">Links</div>
          <div>${data.finalize.websites.map(w => `${w.label}: ${w.url}`).join(' | ')}</div>
        </div>
      ` : ''}

      ${data.finalize.references.length > 0 ? `
        <div class="section">
          <div class="section-title">References</div>
          ${data.finalize.references.map(r => `
            <div class="entry">
              <div class="entry-title">${r.name}</div>
              <div class="entry-subtitle">${r.position}${r.company ? `, ${r.company}` : ''}</div>
              <div style="font-size: 10pt; color: #666;">${r.email}${r.phone ? ` | ${r.phone}` : ''}</div>
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${data.finalize.hobbies.length > 0 ? `
        <div class="section">
          <div class="section-title">Hobbies & Interests</div>
          <div>${data.finalize.hobbies.map(h => h.name).join(', ')}</div>
        </div>
      ` : ''}

      ${data.finalize.customSections.map(section => `
        <div class="section">
          <div class="section-title">${section.sectionName}</div>
          <div>${section.description}</div>
        </div>
      `).join('')}
    </body>
    </html>
  `;
}
