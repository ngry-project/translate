import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { BundleRepository } from '../bundle/bundle-repository';
import { MissingBundleHandler } from '../bundle/missing-bundle-handler';
import { DefaultMissingBundleHandler } from '../bundle/default-missing-bundle-handler';
import { RootConfiguration } from '../configuration/root-configuration';
import { FeatureConfiguration } from '../configuration/feature-configuration';
import { TestingConfiguration } from '../configuration/testing-configuration';
import { DEFAULT_LANGUAGE, FEATURE_CONFIGURATION, LANGUAGE_MAPPING, SUPPORTED_LANGUAGES } from '../configuration/injection-token';
import { Language } from '../language/language';
import { LanguageSource } from '../language/language-source';
import { DefaultLanguageSource } from '../language/default-language-source';
import { LanguageChangeHandler } from '../language/language-change-handler';
import { DefaultLanguageChangeHandler } from '../language/default-language-change-handler';
import { FakeMissingBundleHandler } from '../testing/fake-missing-bundle-handler';
import { RootTranslateModule } from './root-translate.module';
import { FeatureTranslateModule } from './feature-translate.module';
import { TranslateService } from './translate.service';
import { RootTranslateService } from './root-translate.service';
import { FakeLanguageChangeHandler } from '../testing/fake-language-change-handler';
import { FakeLanguageSource } from '../testing/fake-language-source';
import { TestingTranslateModule } from './testing-translate.module';
import { FakeTranslateService } from '../testing/fake-translate.service';
import { StaticBundleRepository } from '../bundle/static-bundle-repository';

/**
 * Represents a main translation module.
 * @since 2.0.0
 */
@NgModule()
export class TranslateModule {
  /**
   * Registers translation module for app root.
   * @since 2.0.0
   */
  static forRoot(configuration: RootConfiguration): ModuleWithProviders<RootTranslateModule> {
    return {
      ngModule: RootTranslateModule,
      providers: [
        {
          provide: DEFAULT_LANGUAGE,
          ...configuration.language.default,
        } as Provider,
        {
          provide: SUPPORTED_LANGUAGES,
          ...(configuration.language.supported ?? {
            useFactory(language: Language): Array<Language> {
              return [language];
            },
            deps: [DEFAULT_LANGUAGE],
          }),
        } as Provider,
        {
          provide: LANGUAGE_MAPPING,
          ...(configuration.language.mapping ?? {
            useValue: {},
          }),
        } as Provider,
        {
          provide: LanguageChangeHandler,
          ...(configuration.language.handler?.change ?? {
            useExisting: DefaultLanguageChangeHandler,
          }),
        } as Provider,
        {
          provide: LanguageSource,
          ...(configuration.language.source ?? {
            useExisting: DefaultLanguageSource,
          }),
        } as Provider,
        {
          provide: BundleRepository,
          ...configuration.bundle.repository,
        } as Provider,
        {
          provide: MissingBundleHandler,
          ...(configuration.bundle.handler?.missing ?? {
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

  /**
   * Registers translation module for feature.
   * @since 2.0.0
   */
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

  /**
   * Registers translation module in tests.
   * @since 2.0.0
   */
  static forTesting(configuration: TestingConfiguration): ModuleWithProviders<TestingTranslateModule> {
    return {
      ngModule: TestingTranslateModule,
      providers: [
        {
          provide: DEFAULT_LANGUAGE,
          ...configuration.language.default,
        } as Provider,
        {
          provide: SUPPORTED_LANGUAGES,
          ...(configuration.language.supported ?? {
            useFactory(language: Language): Array<Language> {
              return [language];
            },
            deps: [DEFAULT_LANGUAGE],
          }),
        } as Provider,
        {
          provide: LANGUAGE_MAPPING,
          ...(configuration.language.mapping ?? {
            useValue: {},
          }),
        } as Provider,
        {
          provide: LanguageChangeHandler,
          ...(configuration.language.handler?.change ?? {
            useExisting: FakeLanguageChangeHandler,
          }),
        } as Provider,
        {
          provide: LanguageSource,
          ...(configuration.language.source ?? {
            useExisting: FakeLanguageSource,
          }),
        } as Provider,
        {
          provide: BundleRepository,
          ...(configuration.bundle?.repository ?? {
            useFactory(): BundleRepository {
              return new StaticBundleRepository();
            },
          }),
        } as Provider,
        {
          provide: MissingBundleHandler,
          ...(configuration.bundle?.handler?.missing ?? {
            useExisting: FakeMissingBundleHandler,
          }),
        } as Provider,
        {
          provide: TranslateService,
          useExisting: FakeTranslateService,
        },
      ],
    };
  }
}
