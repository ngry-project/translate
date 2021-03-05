import { TestBed } from '@angular/core/testing';
import {
  BrowserLanguageSource,
  BundleRepository,
  DEFAULT_LANGUAGE,
  FakeLanguageChangeHandler,
  FakeMissingBundleHandler,
  LANGUAGE_MAPPING,
  LanguageChangeHandler,
  LanguageSource,
  MissingBundleHandler,
  SUPPORTED_LANGUAGES,
  TranslateModule,
  TranslateService,
} from '../../public-api';
import { BundleRepositoryFixture } from '../fixture/bundle-repository-fixture';
import { DefaultMissingBundleHandler } from '../../lib/bundle/default-missing-bundle-handler';
import { DefaultLanguageChangeHandler } from '../../lib/language/default-language-change-handler';
import { DefaultLanguageSource } from '../../lib/language/default-language-source';
import { RootTranslateService } from '../../lib/translate/root-translate.service';

describe('TranslateModule', () => {
  describe('forRoot', () => {
    describe('default language', () => {
      it(`should register DEFAULT_LANGUAGE in root`, () => {
        TestBed.configureTestingModule({
          imports: [
            TranslateModule.forRoot({
              language: {
                default: {
                  useValue: 'en',
                },
              },
              bundle: {
                repository: {
                  useExisting: BundleRepositoryFixture,
                },
              },
            }),
          ],
        });

        const defaultLanguage = TestBed.inject(DEFAULT_LANGUAGE);

        expect(defaultLanguage).toBe('en');
      });
    });

    describe('supported languages', () => {
      it(`should register SUPPORTED_LANGUAGES in root with default language as a single supported one`, () => {
        TestBed.configureTestingModule({
          imports: [
            TranslateModule.forRoot({
              language: {
                default: {
                  useValue: 'en',
                },
              },
              bundle: {
                repository: {
                  useExisting: BundleRepositoryFixture,
                },
              },
            }),
          ],
        });

        const supportedLanguages = TestBed.inject(SUPPORTED_LANGUAGES);

        expect(supportedLanguages.length).toBe(1);
        expect(supportedLanguages).toContain('en');
      });

      it(`should register SUPPORTED_LANGUAGES in root with list of supported languages`, () => {
        TestBed.configureTestingModule({
          imports: [
            TranslateModule.forRoot({
              language: {
                default: {
                  useValue: 'en',
                },
                supported: {
                  useValue: ['en', 'ua'],
                },
              },
              bundle: {
                repository: {
                  useExisting: BundleRepositoryFixture,
                },
              },
            }),
          ],
        });

        const supportedLanguages = TestBed.inject(SUPPORTED_LANGUAGES);

        expect(supportedLanguages.length).toBe(2);
        expect(supportedLanguages).toContain('en');
        expect(supportedLanguages).toContain('ua');
      });
    });

    describe('language mapping', () => {
      it(`should register LANGUAGE_MAPPING in root with empty language mapping by default`, () => {
        TestBed.configureTestingModule({
          imports: [
            TranslateModule.forRoot({
              language: {
                default: {
                  useValue: 'en',
                },
              },
              bundle: {
                repository: {
                  useExisting: BundleRepositoryFixture,
                },
              },
            }),
          ],
        });

        const languageMapping = TestBed.inject(LANGUAGE_MAPPING);

        expect(languageMapping).toEqual({});
      });

      it(`should register LANGUAGE_MAPPING in root with custom language mapping`, () => {
        TestBed.configureTestingModule({
          imports: [
            TranslateModule.forRoot({
              language: {
                default: {
                  useValue: 'en',
                },
                mapping: {
                  useValue: {
                    ua: ['ua', 'be', 'ru'],
                  },
                },
              },
              bundle: {
                repository: {
                  useExisting: BundleRepositoryFixture,
                },
              },
            }),
          ],
        });

        const languageMapping = TestBed.inject(LANGUAGE_MAPPING);

        expect(languageMapping).toEqual({
          ua: ['ua', 'be', 'ru'],
        });
      });
    });

    describe('language source', () => {
      it(`should register LanguageSource in root with default implementation`, () => {
        TestBed.configureTestingModule({
          imports: [
            TranslateModule.forRoot({
              language: {
                default: {
                  useValue: 'en',
                },
              },
              bundle: {
                repository: {
                  useExisting: BundleRepositoryFixture,
                },
              },
            }),
          ],
        });

        const languageSource = TestBed.inject(LanguageSource);

        expect(languageSource).toBeInstanceOf(DefaultLanguageSource);
      });

      it(`should register LanguageSource in root with custom implementation`, () => {
        TestBed.configureTestingModule({
          imports: [
            TranslateModule.forRoot({
              language: {
                default: {
                  useValue: 'en',
                },
                source: {
                  useExisting: BrowserLanguageSource,
                },
              },
              bundle: {
                repository: {
                  useExisting: BundleRepositoryFixture,
                },
              },
            }),
          ],
        });

        const languageSource = TestBed.inject(LanguageSource);

        expect(languageSource).toBeInstanceOf(BrowserLanguageSource);
      });
    });

    describe('language change handler', () => {
      it(`should register LanguageChangeHandler in root with default implementation`, () => {
        TestBed.configureTestingModule({
          imports: [
            TranslateModule.forRoot({
              language: {
                default: {
                  useValue: 'en',
                },
              },
              bundle: {
                repository: {
                  useExisting: BundleRepositoryFixture,
                },
              },
            }),
          ],
        });

        const languageChangeHandler = TestBed.inject(LanguageChangeHandler);

        expect(languageChangeHandler).toBeInstanceOf(DefaultLanguageChangeHandler);
      });

      it(`should register LanguageChangeHandler in root with custom implementation`, () => {
        TestBed.configureTestingModule({
          imports: [
            TranslateModule.forRoot({
              language: {
                default: {
                  useValue: 'en',
                },
                handler: {
                  change: {
                    useExisting: FakeLanguageChangeHandler,
                  },
                },
              },
              bundle: {
                repository: {
                  useExisting: BundleRepositoryFixture,
                },
              },
            }),
          ],
        });

        const languageChangeHandler = TestBed.inject(LanguageChangeHandler);

        expect(languageChangeHandler).toBeInstanceOf(FakeLanguageChangeHandler);
      });
    });

    describe('bundle repository', () => {
      it(`should register BundleRepository in root`, () => {
        TestBed.configureTestingModule({
          imports: [
            TranslateModule.forRoot({
              language: {
                default: {
                  useValue: 'en',
                },
              },
              bundle: {
                repository: {
                  useExisting: BundleRepositoryFixture,
                },
              },
            }),
          ],
        });

        const bundleRepository = TestBed.inject(BundleRepository);

        expect(bundleRepository).toBeInstanceOf(BundleRepositoryFixture);
      });
    });

    describe('missing bundle handler', () => {
      it(`should register MissingBundleHandler in root with default implementation`, () => {
        TestBed.configureTestingModule({
          imports: [
            TranslateModule.forRoot({
              language: {
                default: {
                  useValue: 'en',
                },
              },
              bundle: {
                repository: {
                  useExisting: BundleRepositoryFixture,
                },
              },
            }),
          ],
        });

        const missingBundleHandler = TestBed.inject(MissingBundleHandler);

        expect(missingBundleHandler).toBeInstanceOf(DefaultMissingBundleHandler);
      });

      it(`should register MissingBundleHandler in root with custom implementation`, () => {
        TestBed.configureTestingModule({
          imports: [
            TranslateModule.forRoot({
              language: {
                default: {
                  useValue: 'en',
                },
              },
              bundle: {
                repository: {
                  useExisting: BundleRepositoryFixture,
                },
                handler: {
                  missing: {
                    useExisting: FakeMissingBundleHandler,
                  },
                },
              },
            }),
          ],
        });

        const missingBundleHandler = TestBed.inject(MissingBundleHandler);

        expect(missingBundleHandler).toBeInstanceOf(FakeMissingBundleHandler);
      });
    });

    describe('translate service', () => {
      it('should register TranslateService in root with RootTranslateService as implementation', () => {
        TestBed.configureTestingModule({
          imports: [
            TranslateModule.forRoot({
              language: {
                default: {
                  useValue: 'en',
                },
              },
              bundle: {
                repository: {
                  useExisting: BundleRepositoryFixture,
                },
              },
            }),
          ],
        });

        const service = TestBed.inject(TranslateService);

        expect(service).toBeInstanceOf(RootTranslateService);
      });
    });

  });
});
