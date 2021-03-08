import { TestBed } from '@angular/core/testing';
import { ActiveLanguage } from '../../lib/language/active-language';
import { LanguageSource } from '../../lib/language/language-source';
import { FakeLanguageSource } from '../../lib/testing/fake-language-source';
import { TranslateModule } from '../../lib/translate/translate.module';
import { BundleRepositoryFixture } from '../fixture/bundle-repository-fixture';
import { LanguageChangeHandler } from '../../lib/language/language-change-handler';
import { FakeLanguageChangeHandler } from '../../lib/testing/fake-language-change-handler';

describe('language source', () => {
  describe('pushes an update and the language handler approves the language change', () => {
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

      test('the active language equals to the default one', () => {
        expect(activeLanguage.current).toBe('en');
      });
    });

    describe('when', () => {
      test('the language source pushes an update', () => {
        languageSource.next('ua');
      });

      test('the language change handler approves the language change', () => {
        expect(languageChangeHandler.requests.all.length).toBe(1);
        expect(languageChangeHandler.requests.pending.length).toBe(1);

        languageChangeHandler.approve();

        expect(languageChangeHandler.requests.all.length).toBe(1);
        expect(languageChangeHandler.requests.pending.length).toBe(0);
      });
    });

    describe('then', () => {
      test('the language of language source is equal to the new one', () => {
        expect(languageSource.language).toBe('ua');
      });

      test('the active language equals to the new one', () => {
        expect(activeLanguage.current).toBe('ua');
      });
    });
  });

  describe('pushes an update and the language handler declines the language change', () => {
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

      test('the active language equals to the default one', () => {
        expect(activeLanguage.current).toBe('en');
      });
    });

    describe('when', () => {
      test('the language source pushes an update', () => {
        languageSource.next('ua');
      });

      test('the language change handler declines the language change', () => {
        expect(languageChangeHandler.requests.all.length).toBe(1);
        expect(languageChangeHandler.requests.pending.length).toBe(1);

        languageChangeHandler.decline();

        expect(languageChangeHandler.requests.all.length).toBe(1);
        expect(languageChangeHandler.requests.pending.length).toBe(0);
      });
    });

    describe('then', () => {
      test('the language of language source is equal to the new one', () => {
        expect(languageSource.language).toBe('ua');
      });

      test('the active language equals to the original one', () => {
        expect(activeLanguage.current).toBe('en');
      });
    });
  });
});
