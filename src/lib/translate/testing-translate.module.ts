import { NgModule } from '@angular/core';
import { TranslatePipe } from './translate.pipe';

/**
 * Represents a testing translate module.
 * @since 2.0.0
 */
@NgModule({
  declarations: [
    TranslatePipe,
  ],
  exports: [
    TranslatePipe,
  ],
})
export class TestingTranslateModule {
}
