import { TestBed } from '@angular/core/testing';
import {
  BrowserLanguageSource,
  BundleRepository,
  FakeLanguageChangeHandler,
  FakeLanguageSource,
  FakeMissingBundleHandler,
  FakeTranslateService,
  LanguageChangeHandler,
  LanguageSource,
  MissingBundleHandler,
  StaticBundleRepository,
  TranslateModule,
  TranslateService,
} from '../../public-api';
import { DefaultMissingBundleHandler } from '../../lib/bundle/default-missing-bundle-handler';
import { DefaultLanguageChangeHandler } from '../../lib/language/default-language-change-handler';
import { DefaultLanguageSource } from '../../lib/language/default-language-source';
import { RootTranslateService } from '../../lib/translate/root-translate.service';
import { BundleRepositoryFixture } from '../fixture/bundle-repository-fixture';

describe('TranslateModule', () => {
  describe('forRoot', () => {
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

  describe('forTesting', () => {
    describe('language source', () => {
      it(`should register LanguageSource in root with fake implementation`, () => {
        TestBed.configureTestingModule({
          imports: [
            TranslateModule.forTesting({
              language: {
                default: {
                  useValue: 'en',
                },
              },
            }),
          ],
        });

        const languageSource = TestBed.inject(LanguageSource);

        expect(languageSource).toBeInstanceOf(FakeLanguageSource);
      });

      it(`should register LanguageSource in root with custom implementation`, () => {
        TestBed.configureTestingModule({
          imports: [
            TranslateModule.forTesting({
              language: {
                default: {
                  useValue: 'en',
                },
                source: {
                  useExisting: BrowserLanguageSource,
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
      it(`should register LanguageChangeHandler in root with fake implementation`, () => {
        TestBed.configureTestingModule({
          imports: [
            TranslateModule.forTesting({
              language: {
                default: {
                  useValue: 'en',
                },
              },
            }),
          ],
        });

        const languageChangeHandler = TestBed.inject(LanguageChangeHandler);

        expect(languageChangeHandler).toBeInstanceOf(FakeLanguageChangeHandler);
      });

      it(`should register LanguageChangeHandler in root with custom implementation`, () => {
        TestBed.configureTestingModule({
          imports: [
            TranslateModule.forTesting({
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
            }),
          ],
        });

        const languageChangeHandler = TestBed.inject(LanguageChangeHandler);

        expect(languageChangeHandler).toBeInstanceOf(FakeLanguageChangeHandler);
      });
    });

    describe('bundle repository', () => {
      it(`should register BundleRepository in root with fake implementation`, () => {
        TestBed.configureTestingModule({
          imports: [
            TranslateModule.forTesting({
              language: {
                default: {
                  useValue: 'en',
                },
              },
            }),
          ],
        });

        const bundleRepository = TestBed.inject(BundleRepository);

        expect(bundleRepository).toBeInstanceOf(StaticBundleRepository);
      });

      it(`should register BundleRepository in root with custom implementation`, () => {
        TestBed.configureTestingModule({
          imports: [
            TranslateModule.forTesting({
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
      it(`should register MissingBundleHandler in root with fake implementation`, () => {
        TestBed.configureTestingModule({
          imports: [
            TranslateModule.forTesting({
              language: {
                default: {
                  useValue: 'en',
                },
              },
            }),
          ],
        });

        const missingBundleHandler = TestBed.inject(MissingBundleHandler);

        expect(missingBundleHandler).toBeInstanceOf(FakeMissingBundleHandler);
      });

      it(`should register MissingBundleHandler in root with custom implementation`, () => {
        TestBed.configureTestingModule({
          imports: [
            TranslateModule.forTesting({
              language: {
                default: {
                  useValue: 'en',
                },
              },
              bundle: {
                handler: {
                  missing: {
                    useExisting: DefaultMissingBundleHandler,
                  },
                },
              },
            }),
          ],
        });

        const missingBundleHandler = TestBed.inject(MissingBundleHandler);

        expect(missingBundleHandler).toBeInstanceOf(DefaultMissingBundleHandler);
      });
    });

    describe('translate service', () => {
      it('should register TranslateService in root with fake implementation', async () => {
        TestBed.configureTestingModule({
          imports: [
            TranslateModule.forTesting({
              language: {
                default: {
                  useValue: 'en',
                },
              },
            }),
          ],
        });

        const service = TestBed.inject(TranslateService);

        expect(service).toBeInstanceOf(FakeTranslateService);
      });
    });
  });
});
