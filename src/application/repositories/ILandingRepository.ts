/**
 * ILandingRepository
 * Repository interface for Landing page data access
 * Following Clean Architecture - this is in the Application layer
 */

export interface HeroContent {
  badge: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  primaryButtonText: string;
  secondaryButtonText: string;
}

export interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface Stat {
  id: string;
  value: string;
  label: string;
}

export interface CTAContent {
  title: string;
  subtitle: string;
  buttonText: string;
}

export interface LandingData {
  hero: HeroContent;
  features: Feature[];
  stats: Stat[];
  cta: CTAContent;
}

export interface ILandingRepository {
  /**
   * Get all landing page data
   */
  getLandingData(): Promise<LandingData>;
}
