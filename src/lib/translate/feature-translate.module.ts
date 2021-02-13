import { Inject, NgModule, Optional } from '@angular/core';
import { TranslatePipe } from './translate.pipe';
import { FEATURE_CONFIGURATION, FeatureConfiguration } from '../configuration/feature-configuration';
import { LanguageStore } from '../language/language-store';
import { BundleCollectionStore } from '../bundle/bundle-collection-store';

@NgModule({
  declarations: [
    TranslatePipe
  ],
  exports: [
    TranslatePipe
  ]
})
export class FeatureTranslateModule {
  constructor(
    @Optional() @Inject(FEATURE_CONFIGURATION) configurations: Array<FeatureConfiguration>,
    languageStore: LanguageStore,
    bundlesStore: BundleCollectionStore
  ) {
    if (configurations) {
      for (const configuration of configurations) {
        bundlesStore.loadMany({
          language: languageStore.snapshot.current,
          bundleIds: configuration.bundles
        });
      }
    }
  }
}
