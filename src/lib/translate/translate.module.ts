import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { DEFAULT_LANGUAGE, LANGUAGE_MAPPING, RootConfiguration, SUPPORTED_LANGUAGES } from '../configuration/root-configuration';
import { FEATURE_CONFIGURATION, FeatureConfiguration } from '../configuration/feature-configuration';
import { BundleRepository } from '../bundle/bundle-repository';
import { LanguageSource } from '../language/language-source';
import { LanguageChangeHandler } from '../language/language-change-handler';
import { RootTranslateModule } from './root-translate.module';
import { FeatureTranslateModule } from './feature-translate.module';
import { TranslateService } from './translate.service';
import { GlobalTranslateService } from './global-translate.service';

@NgModule()
export class TranslateModule {

  static forRoot(options: RootConfiguration): ModuleWithProviders<RootTranslateModule> {
    return {
      ngModule: RootTranslateModule,
      providers: [
        {
          provide: DEFAULT_LANGUAGE,
          ...options.language.default,
        } as Provider,
        {
          provide: SUPPORTED_LANGUAGES,
          ...options.language.supported,
        } as Provider,
        {
          provide: LANGUAGE_MAPPING,
          ...options.language.mapping,
        } as Provider,
        {
          provide: LanguageChangeHandler,
          ...options.language.change.handler,
        } as Provider,
        {
          provide: LanguageSource,
          ...options.language.source,
        } as Provider,
        {
          provide: BundleRepository,
          ...options.bundle.repository,
        } as Provider,
        {
          provide: TranslateService,
          useExisting: GlobalTranslateService,
        },
      ],
    };
  }

  static forFeature(configuration: FeatureConfiguration): ModuleWithProviders<FeatureTranslateModule> {
    return {
      ngModule: FeatureTranslateModule,
      providers: [
        {
          provide: FEATURE_CONFIGURATION,
          useValue: configuration,
          multi: true,
        },
      ],
    };
  }
}
