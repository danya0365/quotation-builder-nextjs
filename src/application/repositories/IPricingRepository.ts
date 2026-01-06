/**
 * IPricingRepository
 * Repository interface for Pricing data access
 */

/**
 * Pricing plan tier
 */
export type PlanTier = 'starter' | 'professional' | 'enterprise';

/**
 * Plan feature item
 */
export interface PlanFeature {
  name: string;
  included: boolean;
  limit?: string;
  tooltip?: string;
}

/**
 * Pricing plan definition
 */
export interface PricingPlan {
  id: string;
  tier: PlanTier;
  name: string;
  nameTh: string;
  description: string;
  price: number;
  originalPrice?: number;
  priceNote?: string;
  billingPeriod: 'monthly' | 'yearly' | 'one-time' | 'project';
  features: PlanFeature[];
  isPopular?: boolean;
  isFeatured?: boolean;
  ctaText: string;
  ctaLink: string;
  color: string;
  icon: string;
}

/**
 * FAQ item
 */
export interface FAQItem {
  question: string;
  answer: string;
}

/**
 * Add-on service
 */
export interface AddOnService {
  id: string;
  name: string;
  description: string;
  price: number;
  priceUnit: string;
  icon: string;
}

export interface IPricingRepository {
  /**
   * Get all pricing plans
   */
  getPlans(): Promise<PricingPlan[]>;

  /**
   * Get plan by tier
   */
  getPlanByTier(tier: PlanTier): Promise<PricingPlan | null>;

  /**
   * Get FAQs
   */
  getFAQs(): Promise<FAQItem[]>;

  /**
   * Get add-on services
   */
  getAddOns(): Promise<AddOnService[]>;
}
