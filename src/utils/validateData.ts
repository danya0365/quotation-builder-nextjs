/**
 * Data Validation Test Script
 * Run with: npx tsx src/utils/validateData.ts
 */

import { MockFeatureRepository } from '@/src/infrastructure/repositories/mock/MockFeatureRepository';
import { MockTemplateRepository } from '@/src/infrastructure/repositories/mock/MockTemplateRepository';
import { DataValidator } from './dataValidator';

async function main() {
  console.log('🔍 Starting Data Validation...\n');

  const featureRepo = new MockFeatureRepository();
  const templateRepo = new MockTemplateRepository();

  const [features, projectTypes, templates] = await Promise.all([
    featureRepo.getAll(),
    featureRepo.getProjectTypes(),
    templateRepo.getAll(),
  ]);

  console.log(`📊 Data Summary:`);
  console.log(`   Features: ${features.length}`);
  console.log(`   Project Types: ${projectTypes.length}`);
  console.log(`   Templates: ${templates.length}\n`);

  const validator = new DataValidator(features, projectTypes, templates);
  const result = validator.validateAll();

  console.log(DataValidator.formatResult(result));

  if (!result.valid) {
    console.log('\n❌ Validation failed! Please fix the errors above.');
    process.exit(1);
  }

  if (result.warnings.length > 0) {
    console.log('\n⚠️ Validation passed with warnings. Consider fixing them.');
  }

  console.log('\n✅ Validation complete!');
}

main().catch(console.error);
