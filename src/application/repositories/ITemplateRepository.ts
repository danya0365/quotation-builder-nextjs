/**
 * ITemplateRepository
 * Repository interface for Quotation Template data access
 */

import { Feature, ProjectType } from './IFeatureRepository';

/**
 * Template category for grouping
 */
export type TemplateCategory = 
  | 'business'      // Business applications
  | 'ecommerce'     // E-commerce & retail
  | 'healthcare'    // Healthcare & medical
  | 'education'     // Education & LMS
  | 'hospitality'   // Hotel, restaurant, queue
  | 'enterprise'    // Enterprise solutions
  | 'startup';      // Startup MVPs

/**
 * Template definition
 */
export interface Template {
  id: string;
  name: string;
  nameTh: string;
  description: string;
  category: TemplateCategory;
  projectType: ProjectType;
  icon: string;
  image?: string;
  featureIds: string[];           // Pre-selected feature IDs
  estimatedPrice: number;         // Estimated total price
  estimatedDays: number;          // Estimated development days
  isPopular?: boolean;
  isFeatured?: boolean;
  tags: string[];
}

/**
 * Template with expanded features
 */
export interface TemplateWithFeatures extends Template {
  features: Feature[];
}

export interface ITemplateRepository {
  /**
   * Get all templates
   */
  getAll(): Promise<Template[]>;

  /**
   * Get template by ID
   */
  getById(id: string): Promise<Template | null>;

  /**
   * Get templates by category
   */
  getByCategory(category: TemplateCategory): Promise<Template[]>;

  /**
   * Get templates by project type
   */
  getByProjectType(projectType: ProjectType): Promise<Template[]>;

  /**
   * Get featured templates
   */
  getFeatured(): Promise<Template[]>;

  /**
   * Get template with expanded features
   */
  getWithFeatures(id: string): Promise<TemplateWithFeatures | null>;

  /**
   * Search templates
   */
  search(query: string): Promise<Template[]>;
}
