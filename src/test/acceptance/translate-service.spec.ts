import { skip, take } from 'rxjs/operators';
import { TestBed } from '@angular/core/testing';
import { BundleRepositoryFixture } from '../fixture/bundle-repository-fixture';
import {
  ActiveLanguage,
  BundleRepository,
  BundleRequest,
  FakeBundleRepository,
  FakeLanguageChangeHandler,
  FakeLanguageSource,
  LanguageChangeHandler,
  LanguageSource,
  TranslateModule,
  TranslateService,
} from '../../public-api';
import { BundleCollectionStore } from '../../lib/bundle/bundle-collection-store';
import { DefaultLanguageChangeHandler } from '../../lib/language/default-language-change-handler';
import { BundleToken } from '../../lib/bundle/bundle-token';

describe('TranslateService', () => {

  describe('getting instant translation when bundles have not been loaded yet', () => {
    let activeLanguage: ActiveLanguage;
    let translateService: TranslateService;
    let bundleRepository: FakeBundleRepository;

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
                useFactory(): FakeLanguageSource {
                  return new FakeLanguageSource('en');
                },
              },
              handler: {
                change: {
                  useExisting: DefaultLanguageChangeHandler,
                },
              },
            },
            bundle: {
              repository: {
                useExisting: BundleRepositoryFixture,
              },
            },
          }),
          TranslateModule.forFeature({
            bundles: ['form'],
          }),
        ],
      });

      activeLanguage = TestBed.inject(ActiveLanguage);
      translateService = TestBed.inject(TranslateService);
      bundleRepository = TestBed.inject(BundleRepository) as FakeBundleRepository;
    });

    describe('given', () => {
      test('the active language equals to the default one', () => {
        expect(activeLanguage.current).toBe('en');
      });

      test('known languages are "en" and "ua"', () => {
        expect(activeLanguage.supported.has('en')).toBe(true);
        expect(activeLanguage.supported.has('ua')).toBe(true);
      });
    });

    describe('when', () => {
      test('the bundle has not been loaded yet', () => {
        expect(bundleRepository.requests.length).toBe(1);
        expect(bundleRepository.requests).toContainEqual(new BundleRequest('en', 'form'));

        expect(bundleRepository.responses.length).toBe(0);

        expect(bundleRepository.errors.length).toBe(0);
      });
    });

    describe('then', () => {
      it('should return an empty string', () => {
        expect(translateService.instant('form.field.required')).toBe('');
      });
    });
  });

  describe('getting instant translation when bundles have been loaded', () => {
    let activeLanguage: ActiveLanguage;
    let bundlesStore: BundleCollectionStore;
    let translateService: TranslateService;

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
              handler: {
                change: {
                  useExisting: DefaultLanguageChangeHandler,
                },
              },
            },
            bundle: {
              repository: {
                useExisting: BundleRepositoryFixture,
              },
            },
          }),
          TranslateModule.forFeature({
            bundles: ['form'],
          }),
        ],
      });

      activeLanguage = TestBed.inject(ActiveLanguage);
      bundlesStore = TestBed.inject(BundleCollectionStore);
      translateService = TestBed.inject(TranslateService);
    });

    describe('given', () => {
      test('the active language equals to the default one', () => {
        expect(activeLanguage.current).toBe('en');
      });

      test('multiple supported languages', () => {
        expect(activeLanguage.supported.has('en')).toBe(true);
        expect(activeLanguage.supported.has('ua')).toBe(true);
      });
    });

    describe('when', () => {
      test('bundle "form" is loaded', done => {
        bundlesStore.state.pipe(
          skip(1),
          take(1),
        ).subscribe(snapshot => {
          expect(snapshot.has(new BundleToken('form', 'en'))).toBe(true);

          done();
        });
      });
    });

    describe('then', () => {
      it('should return phrase value', () => {
        expect(translateService.instant('form.field.required')).toBe('This field is required');
      });
    });
  });

  describe('receiving translation updates when language changes', () => {
    let activeLanguage: ActiveLanguage;
    let translateService: TranslateService;
    let languageChangeHandler: FakeLanguageChangeHandler;
    let languageSource: FakeLanguageSource;
    let bundleRepository: FakeBundleRepository;
    const translations: Array<string> = [];

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
          TranslateModule.forFeature({
            bundles: ['form'],
          }),
        ],
      });

      activeLanguage = TestBed.inject(ActiveLanguage);
      languageSource = TestBed.inject(LanguageSource) as FakeLanguageSource;
      languageChangeHandler = TestBed.inject(LanguageChangeHandler) as FakeLanguageChangeHandler;
      bundleRepository = TestBed.inject(BundleRepository) as BundleRepositoryFixture;
      translateService = TestBed.inject(TranslateService);

      translateService.translate('form.field.required').subscribe(translation => {
        translations.push(translation);
      });
    });

    describe('given', () => {
      test('the active language equals to the default one', () => {
        expect(activeLanguage.current).toBe('en');
      });

      test('multiple supported languages', () => {
        expect(activeLanguage.supported.has('en')).toBe(true);
        expect(activeLanguage.supported.has('ua')).toBe(true);
      });
    });

    describe('when', () => {
      test('the bundles have been loaded within the initial language', done => {
        expect(bundleRepository.requests.length).toBe(1);
        expect(bundleRepository.requests).toContainEqual(new BundleRequest('en', 'form'));
        expect(bundleRepository.responses.length).toBe(0);
        expect(bundleRepository.errors.length).toBe(0);

        bundleRepository.responses$.pipe(
          take(1),
        ).subscribe(() => {
          expect(bundleRepository.requests.length).toBe(1);
          expect(bundleRepository.requests).toContainEqual(new BundleRequest('en', 'form'));
          expect(bundleRepository.responses.length).toBe(1);
          expect(bundleRepository.errors.length).toBe(0);

          done();
        });
      });

      test('the language source pushes an update', () => {
        languageSource.next('ua');

        expect(activeLanguage.current).toBe('en');
        expect(languageChangeHandler.requests.all.length).toBe(1);
        expect(languageChangeHandler.requests.pending.length).toBe(1);
        expect(languageChangeHandler.responses.all.length).toBe(1);
        expect(languageChangeHandler.responses.pending.length).toBe(1);

        languageChangeHandler.approve();

        expect(languageChangeHandler.requests.all.length).toBe(1);
        expect(languageChangeHandler.requests.pending.length).toBe(0);
        expect(languageChangeHandler.responses.all.length).toBe(1);
        expect(languageChangeHandler.responses.pending.length).toBe(0);

        expect(activeLanguage.current).toEqual('ua');
      });

      test('the bundles have been loaded within the new language', done => {
        expect(bundleRepository.requests.length).toBe(2);
        expect(bundleRepository.requests).toContainEqual(new BundleRequest('en', 'form'));
        expect(bundleRepository.requests).toContainEqual(new BundleRequest('ua', 'form'));
        expect(bundleRepository.responses.length).toBe(1);
        expect(bundleRepository.errors.length).toBe(0);

        bundleRepository.responses$.pipe(
          skip(1),
          take(1),
        ).subscribe(() => {
          expect(bundleRepository.requests.length).toBe(2);
          expect(bundleRepository.requests).toContainEqual(new BundleRequest('en', 'form'));
          expect(bundleRepository.requests).toContainEqual(new BundleRequest('ua', 'form'));
          expect(bundleRepository.responses.length).toBe(2);
          expect(bundleRepository.errors.length).toBe(0);

          done();
        });
      });
    });

    describe('then', () => {
      it('the translation is pushed for both initial and new languages', () => {
        expect(translations.length).toBe(2);
        expect(translations[0]).toBe('This field is required');
        expect(translations[1]).toBe(`Обов'язкове поле`);
      });
    });
  });

});
