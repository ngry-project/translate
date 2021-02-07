import { TestBed } from '@angular/core/testing';
import { LanguageStore } from '../../lib/language/language-store';
import { FakeLanguageSource } from '../../lib/testing/fake-language-source';
import { FakeLanguageChangeHandler } from '../../lib/testing/fake-language-change-handler';
import { TranslateModule } from '../../lib/translate/translate.module';
import { LanguageChangeHandler } from '../../lib/language/language-change-handler';
import { BundleRepositoryFixture } from '../fixture/bundle-repository-fixture';
import { BundleRepository } from '../../lib/bundle/bundle-repository';
import { TranslateStore } from '../../lib/translate/translate.store';
import { LanguageSource } from '../../lib/language/language-source';

describe('Feature: change languages at runtime', () => {

  describe('Scenario: change language to one of supported', () => {
    let bundleRepository: BundleRepository;
    let languageSource: FakeLanguageSource;
    let languageStore: LanguageStore;
    let languageChangeHandler: LanguageChangeHandler;

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
              change: {
                handler: {
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

      bundleRepository = TestBed.inject(BundleRepository);
      languageSource = TestBed.inject(LanguageSource) as FakeLanguageSource;
      languageStore = TestBed.inject(LanguageStore);
      languageChangeHandler = TestBed.inject(LanguageChangeHandler);

      // TranslateStore reacts on language change and gives command to BundleCollectionStore to load known bundles for new language
      TestBed.inject(TranslateStore);

      spyOn(bundleRepository, 'get').and.callThrough();
      spyOn(languageChangeHandler, 'handle').and.callThrough();
      spyOn(languageStore, 'completeLanguageChange').and.callThrough();
    });

    describe('Given', () => {
      test('initial language is "en"', () => {
        expect(languageStore.snapshot.currentLanguage).toBe('en');
      });

      test('known languages are "en" and "ua"', () => {
        expect(languageStore.snapshot.supports('en')).toBe(true);
        expect(languageStore.snapshot.supports('ua')).toBe(true);
      });
    });

    describe('When', () => {
      test('change language to "ua"', () => {
        languageSource.next('ua');
      });
    });

    describe('Then', () => {
      test('language change has been automatically confirmed', () => {
        expect(languageChangeHandler.handle).toHaveBeenCalledWith('ua', 'en');
        expect(languageStore.completeLanguageChange).toHaveBeenCalledWith('ua');
      });

      test('language has been changed to "ua"', () => {
        expect(languageStore.snapshot.currentLanguage).toBe('ua');
      });

      test('missing bundles have been requested', () => {
        expect(bundleRepository.get).toHaveBeenCalledWith('ua', 'form');
      });
    });
  });

  describe('Scenario: change language to one of not supported', () => {
    let bundleRepository: BundleRepository;
    let languageSource: FakeLanguageSource;
    let languageStore: LanguageStore;
    let languageChangeHandler: LanguageChangeHandler;

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
              change: {
                handler: {
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

      bundleRepository = TestBed.inject(BundleRepository);
      languageSource = TestBed.inject(LanguageSource) as FakeLanguageSource;
      languageStore = TestBed.inject(LanguageStore);
      languageChangeHandler = TestBed.inject(LanguageChangeHandler);

      spyOn(bundleRepository, 'get').and.callThrough();
      spyOn(languageChangeHandler, 'handle').and.callThrough();
    });

    describe('Given', () => {
      test('current language is "en"', () => {
        expect(languageStore.snapshot.currentLanguage).toBe('en');
      });

      test('known languages are "en" and "ua"', () => {
        expect(languageStore.snapshot.supports('en')).toBe(true);
        expect(languageStore.snapshot.supports('ua')).toBe(true);
      });
    });

    describe('When', () => {
      test('change language to "unknown"', () => {
        languageSource.next('unknown');
      });
    });

    describe('Then', () => {
      test('language change is prevented', () => {
        expect(languageChangeHandler.handle).toHaveBeenCalledTimes(0);
      });

      test('language still the same', () => {
        expect(languageStore.snapshot.currentLanguage).toBe('en');
      });

      test('bundles for non-supported language are not requested', () => {
        expect(bundleRepository.get).not.toHaveBeenCalledWith('unknown', 'form');
      });
    });
  });

});
