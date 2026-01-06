/**
 * TemplatesPresenterServerFactory
 * Factory for creating TemplatesPresenter instances on the server side
 */

import { MockTemplateRepository } from '@/src/infrastructure/repositories/mock/MockTemplateRepository';
import { TemplatesPresenter } from './TemplatesPresenter';

export class TemplatesPresenterServerFactory {
  static create(): TemplatesPresenter {
    const repository = new MockTemplateRepository();
    return new TemplatesPresenter(repository);
  }
}

export function createServerTemplatesPresenter(): TemplatesPresenter {
  return TemplatesPresenterServerFactory.create();
}
