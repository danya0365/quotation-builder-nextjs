/**
 * TemplatesPresenter
 * Handles business logic for Templates page
 */

import {
    ITemplateRepository,
    Template,
    TemplateCategory,
    TemplateWithFeatures,
} from '@/src/application/repositories/ITemplateRepository';
import { Metadata } from 'next';

export interface TemplatesViewModel {
  templates: Template[];
  featuredTemplates: Template[];
  categories: TemplateCategory[];
}

export class TemplatesPresenter {
  constructor(
    private readonly repository: ITemplateRepository
  ) {}

  async getViewModel(): Promise<TemplatesViewModel> {
    try {
      const [templates, featuredTemplates] = await Promise.all([
        this.repository.getAll(),
        this.repository.getFeatured(),
      ]);

      // Get unique categories
      const categories = [...new Set(templates.map((t) => t.category))] as TemplateCategory[];

      return {
        templates,
        featuredTemplates,
        categories,
      };
    } catch (error) {
      console.error('Error getting templates view model:', error);
      throw error;
    }
  }

  async getTemplateWithFeatures(id: string): Promise<TemplateWithFeatures | null> {
    return this.repository.getWithFeatures(id);
  }

  async searchTemplates(query: string): Promise<Template[]> {
    return this.repository.search(query);
  }

  generateMetadata(): Metadata {
    return {
      title: 'เทมเพลต | Quotation Builder',
      description: 'เลือกเทมเพลตใบเสนอราคาสำเร็จรูป สำหรับโปรเจคประเภทต่างๆ',
    };
  }
}
