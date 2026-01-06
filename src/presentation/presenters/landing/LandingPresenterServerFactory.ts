/**
 * LandingPresenterServerFactory
 * Factory for creating LandingPresenter instances on the server side
 * ✅ Injects the appropriate repository (Mock or Real)
 */

import { MockLandingRepository } from '@/src/infrastructure/repositories/mock/MockLandingRepository';
import { LandingPresenter } from './LandingPresenter';
// import { SupabaseLandingRepository } from '@/src/infrastructure/repositories/supabase/SupabaseLandingRepository';

export class LandingPresenterServerFactory {
  static create(): LandingPresenter {
    // ✅ Use Mock Repository for development
    const repository = new MockLandingRepository();
    
    // ⏳ TODO: Switch to Supabase Repository when backend is ready
    // const supabase = createServerSupabaseClient();
    // const repository = new SupabaseLandingRepository(supabase);

    return new LandingPresenter(repository);
  }
}

export function createServerLandingPresenter(): LandingPresenter {
  return LandingPresenterServerFactory.create();
}
