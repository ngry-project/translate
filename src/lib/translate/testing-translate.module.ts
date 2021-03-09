import { NgModule } from '@angular/core';
import { BaseTranslateModule } from './base-translate.module';

/**
 * Represents a testing translate module.
 * @since 2.0.0
 */
@NgModule({
  imports: [
    BaseTranslateModule,
  ],
  exports: [
    BaseTranslateModule,
  ],
})
export class TestingTranslateModule {
}
