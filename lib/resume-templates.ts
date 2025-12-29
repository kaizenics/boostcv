import { ResumeTemplate } from './types/resume';

export const resumeTemplates: ResumeTemplate[] = [
  {
    id: 'celestial',
    name: 'Celestial',
    description: 'Soft neutral tones with refined typography for a sophisticated and professional feel.',
    thumbnail: '/templates/celestial.png',
    primaryColor: '#1e3a5f',
    category: 'professional',
  },
  {
    id: 'galaxy',
    name: 'Galaxy',
    description: 'A visually striking resume template, perfect for illustrating the breadth and depth of your expertise.',
    thumbnail: '/templates/galaxy.png',
    primaryColor: '#2563eb',
    category: 'modern',
  },
  {
    id: 'astral',
    name: 'Astral',
    description: 'Includes a prominent profile image for a personal touch while maintaining professionalism.',
    thumbnail: '/templates/astral.png',
    primaryColor: '#57534e',
    category: 'professional',
  },
  {
    id: 'nova',
    name: 'Nova',
    description: 'Clean and minimal design optimized for ATS systems with maximum readability.',
    thumbnail: '/templates/nova.png',
    primaryColor: '#374151',
    category: 'simple',
  },
  {
    id: 'orbit',
    name: 'Orbit',
    description: 'Modern layout with creative elements that stand out while remaining professional.',
    thumbnail: '/templates/orbit.png',
    primaryColor: '#dc2626',
    category: 'modern',
  },
  {
    id: 'stellar',
    name: 'Stellar',
    description: 'Bold typography and structured sections for maximum impact and clarity.',
    thumbnail: '/templates/stellar.png',
    primaryColor: '#059669',
    category: 'simple',
  },
];

export const skillLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'] as const;
export const languageProficiencies = ['Basic', 'Conversational', 'Fluent', 'Native'] as const;
