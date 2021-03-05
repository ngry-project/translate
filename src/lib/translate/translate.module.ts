import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { BundleRepository } from '../bundle/bundle-repository';
import { MissingBundleHandler } from '../bundle/missing-bundle-handler';
import { DefaultMissingBundleHandler } from '../bundle/default-missing-bundle-handler';
import { DEFAULT_LANGUAGE, LANGUAGE_MAPPING, RootConfiguration, SUPPORTED_LANGUAGES } from '../configuration/root-configuration';
import { FEATURE_CONFIGURATION, FeatureConfiguration } from '../configuration/feature-configuration';
import { Language } from '../language/language';
import { LanguageSource } from '../language/language-source';
import { DefaultLanguageSource } from '../language/default-language-source';
import { LanguageChangeHandler } from '../language/language-change-handler';
import { DefaultLanguageChangeHandler } from '../language/default-language-change-handler';
import { RootTranslateModule } from './root-translate.module';
import { FeatureTranslateModule } from './feature-translate.module';
import { TranslateService } from './translate.service';
import { RootTranslateService } from './root-translate.service';

/**
 * Represents a main translation module.
 * @since 2.0.0
 */
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
          ...(options.language.supported ?? {
            useFactory(language: Language): Array<Language> {
              return [language];
            },
            deps: [DEFAULT_LANGUAGE],
          }),
        } as Provider,
        {
          provide: LANGUAGE_MAPPING,
          ...(options.language.mapping ?? {
            useValue: {},
          }),
        } as Provider,
        {
          provide: LanguageChangeHandler,
          ...(options.language.handler?.change ?? {
            useExisting: DefaultLanguageChangeHandler,
          }),
        } as Provider,
        {
          provide: LanguageSource,
          ...(options.language.source ?? {
            useExisting: DefaultLanguageSource,
          }),
        } as Provider,
        {
          provide: BundleRepository,
          ...options.bundle.repository,
        } as Provider,
        {
          provide: MissingBundleHandler,
          ...(options.bundle.handler?.missing ?? {
            useExisting: DefaultMissingBundleHandler,
          }),
        } as Provider,
        {
          provide: TranslateService,
          useExisting: RootTranslateService,
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
