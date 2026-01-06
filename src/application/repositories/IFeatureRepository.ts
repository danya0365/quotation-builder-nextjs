/**
 * IFeatureRepository
 * Repository interface for Feature data access
 * Following Clean Architecture - this is in the Application layer
 */

/**
 * Project type supported by the quotation builder
 */
export type ProjectType = 'web-app' | 'mobile-app' | 'internal-system' | 'saas';

/**
 * Feature category for grouping features
 */
export type FeatureCategory = 
  | 'core'           // Core functionality (must have)
  | 'ui-ux'          // User Interface / Experience
  | 'backend'        // Backend / API
  | 'database'       // Database & Storage
  | 'auth'           // Authentication & Authorization
  | 'integration'    // Third-party integrations
  | 'analytics'      // Analytics & Reporting
  | 'security'       // Security features
  | 'performance'    // Performance optimization
  | 'support'        // Support & Maintenance
  | 'addon';         // Add-on features

/**
 * Feature item for quotation
 */
export interface Feature {
  id: string;
  name: string;
  description: string;        // Marketing-friendly description
  price: number;              // Base price in THB
  category: FeatureCategory;
  level: 'basic' | 'standard' | 'premium';
  dependencies?: string[];    // IDs of required features
  recommendedFor: ProjectType[];
  estimatedDays?: number;     // Estimated development days
  icon?: string;              // Emoji or icon name
  isPopular?: boolean;        // Mark as popular/recommended
}

/**
 * Project type configuration
 */
export interface ProjectTypeConfig {
  id: ProjectType;
  name: string;
  nameTh: string;
  description: string;
  icon: string;
  basePrice: number;          // Starting price
  color: string;              // Theme color for UI
  recommendedFeatures: string[]; // Feature IDs recommended for this type
}

/**
 * Quotation item (selected feature with quantity)
 */
export interface QuotationItem {
  featureId: string;
  feature: Feature;
  quantity: number;
  subtotal: number;
}

/**
 * Complete quotation data
 */
export interface Quotation {
  id: string;
  projectType: ProjectType;
  projectName: string;
  clientName?: string;
  clientEmail?: string;
  items: QuotationItem[];
  subtotal: number;
  discount: number;
  discountPercent: number;
  tax: number;
  taxPercent: number;
  total: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  validUntil?: string;
}

/**
 * Feature statistics
 */
export interface FeatureStats {
  totalFeatures: number;
  byCategory: Record<FeatureCategory, number>;
  byProjectType: Record<ProjectType, number>;
  averagePrice: number;
}

export interface IFeatureRepository {
  /**
   * Get feature by ID
   */
  getById(id: string): Promise<Feature | null>;

  /**
   * Get all features
   */
  getAll(): Promise<Feature[]>;

  /**
   * Get features by project type
   */
  getByProjectType(projectType: ProjectType): Promise<Feature[]>;

  /**
   * Get features by category
   */
  getByCategory(category: FeatureCategory): Promise<Feature[]>;

  /**
   * Get all project type configurations
   */
  getProjectTypes(): Promise<ProjectTypeConfig[]>;

  /**
   * Get project type by ID
   */
  getProjectTypeById(id: ProjectType): Promise<ProjectTypeConfig | null>;

  /**
   * Get feature dependencies (check if all required features are selected)
   */
  validateDependencies(featureId: string, selectedIds: string[]): Promise<{
    valid: boolean;
    missingDependencies: Feature[];
  }>;

  /**
   * Get statistics
   */
  getStats(): Promise<FeatureStats>;
}
