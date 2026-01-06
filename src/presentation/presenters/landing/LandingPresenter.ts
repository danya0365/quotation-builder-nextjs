/**
 * LandingPresenter
 * Handles business logic for Landing page
 * Receives repository via dependency injection
 */

import {
    ILandingRepository,
    LandingData,
} from '@/src/application/repositories/ILandingRepository';
import { Metadata } from 'next';

export interface LandingViewModel {
  data: LandingData;
}

/**
 * Presenter for Landing page
 * ✅ Receives repository via constructor injection (not Supabase directly)
 */
export class LandingPresenter {
  constructor(
    private readonly repository: ILandingRepository
  ) {}

  /**
   * Get view model for the page
   */
  async getViewModel(): Promise<LandingViewModel> {
    try {
      const data = await this.repository.getLandingData();
      return { data };
    } catch (error) {
      console.error('Error getting landing view model:', error);
      throw error;
    }
  }

  /**
   * Generate metadata for the page
   */
  generateMetadata(): Metadata {
    return {
      title: 'Quotation Builder | สร้างใบเสนอราคาอย่างมืออาชีพ',
      description: 'สร้างใบเสนอราคาสำหรับโปรเจค Web App, Mobile App, SaaS และระบบภายในองค์กร ด้วยระบบ Feature-based ที่ใช้งานง่าย',
      keywords: ['quotation', 'proposal', 'web development', 'mobile app', 'saas', 'pricing'],
      openGraph: {
        title: 'Quotation Builder | สร้างใบเสนอราคาอย่างมืออาชีพ',
        description: 'สร้างใบเสนอราคาสำหรับโปรเจค Web App, Mobile App, SaaS และระบบภายในองค์กร',
        type: 'website',
      },
    };
  }
}
