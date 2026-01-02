import jsPDF from 'jspdf';
import { ResumeData } from '@/lib/types/resume';
import { DesignOptions } from './styles';

interface PDFGeneratorOptions {
  data: ResumeData;
  template: { primaryColor: string; name: string; layout?: string };
  fileName: string;
  designOptions: DesignOptions;
}

// Helper function to convert any color format to hex
function convertToSafeColor(color: string): string {
  if (/^#[0-9A-Fa-f]{6}$/.test(color)) {
    return color;
  }
  
  const temp = document.createElement('div');
  temp.style.color = color;
  document.body.appendChild(temp);
  
  const computed = window.getComputedStyle(temp).color;
  document.body.removeChild(temp);
  
  const match = computed.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (match) {
    const r = parseInt(match[1]);
    const g = parseInt(match[2]);
    const b = parseInt(match[3]);
    return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
  }
  
  return '#2563eb';
}

// Convert hex to RGB for jsPDF
function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 37, g: 99, b: 235 };
}

export async function generatePDF({ data, template, fileName, designOptions }: PDFGeneratorOptions) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const safeColor = convertToSafeColor(template.primaryColor);
  const primaryRgb = hexToRgb(safeColor);
  const layout = template.layout || 'classic';
  const isHarvard = layout === 'harvard';
  
  // Page configuration
  const margin = 15;
  const pageWidth = 210;
  const pageHeight = 297;
  const contentWidth = pageWidth - 2 * margin;
  let yPosition = margin;

  // Helper function to add text with word wrap
  const addText = (text: string, x: number, y: number, maxWidth: number, fontSize: number = 10, isBold: boolean = false) => {
    doc.setFontSize(fontSize);
    doc.setFont('helvetica', isBold ? 'bold' : 'normal');
    const lines = doc.splitTextToSize(text, maxWidth);
    doc.text(lines, x, y);
    return lines.length * (fontSize * 0.35);
  };

  // Check if new page needed
  const checkNewPage = (requiredSpace: number = 40) => {
    if (yPosition > pageHeight - requiredSpace) {
      doc.addPage();
      yPosition = margin;
    }
  };

  // Render header
  renderHeader(doc, data, primaryRgb, pageWidth, yPosition);
  yPosition += calculateHeaderHeight(data);

  // Render sections based on layout
  if (!isHarvard && data.summary) {
    checkNewPage();
    yPosition = renderSummary(doc, data.summary, margin, yPosition, contentWidth, primaryRgb, addText);
  }

  if (isHarvard && data.educations.length > 0) {
    checkNewPage();
    yPosition = renderEducation(doc, data.educations, margin, yPosition, contentWidth, pageWidth, primaryRgb, addText, isHarvard, checkNewPage);
  }

  if (data.experiences.length > 0) {
    checkNewPage();
    yPosition = renderExperience(doc, data.experiences, margin, yPosition, contentWidth, pageWidth, primaryRgb, addText, isHarvard, checkNewPage);
  }

  if (!isHarvard && data.educations.length > 0) {
    checkNewPage();
    yPosition = renderEducation(doc, data.educations, margin, yPosition, contentWidth, pageWidth, primaryRgb, addText, isHarvard, checkNewPage);
  }

  if (data.skills.length > 0) {
    checkNewPage();
    yPosition = renderSkills(doc, data.skills, margin, yPosition, contentWidth, primaryRgb, addText, isHarvard);
  }

  if (data.finalize.languages.length > 0) {
    checkNewPage();
    yPosition = renderLanguages(doc, data.finalize.languages, margin, yPosition, contentWidth, primaryRgb, addText);
  }

  if (data.finalize.certifications.length > 0) {
    checkNewPage();
    yPosition = renderCertifications(doc, data.finalize.certifications, margin, yPosition, primaryRgb, checkNewPage);
  }

  if (data.finalize.awards.length > 0) {
    checkNewPage();
    yPosition = renderAwards(doc, data.finalize.awards, margin, yPosition, primaryRgb, checkNewPage);
  }

  if (data.finalize.websites.length > 0) {
    checkNewPage();
    yPosition = renderWebsites(doc, data.finalize.websites, margin, yPosition, contentWidth, primaryRgb, addText);
  }

  if (data.finalize.references.length > 0) {
    checkNewPage();
    yPosition = renderReferences(doc, data.finalize.references, margin, yPosition, pageWidth, primaryRgb, checkNewPage);
  }

  if (data.finalize.hobbies.length > 0) {
    checkNewPage();
    yPosition = renderHobbies(doc, data.finalize.hobbies, margin, yPosition, contentWidth, primaryRgb, addText);
  }

  data.finalize.customSections.forEach(section => {
    checkNewPage();
    yPosition = renderCustomSection(doc, section, margin, yPosition, contentWidth, primaryRgb, addText);
  });

  // Save the PDF
  doc.save(`${fileName}.pdf`);
}

function calculateHeaderHeight(data: ResumeData): number {
  let height = 8; // Name
  if (data.contact.desiredJobTitle) height += 6;
  height += 10; // Contact info
  return height;
}

function renderHeader(doc: jsPDF, data: ResumeData, primaryRgb: { r: number; g: number; b: number }, pageWidth: number, yPosition: number) {
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(primaryRgb.r, primaryRgb.g, primaryRgb.b);
  const name = `${data.contact.firstName || 'Your'} ${data.contact.lastName || 'Name'}`.toUpperCase();
  doc.text(name, pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 8;

  if (data.contact.desiredJobTitle) {
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text(data.contact.desiredJobTitle, pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 6;
  }

  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  const contactInfo = [data.contact.email, data.contact.phone].filter(Boolean).join(' | ');
  doc.text(contactInfo, pageWidth / 2, yPosition, { align: 'center' });
}

function renderSectionHeader(doc: jsPDF, title: string, margin: number, pageWidth: number, yPosition: number, primaryRgb: { r: number; g: number; b: number }): number {
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(primaryRgb.r, primaryRgb.g, primaryRgb.b);
  doc.text(title.toUpperCase(), margin, yPosition);
  doc.setDrawColor(primaryRgb.r, primaryRgb.g, primaryRgb.b);
  doc.setLineWidth(0.5);
  doc.line(margin, yPosition + 1, pageWidth - margin, yPosition + 1);
  return yPosition + 8;
}

function renderSummary(doc: jsPDF, summary: string, margin: number, yPosition: number, contentWidth: number, primaryRgb: { r: number; g: number; b: number }, addText: Function): number {
  yPosition = renderSectionHeader(doc, 'Professional Summary', margin, 210, yPosition, primaryRgb);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(60, 60, 60);
  const summaryHeight = addText(summary, margin, yPosition, contentWidth, 10);
  return yPosition + summaryHeight + 6;
}

function renderEducation(doc: jsPDF, educations: ResumeData['educations'], margin: number, yPosition: number, contentWidth: number, pageWidth: number, primaryRgb: { r: number; g: number; b: number }, addText: Function, isHarvard: boolean, checkNewPage: Function): number {
  yPosition = renderSectionHeader(doc, 'Education', margin, pageWidth, yPosition, primaryRgb);
  
  educations.forEach(edu => {
    checkNewPage(40);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text(isHarvard ? edu.schoolName : edu.degree, margin, yPosition);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text(`${edu.startDate} - ${edu.endDate}`, pageWidth - margin, yPosition, { align: 'right' });
    yPosition += 5;
    
    if (isHarvard) {
      doc.setFontSize(10);
      doc.setFont('helvetica', 'italic');
      doc.text(edu.degree, margin, yPosition);
      yPosition += 5;
    }
    
    if (edu.location) {
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(120, 120, 120);
      doc.text(isHarvard ? edu.location : `${edu.schoolName}, ${edu.location}`, margin, yPosition);
      yPosition += 5;
    } else if (!isHarvard) {
      doc.setTextColor(120, 120, 120);
      doc.text(edu.schoolName, margin, yPosition);
      yPosition += 5;
    }
    
    if (edu.description) {
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(60, 60, 60);
      const descHeight = addText(edu.description, margin, yPosition, contentWidth, 9);
      yPosition += descHeight + 2;
    }
    yPosition += 4;
  });
  
  return yPosition;
}

function renderExperience(doc: jsPDF, experiences: ResumeData['experiences'], margin: number, yPosition: number, contentWidth: number, pageWidth: number, primaryRgb: { r: number; g: number; b: number }, addText: Function, isHarvard: boolean, checkNewPage: Function): number {
  yPosition = renderSectionHeader(doc, 'Experience', margin, pageWidth, yPosition, primaryRgb);
  
  experiences.forEach(exp => {
    checkNewPage(40);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    const titleText = isHarvard ? exp.employer : `${exp.jobTitle}${exp.employer ? ', ' + exp.employer : ''}`;
    doc.text(titleText, margin, yPosition);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text(`${exp.startDate} - ${exp.isCurrentJob ? 'Present' : exp.endDate}`, pageWidth - margin, yPosition, { align: 'right' });
    yPosition += 5;
    
    if (isHarvard) {
      doc.setFontSize(10);
      doc.setFont('helvetica', 'italic');
      doc.text(exp.jobTitle, margin, yPosition);
      yPosition += 5;
    }
    
    if (exp.location) {
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(120, 120, 120);
      doc.text(exp.location, margin, yPosition);
      yPosition += 5;
    }
    
    if (exp.description) {
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(60, 60, 60);
      const descHeight = addText(exp.description, margin, yPosition, contentWidth, 9);
      yPosition += descHeight + 2;
    }
    yPosition += 4;
  });
  
  return yPosition;
}

function renderSkills(doc: jsPDF, skills: ResumeData['skills'], margin: number, yPosition: number, contentWidth: number, primaryRgb: { r: number; g: number; b: number }, addText: Function, isHarvard: boolean): number {
  yPosition = renderSectionHeader(doc, isHarvard ? 'Skills & Interests' : 'Skills', margin, 210, yPosition, primaryRgb);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(60, 60, 60);
  const skillsText = skills.map(s => s.name + (s.showLevel && s.level ? ` (${s.level})` : '')).join(', ');
  const skillsHeight = addText(skillsText, margin, yPosition, contentWidth, 10);
  return yPosition + skillsHeight + 6;
}

function renderLanguages(doc: jsPDF, languages: ResumeData['finalize']['languages'], margin: number, yPosition: number, contentWidth: number, primaryRgb: { r: number; g: number; b: number }, addText: Function): number {
  yPosition = renderSectionHeader(doc, 'Languages', margin, 210, yPosition, primaryRgb);
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  const langText = languages.map(l => `${l.name} (${l.proficiency})`).join(', ');
  const langHeight = addText(langText, margin, yPosition, contentWidth, 10);
  return yPosition + langHeight + 6;
}

function renderCertifications(doc: jsPDF, certifications: ResumeData['finalize']['certifications'], margin: number, yPosition: number, primaryRgb: { r: number; g: number; b: number }, checkNewPage: Function): number {
  yPosition = renderSectionHeader(doc, 'Certifications', margin, 210, yPosition, primaryRgb);
  certifications.forEach(cert => {
    checkNewPage(20);
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    doc.text(`${cert.name} - ${cert.issuer} (${cert.date})`, margin, yPosition);
    yPosition += 5;
  });
  return yPosition + 2;
}

function renderAwards(doc: jsPDF, awards: ResumeData['finalize']['awards'], margin: number, yPosition: number, primaryRgb: { r: number; g: number; b: number }, checkNewPage: Function): number {
  yPosition = renderSectionHeader(doc, 'Awards & Honors', margin, 210, yPosition, primaryRgb);
  awards.forEach(award => {
    checkNewPage(20);
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    doc.text(`${award.title} - ${award.issuer} (${award.date})`, margin, yPosition);
    yPosition += 5;
  });
  return yPosition + 2;
}

function renderWebsites(doc: jsPDF, websites: ResumeData['finalize']['websites'], margin: number, yPosition: number, contentWidth: number, primaryRgb: { r: number; g: number; b: number }, addText: Function): number {
  yPosition = renderSectionHeader(doc, 'Links', margin, 210, yPosition, primaryRgb);
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  const websiteText = websites.map(w => `${w.label}: ${w.url}`).join(' | ');
  const webHeight = addText(websiteText, margin, yPosition, contentWidth, 10);
  return yPosition + webHeight + 6;
}

function renderReferences(doc: jsPDF, references: ResumeData['finalize']['references'], margin: number, yPosition: number, pageWidth: number, primaryRgb: { r: number; g: number; b: number }, checkNewPage: Function): number {
  yPosition = renderSectionHeader(doc, 'References', margin, pageWidth, yPosition, primaryRgb);
  references.forEach(ref => {
    checkNewPage(25);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text(ref.name, margin, yPosition);
    yPosition += 5;
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text(`${ref.position}${ref.company ? ', ' + ref.company : ''}`, margin, yPosition);
    yPosition += 5;
    doc.text(`${ref.email}${ref.phone ? ' | ' + ref.phone : ''}`, margin, yPosition);
    yPosition += 7;
  });
  return yPosition;
}

function renderHobbies(doc: jsPDF, hobbies: ResumeData['finalize']['hobbies'], margin: number, yPosition: number, contentWidth: number, primaryRgb: { r: number; g: number; b: number }, addText: Function): number {
  yPosition = renderSectionHeader(doc, 'Hobbies & Interests', margin, 210, yPosition, primaryRgb);
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  const hobbiesText = hobbies.map(h => h.name).join(', ');
  const hobbiesHeight = addText(hobbiesText, margin, yPosition, contentWidth, 10);
  return yPosition + hobbiesHeight + 6;
}

function renderCustomSection(doc: jsPDF, section: ResumeData['finalize']['customSections'][0], margin: number, yPosition: number, contentWidth: number, primaryRgb: { r: number; g: number; b: number }, addText: Function): number {
  yPosition = renderSectionHeader(doc, section.sectionName, margin, 210, yPosition, primaryRgb);
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  const sectionHeight = addText(section.description, margin, yPosition, contentWidth, 10);
  return yPosition + sectionHeight + 6;
}
