import { take } from 'rxjs/operators';
import { TestBed } from '@angular/core/testing';
import {
  BundleRepository,
  BundleRequest,
  FakeBundleRepository,
  FakeLanguageSource,
  FakeMissingBundleHandler,
  LanguageSource,
  MissingBundleHandler,
  TranslateModule,
  TranslateService,
} from '../../public-api';
import { BundleRepositoryFixture } from '../fixture/bundle-repository-fixture';

describe('bundles', () => {

  describe('single feature module uses single existing bundle', () => {
    let translateService: TranslateService;
    let bundleRepository: BundleRepositoryFixture;
    let missingBundleHandler: FakeMissingBundleHandler;

    beforeAll(() => {
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
              source: {
                useExisting: FakeLanguageSource,
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
          TranslateModule.forFeature({
            bundles: ['form'],
          }),
        ],
      });

      translateService = TestBed.inject(TranslateService);
      bundleRepository = TestBed.inject(BundleRepository) as BundleRepositoryFixture;
      missingBundleHandler = TestBed.inject(MissingBundleHandler) as FakeMissingBundleHandler;
    });

    describe('given', () => {
      test('the bundle exists within supported languages', () => {
        expect(bundleRepository.has('en', 'form')).toBe(true);
        expect(bundleRepository.has('ua', 'form')).toBe(true);
      });

      test('the feature module uses single bundle', () => {
        expect(bundleRepository.requests).toContainEqual(new BundleRequest('en', 'form'));
      });
    });

    describe('when', () => {
      test('the bundle has been loaded', done => {
        expect(bundleRepository.requests.length).toBe(1);
        expect(bundleRepository.responses.length).toBe(0);
        expect(bundleRepository.errors.length).toBe(0);

        bundleRepository.responses$.pipe(
          take(1),
        ).subscribe(bundle => {
          expect(bundleRepository.requests.length).toBe(1);
          expect(bundleRepository.responses.length).toBe(1);
          expect(bundleRepository.errors.length).toBe(0);
          expect(bundle).toBeDefined();

          done();
        });
      });
    });

    describe('then', () => {
      test('the missing bundle handler must not be invoked', () => {
        expect(missingBundleHandler.requests.length).toBe(0);
      });

      test(`the bundles' phrases must be available`, () => {
        expect(translateService.instant('form.field.required')).toBe('This field is required');
      });
    });
  });

  describe('single feature module uses single non-existing bundle', () => {
    let bundleRepository: BundleRepositoryFixture;
    let missingBundleHandler: FakeMissingBundleHandler;

    beforeAll(() => {
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
              source: {
                useExisting: FakeLanguageSource,
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
          TranslateModule.forFeature({
            bundles: ['forms'],
          }),
        ],
      });

      bundleRepository = TestBed.inject(BundleRepository) as BundleRepositoryFixture;
      missingBundleHandler = TestBed.inject(MissingBundleHandler) as FakeMissingBundleHandler;
    });

    describe('given', () => {
      test('the bundle does not exist within supported languages', () => {
        expect(bundleRepository.has('en', 'forms')).toBe(false);
        expect(bundleRepository.has('ua', 'forms')).toBe(false);
      });

      test('the feature module uses single bundle', () => {
        expect(bundleRepository.requests).toContainEqual(new BundleRequest('en', 'forms'));
      });
    });

    describe('when', () => {
      test('the bundle has been failed to load', done => {
        expect(bundleRepository.requests.length).toBe(1);
        expect(bundleRepository.responses.length).toBe(0);
        expect(bundleRepository.errors.length).toBe(0);

        bundleRepository.errors$.pipe(
          take(1),
        ).subscribe({
          complete(): void {
            expect(bundleRepository.requests.length).toBe(1);
            expect(bundleRepository.responses.length).toBe(0);
            expect(bundleRepository.errors.length).toBe(1);
            expect(bundleRepository.errors[0]).toBeInstanceOf(Error);
            expect(bundleRepository.errors[0].message).toBe('Bundle "forms" not found for language "en"');

            done();
          },
        });
      });
    });

    describe('then', () => {
      test('the missing bundle handler must be invoked', () => {
        expect(missingBundleHandler.requests.length).toBe(1);
        expect(missingBundleHandler.requests).toContainEqual(new BundleRequest('en', 'forms'));
      });
    });
  });

  describe('single feature module uses multiple existing bundles', () => {
    let translateService: TranslateService;
    let bundleRepository: BundleRepositoryFixture;
    let missingBundleHandler: FakeMissingBundleHandler;

    beforeAll(() => {
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
              source: {
                useExisting: FakeLanguageSource,
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
          TranslateModule.forFeature({
            bundles: ['form', 'errors'],
          }),
        ],
      });

      translateService = TestBed.inject(TranslateService);
      bundleRepository = TestBed.inject(BundleRepository) as BundleRepositoryFixture;
      missingBundleHandler = TestBed.inject(MissingBundleHandler) as FakeMissingBundleHandler;
    });

    describe('given', () => {
      test('the bundles exist within supported languages', () => {
        expect(bundleRepository.has('en', 'form')).toBe(true);
        expect(bundleRepository.has('ua', 'form')).toBe(true);
        expect(bundleRepository.has('en', 'errors')).toBe(true);
        expect(bundleRepository.has('ua', 'errors')).toBe(true);
      });

      test('the feature module uses multiple bundles', () => {
        expect(bundleRepository.requests).toContainEqual(new BundleRequest('en', 'form'));
        expect(bundleRepository.requests).toContainEqual(new BundleRequest('en', 'errors'));
      });
    });

    describe('when', () => {
      test('the bundles have been loaded', done => {
        expect(bundleRepository.requests.length).toBe(2);
        expect(bundleRepository.responses.length).toBe(0);
        expect(bundleRepository.errors.length).toBe(0);

        bundleRepository.responses$.pipe(
          take(2),
        ).subscribe({
          complete(): void {
            expect(bundleRepository.requests.length).toBe(2);
            expect(bundleRepository.responses.length).toBe(2);
            expect(bundleRepository.errors.length).toBe(0);

            done();
          },
        });
      });
    });

    describe('then', () => {
      test('the missing bundle handler must not be invoked', () => {
        expect(missingBundleHandler.requests.length).toBe(0);
      });

      test(`the bundles' phrases must be available`, () => {
        expect(translateService.instant('form.field.required')).toBe('This field is required');
        expect(translateService.instant('error.not-found')).toBe('Not found');
      });
    });
  });

  describe('multiple feature modules use multiple different existing bundles', () => {
    let translateService: TranslateService;
    let bundleRepository: BundleRepositoryFixture;
    let missingBundleHandler: FakeMissingBundleHandler;

    beforeAll(() => {
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
              source: {
                useExisting: FakeLanguageSource,
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
          TranslateModule.forFeature({
            bundles: ['form'],
          }),
          TranslateModule.forFeature({
            bundles: ['errors'],
          }),
        ],
      });

      translateService = TestBed.inject(TranslateService);
      bundleRepository = TestBed.inject(BundleRepository) as BundleRepositoryFixture;
      missingBundleHandler = TestBed.inject(MissingBundleHandler) as FakeMissingBundleHandler;
    });

    describe('given', () => {
      test('the phrase bundles exist within supported languages', () => {
        expect(bundleRepository.has('en', 'form')).toBe(true);
        expect(bundleRepository.has('ua', 'form')).toBe(true);
        expect(bundleRepository.has('en', 'errors')).toBe(true);
        expect(bundleRepository.has('ua', 'errors')).toBe(true);
      });

      test('the first feature module uses one bundle', () => {
        expect(bundleRepository.requests).toContainEqual(new BundleRequest('en', 'form'));
      });

      test('the second feature module uses another bundle', () => {
        expect(bundleRepository.requests).toContainEqual(new BundleRequest('en', 'errors'));
      });
    });

    describe('when', () => {
      test('the bundles have been loaded', done => {
        expect(bundleRepository.requests.length).toBe(2);
        expect(bundleRepository.responses.length).toBe(0);
        expect(bundleRepository.errors.length).toBe(0);

        bundleRepository.responses$.pipe(
          take(2),
        ).subscribe({
          complete(): void {
            expect(bundleRepository.requests.length).toBe(2);
            expect(bundleRepository.responses.length).toBe(2);
            expect(bundleRepository.errors.length).toBe(0);

            done();
          },
        });
      });
    });

    describe('then', () => {
      test('the missing bundle handler must not be invoked', () => {
        expect(missingBundleHandler.requests.length).toBe(0);
      });

      it(`the bundles' phrases must be available`, () => {
        expect(translateService.instant('form.field.required')).toBe('This field is required');
        expect(translateService.instant('error.not-found')).toBe('Not found');
      });
    });
  });

  describe('load known bundles for new language', () => {
    let translateService: TranslateService;
    let bundleRepository: FakeBundleRepository;
    let missingBundleHandler: FakeMissingBundleHandler;
    let languageSource: FakeLanguageSource;

    beforeAll(() => {
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
              source: {
                useExisting: FakeLanguageSource,
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
          TranslateModule.forFeature({
            bundles: ['form'],
          }),
          TranslateModule.forFeature({
            bundles: ['errors'],
          }),
        ],
      });

      translateService = TestBed.inject(TranslateService);
      bundleRepository = TestBed.inject(BundleRepository) as BundleRepositoryFixture;
      missingBundleHandler = TestBed.inject(MissingBundleHandler) as FakeMissingBundleHandler;
      languageSource = TestBed.inject(LanguageSource) as FakeLanguageSource;
    });

    describe('given', () => {
      test('the bundles exist within supported languages', () => {
        expect(bundleRepository.has('en', 'form')).toBe(true);
        expect(bundleRepository.has('ua', 'form')).toBe(true);
        expect(bundleRepository.has('en', 'errors')).toBe(true);
        expect(bundleRepository.has('ua', 'errors')).toBe(true);
      });

      test('the bundles requested by feature module(s) are loaded within initial language', done => {
        expect(bundleRepository.requests.length).toBe(2);
        expect(bundleRepository.requests).toContainEqual(new BundleRequest('en', 'form'));
        expect(bundleRepository.requests).toContainEqual(new BundleRequest('en', 'errors'));
        expect(bundleRepository.responses.length).toBe(0);
        expect(bundleRepository.errors.length).toBe(0);

        bundleRepository.responses$.pipe(
          take(2),
        ).subscribe({
          complete(): void {
            expect(bundleRepository.requests.length).toBe(2);
            expect(bundleRepository.requests).toContainEqual(new BundleRequest('en', 'form'));
            expect(bundleRepository.requests).toContainEqual(new BundleRequest('en', 'errors'));
            expect(bundleRepository.responses.length).toBe(2);
            expect(bundleRepository.errors.length).toBe(0);

            done();
          },
        });
      });

      test(`the bundles' phrases are available for initial language`, () => {
        expect(translateService.instant('form.field.required')).toBe('This field is required');
        expect(translateService.instant('error.not-found')).toBe('Not found');
      });
    });

    describe('when', () => {
      test('the language has been changed', () => {
        languageSource.next('ua');
      });
    });

    describe('then', () => {
      test('the bundles requested by feature module(s) are loaded within new language', done => {
        expect(bundleRepository.requests.length).toBe(4);
        expect(bundleRepository.requests).toContainEqual(new BundleRequest('en', 'form'));
        expect(bundleRepository.requests).toContainEqual(new BundleRequest('en', 'errors'));
        expect(bundleRepository.requests).toContainEqual(new BundleRequest('ua', 'form'));
        expect(bundleRepository.requests).toContainEqual(new BundleRequest('ua', 'errors'));
        expect(bundleRepository.responses.length).toBe(2);
        expect(bundleRepository.errors.length).toBe(0);

        bundleRepository.responses$.pipe(
          take(4),
        ).subscribe({
          complete(): void {
            expect(bundleRepository.requests.length).toBe(4);
            expect(bundleRepository.requests).toContainEqual(new BundleRequest('en', 'form'));
            expect(bundleRepository.requests).toContainEqual(new BundleRequest('en', 'errors'));
            expect(bundleRepository.requests).toContainEqual(new BundleRequest('ua', 'form'));
            expect(bundleRepository.requests).toContainEqual(new BundleRequest('ua', 'errors'));
            expect(bundleRepository.responses.length).toBe(4);
            expect(bundleRepository.errors.length).toBe(0);

            done();
          },
        });
      });

      test('the missing bundle handler must not be invoked', () => {
        expect(missingBundleHandler.requests.length).toBe(0);
      });

      test(`the bundles' phrases must be available for new language`, () => {
        expect(translateService.instant('form.field.required')).toBe('Обов\'язкове поле');
        expect(translateService.instant('error.not-found')).toBe('Не знайдено');
      });
    });
  });

});
