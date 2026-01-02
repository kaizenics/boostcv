import { ResumeData } from '@/lib/types/resume';
import { DesignOptions } from './styles';
import { generateResumeHTML } from './html-generator';

interface DOCXGeneratorOptions {
  data: ResumeData;
  template: { primaryColor: string; name: string; layout?: string };
  fileName: string;
  designOptions: DesignOptions;
}

export async function generateDOCX({ data, template, fileName, designOptions }: DOCXGeneratorOptions) {
  const htmlContent = generateResumeHTML({ 
    data, 
    template: { 
      primaryColor: template.primaryColor, 
      layout: (template.layout as any) || 'classic' 
    }, 
    designOptions 
  });
  
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
