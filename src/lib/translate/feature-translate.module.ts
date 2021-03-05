import { Inject, NgModule, Optional } from '@angular/core';
import { BundleCollectionStore } from '../bundle/bundle-collection-store';
import { BundlesRequest } from '../bundle/bundles-request';
import { FEATURE_CONFIGURATION, FeatureConfiguration } from '../configuration/feature-configuration';
import { LanguageStore } from '../language/language-store';
import { TranslatePipe } from './translate.pipe';

/**
 * Represents a feature translation module which provides an infrastructure for lazy modules translations.
 * @since 2.0.0
 * @internal
 */
@NgModule({
  declarations: [
    TranslatePipe,
  ],
  exports: [
    TranslatePipe,
  ],
})
export class FeatureTranslateModule {

  constructor(
    @Optional() @Inject(FEATURE_CONFIGURATION) configurations: Array<FeatureConfiguration>,
    languageStore: LanguageStore,
    bundlesStore: BundleCollectionStore,
  ) {
    if (configurations) {
      for (const configuration of configurations) {
        bundlesStore.loadMany(new BundlesRequest(languageStore.snapshot.current, configuration.bundles));
      }
    }
  }
}
