/**
 * BuilderPresenter
 * Handles business logic for Quotation Builder page
 * Receives repository via dependency injection
 */

import {
    Feature,
    FeatureCategory,
    IFeatureRepository,
    ProjectType,
    ProjectTypeConfig,
} from '@/src/application/repositories/IFeatureRepository';
import { Metadata } from 'next';

export interface BuilderViewModel {
  projectTypes: ProjectTypeConfig[];
  features: Feature[];
  categories: FeatureCategory[];
}

/**
 * Presenter for Builder page
 */
export class BuilderPresenter {
  constructor(
    private readonly repository: IFeatureRepository
  ) {}

  /**
   * Get view model for the page
   */
  async getViewModel(projectType?: ProjectType): Promise<BuilderViewModel> {
    try {
      const [projectTypes, allFeatures] = await Promise.all([
        this.repository.getProjectTypes(),
        projectType 
          ? this.repository.getByProjectType(projectType)
          : this.repository.getAll(),
      ]);

      // Get unique categories
      const categories = [...new Set(allFeatures.map((f) => f.category))] as FeatureCategory[];

      return {
        projectTypes,
        features: allFeatures,
        categories,
      };
    } catch (error) {
      console.error('Error getting builder view model:', error);
      throw error;
    }
  }

  /**
   * Get features by category
   */
  async getFeaturesByCategory(category: FeatureCategory): Promise<Feature[]> {
    return this.repository.getByCategory(category);
  }

  /**
   * Validate feature dependencies
   */
  async validateDependencies(featureId: string, selectedIds: string[]) {
    return this.repository.validateDependencies(featureId, selectedIds);
  }

  /**
   * Generate metadata for the page
   */
  generateMetadata(): Metadata {
    return {
      title: 'สร้างใบเสนอราคา | Quotation Builder',
      description: 'เลือกฟีเจอร์และสร้างใบเสนอราคาสำหรับโปรเจคซอฟต์แวร์ของคุณ',
    };
  }
}
