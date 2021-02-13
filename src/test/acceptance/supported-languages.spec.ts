import { TestBed } from '@angular/core/testing';
import {
  ActiveLanguage,
  FakeLanguageChangeHandler,
  FakeLanguageSource,
  LanguageChangeHandler,
  LanguageSource,
  TranslateModule,
} from '../../public-api';
import { BundleRepositoryFixture } from '../fixture/bundle-repository-fixture';
import { LanguageChangeRequest } from '../../lib/language/language-change-request';

describe('supported languages', () => {

  describe('change language to one of supported', () => {
    let activeLanguage: ActiveLanguage;
    let languageSource: FakeLanguageSource;
    let languageChangeHandler: FakeLanguageChangeHandler;

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
        ],
      });

      activeLanguage = TestBed.inject(ActiveLanguage);
      languageSource = TestBed.inject(LanguageSource) as FakeLanguageSource;
      languageChangeHandler = TestBed.inject(LanguageChangeHandler) as FakeLanguageChangeHandler;
    });

    describe('given', () => {
      test('the language of language source is equal to the default one', () => {
        expect(languageSource.language).toBe('en');
      });

      test('the language of the language service is equal to the default one', () => {
        expect(activeLanguage.current).toBe('en');
      });

      test('multiple supported languages', () => {
        expect(activeLanguage.supported.size).toBe(2);
        expect(activeLanguage.supported).toContain('en');
        expect(activeLanguage.supported).toContain('ua');
      });
    });

    describe('when', () => {
      test('the language source has pushed an update', () => {
        languageSource.next('ua');
      });

      test('the language change handler has approved the language change', () => {
        expect(languageChangeHandler.requests.all.length).toBe(1);
        expect(languageChangeHandler.requests.all).toContainEqual(new LanguageChangeRequest('ua', 'en'));
        expect(languageChangeHandler.requests.pending.length).toBe(1);
        expect(languageChangeHandler.requests.pending).toContainEqual(new LanguageChangeRequest('ua', 'en'));
        expect(languageChangeHandler.responses.all.length).toBe(1);
        expect(languageChangeHandler.responses.pending.length).toBe(1);

        languageChangeHandler.approve();
      });
    });

    describe('then', () => {
      test('the language of language source is equal to the new one', () => {
        expect(languageSource.language).toBe('ua');
      });

      test('the language of the language service is equal to the default one', () => {
        expect(activeLanguage.current).toBe('ua');
      });
    });
  });

  describe('change language to one of not supported', () => {
    let activeLanguage: ActiveLanguage;
    let languageSource: FakeLanguageSource;
    let languageChangeHandler: FakeLanguageChangeHandler;

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
    });

    describe('given', () => {
      test('the language of language source is equal to the default one', () => {
        expect(languageSource.language).toBe('en');
      });

      test('the language of the language service is equal to the default one', () => {
        expect(activeLanguage.current).toBe('en');
      });

      test('multiple supported languages', () => {
        expect(activeLanguage.supported.size).toBe(2);
        expect(activeLanguage.supported).toContain('en');
        expect(activeLanguage.supported).toContain('ua');
        expect(activeLanguage.supported).not.toContain('unknown');
      });
    });

    describe('when', () => {
      test('the language source has pushed an update', () => {
        languageSource.next('unknown');
      });
    });

    describe('then', () => {
      test('the language change handler has no pending requests', () => {
        expect(languageChangeHandler.requests.all.length).toBe(0);
        expect(languageChangeHandler.requests.pending.length).toBe(0);
        expect(languageChangeHandler.responses.all.length).toBe(0);
        expect(languageChangeHandler.responses.pending.length).toBe(0);
      });

      test('the language of language source equals to the new one', () => {
        expect(languageSource.language).toBe('unknown');
      });

      test('the language of language service equals to the original one', () => {
        expect(activeLanguage.current).toBe('en');
      });

      test('the language change handler is not invoked', () => {
        expect(languageChangeHandler.requests.all.length).toBe(0);
      });
    });
  });
});
