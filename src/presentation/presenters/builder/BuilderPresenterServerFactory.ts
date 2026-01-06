/**
 * BuilderPresenterServerFactory
 * Factory for creating BuilderPresenter instances on the server side
 */

import { MockFeatureRepository } from '@/src/infrastructure/repositories/mock/MockFeatureRepository';
import { BuilderPresenter } from './BuilderPresenter';

export class BuilderPresenterServerFactory {
  static create(): BuilderPresenter {
    const repository = new MockFeatureRepository();
    return new BuilderPresenter(repository);
  }
}

export function createServerBuilderPresenter(): BuilderPresenter {
  return BuilderPresenterServerFactory.create();
}
