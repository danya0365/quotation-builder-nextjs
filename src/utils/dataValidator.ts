/**
 * Data Validation Utility
 * Validates references between Features, Templates, and ProjectTypes
 * Helps catch errors like typos in feature IDs or missing dependencies
 */

import { Feature, ProjectTypeConfig } from '@/src/application/repositories/IFeatureRepository';
import { Template } from '@/src/application/repositories/ITemplateRepository';

/**
 * Validation error types
 */
export type ValidationErrorType = 
  | 'MISSING_FEATURE_ID'
  | 'MISSING_DEPENDENCY'
  | 'CIRCULAR_DEPENDENCY'
  | 'INVALID_PROJECT_TYPE'
  | 'INVALID_CATEGORY'
  | 'MISSING_RECOMMENDED_FEATURE';

/**
 * Validation error
 */
export interface ValidationError {
  type: ValidationErrorType;
  source: string;          // e.g., 'Template:queue-management-system' or 'Feature:queue-core'
  field: string;           // e.g., 'featureIds' or 'dependencies'
  invalidValue: string;    // The invalid ID or value
  message: string;
}

/**
 * Validation result
 */
export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: ValidationError[];
}

/**
 * DataValidator class
 * Validates data integrity between repositories
 */
export class DataValidator {
  private featureIds: Set<string>;
  private projectTypeIds: Set<string>;
  private categoryIds: Set<string>;

  constructor(
    private features: Feature[],
    private projectTypes: ProjectTypeConfig[],
    private templates: Template[]
  ) {
    // Build lookup sets for faster validation
    this.featureIds = new Set(features.map(f => f.id));
    this.projectTypeIds = new Set(projectTypes.map(p => p.id));
    this.categoryIds = new Set([
      'core', 'ui-ux', 'backend', 'database', 'auth', 
      'integration', 'analytics', 'security', 'performance', 
      'support', 'addon'
    ]);
  }

  /**
   * Run all validations
   */
  validateAll(): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationError[] = [];

    // Validate Features
    const featureResult = this.validateFeatures();
    errors.push(...featureResult.errors);
    warnings.push(...featureResult.warnings);

    // Validate Templates
    const templateResult = this.validateTemplates();
    errors.push(...templateResult.errors);
    warnings.push(...templateResult.warnings);

    // Validate ProjectTypes
    const projectTypeResult = this.validateProjectTypes();
    errors.push(...projectTypeResult.errors);
    warnings.push(...projectTypeResult.warnings);

    return {
      valid: errors.length === 0,
      errors,
      warnings,
    };
  }

  /**
   * Validate all features
   */
  validateFeatures(): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationError[] = [];

    for (const feature of this.features) {
      // Validate dependencies
      if (feature.dependencies) {
        for (const depId of feature.dependencies) {
          if (!this.featureIds.has(depId)) {
            errors.push({
              type: 'MISSING_DEPENDENCY',
              source: `Feature:${feature.id}`,
              field: 'dependencies',
              invalidValue: depId,
              message: `Feature "${feature.name}" has dependency "${depId}" which does not exist`,
            });
          }
        }

        // Check for circular dependencies
        const circular = this.checkCircularDependency(feature.id, feature.dependencies);
        if (circular) {
          errors.push({
            type: 'CIRCULAR_DEPENDENCY',
            source: `Feature:${feature.id}`,
            field: 'dependencies',
            invalidValue: circular,
            message: `Feature "${feature.name}" has circular dependency: ${circular}`,
          });
        }
      }

      // Validate recommendedFor (project types)
      for (const projectType of feature.recommendedFor) {
        if (!this.projectTypeIds.has(projectType)) {
          errors.push({
            type: 'INVALID_PROJECT_TYPE',
            source: `Feature:${feature.id}`,
            field: 'recommendedFor',
            invalidValue: projectType,
            message: `Feature "${feature.name}" references invalid project type "${projectType}"`,
          });
        }
      }

      // Validate category
      if (!this.categoryIds.has(feature.category)) {
        errors.push({
          type: 'INVALID_CATEGORY',
          source: `Feature:${feature.id}`,
          field: 'category',
          invalidValue: feature.category,
          message: `Feature "${feature.name}" has invalid category "${feature.category}"`,
        });
      }
    }

    return { valid: errors.length === 0, errors, warnings };
  }

  /**
   * Validate all templates
   */
  validateTemplates(): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationError[] = [];

    for (const template of this.templates) {
      // Validate featureIds
      for (const featureId of template.featureIds) {
        if (!this.featureIds.has(featureId)) {
          errors.push({
            type: 'MISSING_FEATURE_ID',
            source: `Template:${template.id}`,
            field: 'featureIds',
            invalidValue: featureId,
            message: `Template "${template.nameTh}" references non-existent feature "${featureId}"`,
          });
        }
      }

      // Validate projectType
      if (!this.projectTypeIds.has(template.projectType)) {
        errors.push({
          type: 'INVALID_PROJECT_TYPE',
          source: `Template:${template.id}`,
          field: 'projectType',
          invalidValue: template.projectType,
          message: `Template "${template.nameTh}" has invalid project type "${template.projectType}"`,
        });
      }

      // Check for missing dependencies in template features
      const templateFeatureSet = new Set(template.featureIds);
      for (const featureId of template.featureIds) {
        const feature = this.features.find(f => f.id === featureId);
        if (feature?.dependencies) {
          for (const depId of feature.dependencies) {
            if (!templateFeatureSet.has(depId)) {
              warnings.push({
                type: 'MISSING_DEPENDENCY',
                source: `Template:${template.id}`,
                field: 'featureIds',
                invalidValue: depId,
                message: `Template "${template.nameTh}" includes "${feature.name}" but missing its dependency "${depId}"`,
              });
            }
          }
        }
      }
    }

    return { valid: errors.length === 0, errors, warnings };
  }

  /**
   * Validate project type configurations
   */
  validateProjectTypes(): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationError[] = [];

    for (const projectType of this.projectTypes) {
      // Validate recommendedFeatures
      if (projectType.recommendedFeatures) {
        for (const featureId of projectType.recommendedFeatures) {
          if (!this.featureIds.has(featureId)) {
            errors.push({
              type: 'MISSING_RECOMMENDED_FEATURE',
              source: `ProjectType:${projectType.id}`,
              field: 'recommendedFeatures',
              invalidValue: featureId,
              message: `Project type "${projectType.nameTh}" recommends non-existent feature "${featureId}"`,
            });
          }
        }
      }
    }

    return { valid: errors.length === 0, errors, warnings };
  }

  /**
   * Check for circular dependencies
   */
  private checkCircularDependency(
    startId: string,
    dependencies: string[],
    visited: Set<string> = new Set()
  ): string | null {
    for (const depId of dependencies) {
      if (depId === startId) {
        return `${startId} -> ${depId}`;
      }

      if (visited.has(depId)) {
        continue;
      }

      visited.add(depId);

      const depFeature = this.features.find(f => f.id === depId);
      if (depFeature?.dependencies) {
        const circular = this.checkCircularDependency(
          startId,
          depFeature.dependencies,
          visited
        );
        if (circular) {
          return `${depId} -> ${circular}`;
        }
      }
    }

    return null;
  }

  /**
   * Format validation result as string for logging
   */
  static formatResult(result: ValidationResult): string {
    const lines: string[] = [];

    if (result.valid && result.warnings.length === 0) {
      lines.push('✅ All validations passed!');
      return lines.join('\n');
    }

    if (result.errors.length > 0) {
      lines.push(`❌ ${result.errors.length} Error(s):`);
      for (const error of result.errors) {
        lines.push(`   [${error.type}] ${error.message}`);
      }
    }

    if (result.warnings.length > 0) {
      lines.push(`⚠️ ${result.warnings.length} Warning(s):`);
      for (const warning of result.warnings) {
        lines.push(`   [${warning.type}] ${warning.message}`);
      }
    }

    return lines.join('\n');
  }
}

/**
 * Quick validation function for use in development
 */
export async function validateRepositoryData(): Promise<ValidationResult> {
  // Dynamic import to avoid circular dependencies
  const { MockFeatureRepository } = await import('@/src/infrastructure/repositories/mock/MockFeatureRepository');
  const { MockTemplateRepository } = await import('@/src/infrastructure/repositories/mock/MockTemplateRepository');

  const featureRepo = new MockFeatureRepository();
  const templateRepo = new MockTemplateRepository();

  const [features, projectTypes, templates] = await Promise.all([
    featureRepo.getAll(),
    featureRepo.getProjectTypes(),
    templateRepo.getAll(),
  ]);

  const validator = new DataValidator(features, projectTypes, templates);
  return validator.validateAll();
}
