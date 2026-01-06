/**
 * PricingPresenterServerFactory
 */

import { MockPricingRepository } from '@/src/infrastructure/repositories/mock/MockPricingRepository';
import { PricingPresenter } from './PricingPresenter';

export class PricingPresenterServerFactory {
  static create(): PricingPresenter {
    const repository = new MockPricingRepository();
    return new PricingPresenter(repository);
  }
}

export function createServerPricingPresenter(): PricingPresenter {
  return PricingPresenterServerFactory.create();
}
