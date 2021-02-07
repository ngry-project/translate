import { ReplaySubject } from 'rxjs';
import { skip, take, toArray } from 'rxjs/operators';
import { TestBed } from '@angular/core/testing';
import { BundleToken } from '../../lib/bundle/bundle-token';
import { BundleCollectionStore } from '../../lib/bundle/bundle-collection-store';
import { LanguageStore } from '../../lib/language/language-store';
import { TranslateService } from '../../lib/translate/translate.service';
import { TranslateModule } from '../../lib/translate/translate.module';
import { FakeLanguageSource } from '../../lib/testing/fake-language-source';
import { FakeLanguageChangeHandler } from '../../lib/testing/fake-language-change-handler';
import { BundleRepositoryFixture } from '../fixture/bundle-repository-fixture';

describe('Feature: TranslateService', () => {

  describe('Scenario: getting instant translation when bundles are not yet loaded', () => {
    let bundlesStore: BundleCollectionStore;
    let languageStore: LanguageStore;
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

      bundlesStore = TestBed.inject(BundleCollectionStore);
      languageStore = TestBed.inject(LanguageStore);
      translateService = TestBed.inject(TranslateService);
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
      test('bundle "form" is not yet loaded', () => {
        expect(bundlesStore.snapshot.has(new BundleToken('form', 'en'))).toBe(false);
      });
    });

    describe('Then', () => {
      it('should return an empty string', () => {
        expect(translateService.instant('form.field.required')).toBe('');
      });
    });
  });

  describe('Scenario: getting instant translation when bundles are loaded', () => {
    let bundlesStore: BundleCollectionStore;
    let languageStore: LanguageStore;
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

      bundlesStore = TestBed.inject(BundleCollectionStore);
      languageStore = TestBed.inject(LanguageStore);
      translateService = TestBed.inject(TranslateService);
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

    describe('Then', () => {
      it('should return phrase value', () => {
        expect(translateService.instant('form.field.required')).toBe('This field is required');
      });
    });
  });

  describe('Scenario: receiving translation updates when language changes', () => {
    let bundlesStore: BundleCollectionStore;
    let languageStore: LanguageStore;
    let translateService: TranslateService;
    const translation = new ReplaySubject<string>();

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

      bundlesStore = TestBed.inject(BundleCollectionStore);
      languageStore = TestBed.inject(LanguageStore);
      translateService = TestBed.inject(TranslateService);

      translateService.translate('form.field.required').subscribe(translation);
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
      test('bundle "form" is loaded for "en" language', done => {
        bundlesStore.state.pipe(
          skip(1),
          take(1),
        ).subscribe(snapshot => {
          expect(snapshot.has(new BundleToken('form', 'en'))).toBe(true);

          done();
        });
      });

      test('set language to "ua"', done => {
        languageStore.initLanguageChange('ua');

        languageStore.currentLanguage$.pipe(
          take(1),
        ).subscribe(snapshot => {
          expect(snapshot).toEqual('ua');

          done();
        });
      });

      test('bundle "form" is loaded for "ua" language', done => {
        bundlesStore.state.pipe(
          skip(1),
          take(1),
        ).subscribe(snapshot => {
          expect(snapshot.has(new BundleToken('form', 'ua'))).toBe(true);

          done();
        });
      });
    });

    describe('Then', () => {
      it('should emit translation for "en" and "ua" languages', done => {
        translation.pipe(
          take(2),
          toArray()
        ).subscribe(snapshots => {
          expect(snapshots.length).toBe(2);
          expect(snapshots[0]).toBe('This field is required');
          expect(snapshots[1]).toBe(`Обов'язкове поле`);

          done();
        });
      });
    });
  });

});
