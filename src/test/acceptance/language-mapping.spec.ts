import { TestBed } from '@angular/core/testing';
import { ActiveLanguage, FakeLanguageSource, LanguageSource, TranslateModule } from '../../public-api';
import { LanguageResolver } from '../../lib/language/language-resolver';
import { BundleRepositoryFixture } from '../fixture/bundle-repository-fixture';

describe('language mapping', () => {

  describe('change language to one with special mapping', () => {
    let activeLanguage: ActiveLanguage;
    let languageResolver: LanguageResolver;
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
              mapping: {
                useValue: {
                  ua: ['ua', 'ru', 'be'],
                },
              },
              source: {
                useExisting: FakeLanguageSource,
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

      languageResolver = TestBed.inject(LanguageResolver);
      activeLanguage = TestBed.inject(ActiveLanguage);
      languageSource = TestBed.inject(LanguageSource) as FakeLanguageSource;
    });

    describe('given', () => {
      test(`the language of the language source equals to the default one`, () => {
        expect(languageSource.language).toBe('en');
      });

      test(`the language of the language service equals to the default one`, () => {
        expect(activeLanguage.current).toBe('en');
      });

      test('the one of supported languages has mapping rules', () => {
        expect(languageResolver.resolve('ua')).toBe('ua');
        expect(languageResolver.resolve('be')).toBe('ua');
        expect(languageResolver.resolve('ru')).toBe('ua');
        expect(languageResolver.resolve('en')).toBe('en');
      });
    });

    describe('when', () => {
      test('change language to one within mapping rules', () => {
        languageSource.next('ru');
      });
    });

    describe('then', () => {
      test(`the language of the language source must be equal to the new one`, () => {
        expect(languageSource.language).toBe('ru');
      });

      test(`the language of the language service must be equal to the resolved one`, () => {
        expect(activeLanguage.current).toBe('ua');
      });
    });
  });

  describe('change language to one without special mapping', () => {
    let activeLanguage: ActiveLanguage;
    let languageResolver: LanguageResolver;
    let languageSource: FakeLanguageSource;

    beforeAll(() => {
      TestBed.configureTestingModule({
        imports: [
          TranslateModule.forRoot({
            language: {
              default: {
                useValue: 'ua',
              },
              supported: {
                useValue: ['en', 'ua'],
              },
              mapping: {
                useValue: {
                  ua: ['ua', 'ru', 'be'],
                },
              },
              source: {
                useExisting: FakeLanguageSource,
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

      languageResolver = TestBed.inject(LanguageResolver);
      activeLanguage = TestBed.inject(ActiveLanguage);
      languageSource = TestBed.inject(LanguageSource) as FakeLanguageSource;
    });

    describe('given', () => {
      test('the active language equals to the default one', () => {
        expect(activeLanguage.current).toBe('ua');
      });

      test('the language of language source is equal to the default one', () => {
        expect(languageSource.language).toBe('ua');
      });

      test('multiple supported languages', () => {
        expect(activeLanguage.supported.size).toBe(2);
        expect(activeLanguage.supported).toContain('en');
        expect(activeLanguage.supported).toContain('ua');
      });

      test('mapping rules for some of supported languages', () => {
        expect(languageResolver.resolve('ua')).toBe('ua');
        expect(languageResolver.resolve('be')).toBe('ua');
        expect(languageResolver.resolve('ru')).toBe('ua');
        expect(languageResolver.resolve('en')).toBe('en');
      });
    });

    describe('when', () => {
      test('change language to one without mapping rules', () => {
        languageSource.next('en');
      });
    });

    describe('then', () => {
      test(`the language of the language source must be equal to the new one`, () => {
        expect(languageSource.language).toBe('en');
      });

      test(`the language of the language service must be equal to the new one`, () => {
        expect(activeLanguage.current).toBe('en');
      });
    });
  });

  describe('language source is a regular expression', () => {
    let activeLanguage: ActiveLanguage;
    let languageResolver: LanguageResolver;
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
              mapping: {
                useValue: {
                  ua: [/ua|ru|be/i],
                },
              },
              source: {
                useExisting: FakeLanguageSource,
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

      languageResolver = TestBed.inject(LanguageResolver);
      activeLanguage = TestBed.inject(ActiveLanguage);
      languageSource = TestBed.inject(LanguageSource) as FakeLanguageSource;
    });

    describe('given', () => {
      test('the language of language source equals to the default one', () => {
        expect(languageSource.language).toBe('en');
      });

      test('the active language equals to the default one', () => {
        expect(activeLanguage.current).toBe('en');
      });

      test('multiple supported languages', () => {
        expect(activeLanguage.supported.size).toBe(2);
        expect(activeLanguage.supported).toContain('en');
        expect(activeLanguage.supported).toContain('ua');
      });

      test('mapping rules for some of supported languages', () => {
        expect(languageResolver.resolve('ua')).toBe('ua');
        expect(languageResolver.resolve('be')).toBe('ua');
        expect(languageResolver.resolve('ru')).toBe('ua');
        expect(languageResolver.resolve('en')).toBe('en');
      });
    });

    describe('when', () => {
      test('change language to one with mapping rules', () => {
        languageSource.next('ru');
      });
    });

    describe('then', () => {
      test(`the language of the language source equals to the new one`, () => {
        expect(languageSource.language).toBe('ru');
      });

      test(`the active language equals to the target one`, () => {
        expect(activeLanguage.current).toBe('ua');
      });
    });
  });

});
