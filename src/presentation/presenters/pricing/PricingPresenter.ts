/**
 * PricingPresenter
 * Handles business logic for Pricing page
 */

import {
    AddOnService,
    FAQItem,
    IPricingRepository,
    PricingPlan,
} from '@/src/application/repositories/IPricingRepository';
import { Metadata } from 'next';

export interface PricingViewModel {
  plans: PricingPlan[];
  faqs: FAQItem[];
  addons: AddOnService[];
}

export class PricingPresenter {
  constructor(
    private readonly repository: IPricingRepository
  ) {}

  async getViewModel(): Promise<PricingViewModel> {
    try {
      const [plans, faqs, addons] = await Promise.all([
        this.repository.getPlans(),
        this.repository.getFAQs(),
        this.repository.getAddOns(),
      ]);

      return {
        plans,
        faqs,
        addons,
      };
    } catch (error) {
      console.error('Error getting pricing view model:', error);
      throw error;
    }
  }

  generateMetadata(): Metadata {
    return {
      title: 'ราคา | Quotation Builder',
      description: 'ดูราคาแพ็คเกจพัฒนาซอฟต์แวร์ เลือกแพ็คเกจที่เหมาะกับธุรกิจของคุณ',
    };
  }
}
