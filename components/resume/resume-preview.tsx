'use client';

import { ResumeData, ResumeTemplate } from '@/lib/types/resume';
import { resumeTemplates } from '@/lib/resume-templates';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ResumePreviewProps {
  data: ResumeData;
  className?: string;
}

export function ResumePreview({ data, className }: ResumePreviewProps) {
  const template = resumeTemplates.find((t) => t.id === data.templateId) || resumeTemplates[0];
  const [currentPage, setCurrentPage] = useState(1);
  
  // Calculate if we need multiple pages based on content
  const hasSecondPageContent = 
    data.finalize.references.length > 0 ||
    data.finalize.hobbies.length > 0 ||
    data.finalize.awards.length > 0 ||
    data.finalize.customSections.length > 0;
  
  const totalPages = hasSecondPageContent ? 2 : 1;

  return (
    <div className={cn('bg-white shadow-xl rounded-lg overflow-hidden', className)}>
      {/* Resume Score Header */}
      <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-b">
        <div className="flex items-center gap-2">
          <div className="bg-cyan-500 text-white text-xs font-bold px-2 py-1 rounded">
            {calculateScore(data)}%
          </div>
          <span className="text-sm text-gray-600">Your resume score 😊</span>
        </div>
      </div>

      {/* Resume Content - Page 1 */}
      {currentPage === 1 && (
        <div
          className="p-6 min-h-125 text-sm"
          style={{ borderTop: `4px solid ${template.primaryColor}` }}
        >
          {/* Header */}
          <div className="text-center mb-4">
            <h1
              className="text-xl font-bold uppercase tracking-wide"
              style={{ color: template.primaryColor }}
            >
              {data.contact.firstName || 'YOUR'} {data.contact.lastName || 'NAME'}
            </h1>
            {data.contact.desiredJobTitle && (
              <p className="text-gray-600 mt-1">{data.contact.desiredJobTitle}</p>
            )}
            <div className="flex justify-center gap-4 mt-2 text-xs text-gray-500">
              {data.contact.email && <span>{data.contact.email}</span>}
              {data.contact.phone && <span>{data.contact.phone}</span>}
            </div>
          </div>

          {/* Summary */}
          {data.summary && (
            <div className="mb-4">
              <h2
                className="text-sm font-bold uppercase tracking-wide border-b pb-1 mb-2"
                style={{ color: template.primaryColor, borderColor: template.primaryColor }}
              >
                Summary
              </h2>
              <p className="text-xs text-gray-600 leading-relaxed">{data.summary}</p>
            </div>
          )}

          {/* Experience */}
          {data.experiences.length > 0 && (
            <div className="mb-4">
              <h2
                className="text-sm font-bold uppercase tracking-wide border-b pb-1 mb-2"
                style={{ color: template.primaryColor, borderColor: template.primaryColor }}
              >
                Experience
              </h2>
              <div className="space-y-3">
                {data.experiences.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-xs">
                          {exp.jobTitle || 'Job Title'}, {exp.employer || 'Company name'}
                        </p>
                        <p className="text-xs text-gray-500">{exp.location}</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        {exp.startDate || 'Start'} – {exp.isCurrentJob ? 'Present' : (exp.endDate || 'End')}
                      </p>
                    </div>
                    {exp.description && (
                      <p className="text-xs text-gray-600 mt-1 whitespace-pre-line">
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {data.educations.length > 0 && (
            <div className="mb-4">
              <h2
                className="text-sm font-bold uppercase tracking-wide border-b pb-1 mb-2"
                style={{ color: template.primaryColor, borderColor: template.primaryColor }}
              >
                Education
              </h2>
              <div className="space-y-2">
                {data.educations.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-xs">{edu.degree || 'Degree'}</p>
                        <p className="text-xs text-gray-500">
                          {edu.schoolName || 'School'}, {edu.location}
                        </p>
                      </div>
                      <p className="text-xs text-gray-500">
                        {edu.startDate || 'Start'} – {edu.endDate || 'End'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {data.skills.length > 0 && (
            <div className="mb-4">
              <h2
                className="text-sm font-bold uppercase tracking-wide border-b pb-1 mb-2"
                style={{ color: template.primaryColor, borderColor: template.primaryColor }}
              >
                Skills
              </h2>
              <div className="flex flex-wrap gap-1">
                {data.skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="text-xs px-2 py-0.5 bg-gray-100 rounded"
                  >
                    {skill.name}
                    {skill.showLevel && skill.level && (
                      <span className="text-gray-500"> • {skill.level}</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {data.finalize.languages.length > 0 && (
            <div className="mb-4">
              <h2
                className="text-sm font-bold uppercase tracking-wide border-b pb-1 mb-2"
                style={{ color: template.primaryColor, borderColor: template.primaryColor }}
              >
                Languages
              </h2>
              <div className="flex flex-wrap gap-2">
                {data.finalize.languages.map((lang) => (
                  <span key={lang.id} className="text-xs">
                    {lang.name} ({lang.proficiency})
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {data.finalize.certifications.length > 0 && (
            <div className="mb-4">
              <h2
                className="text-sm font-bold uppercase tracking-wide border-b pb-1 mb-2"
                style={{ color: template.primaryColor, borderColor: template.primaryColor }}
              >
                Certifications
              </h2>
              <div className="space-y-1">
                {data.finalize.certifications.map((cert) => (
                  <p key={cert.id} className="text-xs">
                    {cert.name} – {cert.issuer} ({cert.date})
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Websites */}
          {data.finalize.websites.length > 0 && (
            <div className="mb-4">
              <h2
                className="text-sm font-bold uppercase tracking-wide border-b pb-1 mb-2"
                style={{ color: template.primaryColor, borderColor: template.primaryColor }}
              >
                Links
              </h2>
              <div className="flex flex-wrap gap-3">
                {data.finalize.websites.map((site) => (
                  <span key={site.id} className="text-xs text-blue-600">
                    {site.label}: {site.url}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Resume Content - Page 2 */}
      {currentPage === 2 && hasSecondPageContent && (
        <div
          className="p-6 min-h-[500px] text-sm"
          style={{ borderTop: `4px solid ${template.primaryColor}` }}
        >
          {/* Header - Repeated on second page */}
          <div className="text-center mb-4">
            <h1
              className="text-xl font-bold uppercase tracking-wide"
              style={{ color: template.primaryColor }}
            >
              {data.contact.firstName || 'YOUR'} {data.contact.lastName || 'NAME'}
            </h1>
            <p className="text-xs text-gray-500 mt-1">Page 2</p>
          </div>

          {/* Awards & Honors */}
          {data.finalize.awards.length > 0 && (
            <div className="mb-4">
              <h2
                className="text-sm font-bold uppercase tracking-wide border-b pb-1 mb-2"
                style={{ color: template.primaryColor, borderColor: template.primaryColor }}
              >
                Awards & Honors
              </h2>
              <div className="space-y-1">
                {data.finalize.awards.map((award) => (
                  <p key={award.id} className="text-xs">
                    {award.title} – {award.issuer} ({award.date})
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* References */}
          {data.finalize.references.length > 0 && (
            <div className="mb-4">
              <h2
                className="text-sm font-bold uppercase tracking-wide border-b pb-1 mb-2"
                style={{ color: template.primaryColor, borderColor: template.primaryColor }}
              >
                References
              </h2>
              <div className="space-y-2">
                {data.finalize.references.map((ref) => (
                  <div key={ref.id} className="text-xs">
                    <p className="font-semibold">{ref.name}</p>
                    <p className="text-gray-600">
                      {ref.position}{ref.company ? `, ${ref.company}` : ''}
                    </p>
                    <p className="text-gray-500">
                      {ref.email} {ref.phone && `| ${ref.phone}`}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hobbies & Interests */}
          {data.finalize.hobbies.length > 0 && (
            <div className="mb-4">
              <h2
                className="text-sm font-bold uppercase tracking-wide border-b pb-1 mb-2"
                style={{ color: template.primaryColor, borderColor: template.primaryColor }}
              >
                Hobbies & Interests
              </h2>
              <div className="flex flex-wrap gap-2">
                {data.finalize.hobbies.map((hobby) => (
                  <span key={hobby.id} className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                    {hobby.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Custom Sections */}
          {data.finalize.customSections.map((section) => (
            <div key={section.id} className="mb-4">
              <h2
                className="text-sm font-bold uppercase tracking-wide border-b pb-1 mb-2"
                style={{ color: template.primaryColor, borderColor: template.primaryColor }}
              >
                {section.sectionName}
              </h2>
              <p className="text-xs text-gray-600">{section.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Footer with Pagination */}
      <div className="bg-gray-50 px-4 py-2 flex items-center justify-between border-t text-xs text-gray-500">
        <span>✓ Saved</span>
        <div className="flex items-center gap-2">
          {totalPages > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="h-6 w-6"
              >
                <ChevronLeft className="h-3 w-3" />
              </Button>
              <span className="font-medium">
                {currentPage} / {totalPages}
              </span>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => setCurrentPage(2)}
                disabled={currentPage === 2}
                className="h-6 w-6"
              >
                <ChevronRight className="h-3 w-3" />
              </Button>
            </>
          )}
          {totalPages === 1 && <span>1 / 1</span>}
        </div>
      </div>
    </div>
  );
}

function calculateScore(data: ResumeData): number {
  let score = 0;
  const maxScore = 100;

  // Contact info (20 points)
  if (data.contact.firstName) score += 4;
  if (data.contact.lastName) score += 4;
  if (data.contact.email) score += 4;
  if (data.contact.phone) score += 4;
  if (data.contact.desiredJobTitle) score += 4;

  // Experience (25 points)
  if (data.experiences.length > 0) {
    score += 10;
    if (data.experiences.length >= 2) score += 5;
    if (data.experiences.some((e) => e.description)) score += 10;
  }

  // Education (15 points)
  if (data.educations.length > 0) {
    score += 15;
  }

  // Skills (15 points)
  if (data.skills.length >= 3) {
    score += 15;
  } else if (data.skills.length > 0) {
    score += 8;
  }

  // Summary (15 points)
  if (data.summary && data.summary.length >= 50) {
    score += 15;
  } else if (data.summary) {
    score += 8;
  }

  // Finalize sections (10 points)
  if (data.finalize.languages.length > 0) score += 2;
  if (data.finalize.certifications.length > 0) score += 3;
  if (data.finalize.websites.length > 0) score += 2;
  if (data.finalize.awards.length > 0) score += 3;

  return Math.min(score, maxScore);
}
