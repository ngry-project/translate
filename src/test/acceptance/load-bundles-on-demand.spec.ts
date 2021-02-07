import { skip, take, toArray } from 'rxjs/operators';
import { TestBed } from '@angular/core/testing';
import { BundleCollectionStore } from '../../lib/bundle/bundle-collection-store';
import { BundleRegistry } from '../../lib/bundle/bundle-registry';
import { BundleRepository } from '../../lib/bundle/bundle-repository';
import { BundleToken } from '../../lib/bundle/bundle-token';
import { TranslateStore } from '../../lib/translate/translate.store';
import { LanguageStore } from '../../lib/language/language-store';
import { BundleRepositoryFixture } from '../fixture/bundle-repository-fixture';
import { TranslateModule } from '../../lib/translate/translate.module';
import { FakeLanguageSource } from '../../lib/testing/fake-language-source';
import { FakeLanguageChangeHandler } from '../../lib/testing/fake-language-change-handler';

describe('Feature: phrases bundles', () => {

  describe('Scenario: single feature module uses single existing bundle', () => {
    let languageStore: LanguageStore;
    let bundlesStore: BundleCollectionStore;
    let translateStore: TranslateStore;
    let bundleRepository: BundleRepositoryFixture;
    let bundleRegistry: BundleRegistry;

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

      languageStore = TestBed.inject(LanguageStore);
      translateStore = TestBed.inject(TranslateStore);
      bundleRegistry = TestBed.inject(BundleRegistry);
      bundleRepository = TestBed.inject(BundleRepository) as BundleRepositoryFixture;
      bundlesStore = TestBed.inject(BundleCollectionStore);
    });

    describe('Given', () => {
      test('initial language is "en"', () => {
        expect(languageStore.snapshot.currentLanguage).toBe('en');
      });

      test('known languages are "en" and "ua"', () => {
        expect(languageStore.snapshot.supports('en')).toBe(true);
        expect(languageStore.snapshot.supports('ua')).toBe(true);
      });

      test('phrase bundle "form" exists within languages "en" and "ua"', () => {
        expect(bundleRepository.data['en']['form']).toBeTruthy();
        expect(bundleRepository.data['ua']['form']).toBeTruthy();
      });
    });

    describe('When', () => {
      test('feature module uses "form" bundle', () => {
        expect(bundleRegistry.has('en', 'form')).toBe(true);
      });

      test('bundle is loaded', done => {
        bundlesStore.state.pipe(
          skip(1),  // skip with pending bundle state
          take(1),  // take with complete bundle state
        ).subscribe(state => {
          expect(state.has(new BundleToken('form', 'en'))).toBe(true);

          done();
        });
      });
    });

    describe('Then', () => {
      test('phrases of the bundle must be available', () => {
        expect(translateStore.snapshot.has('form.field.required')).toBe(true);
      });
    });
  });

  describe('Scenario: single feature module uses single non-existing bundle', () => {
    let languageStore: LanguageStore;
    let bundlesStore: BundleCollectionStore;
    let translateStore: TranslateStore;
    let bundleRepository: BundleRepositoryFixture;
    let bundleRegistry: BundleRegistry;

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
            bundles: ['forms'],
          }),
        ],
      });

      languageStore = TestBed.inject(LanguageStore);
      translateStore = TestBed.inject(TranslateStore);
      bundleRegistry = TestBed.inject(BundleRegistry);
      bundleRepository = TestBed.inject(BundleRepository) as BundleRepositoryFixture;
      bundlesStore = TestBed.inject(BundleCollectionStore);
    });

    describe('Given', () => {
      test('initial language is "en"', () => {
        expect(languageStore.snapshot.currentLanguage).toBe('en');
      });

      test('known languages are "en" and "ua"', () => {
        expect(languageStore.snapshot.supports('en')).toBe(true);
        expect(languageStore.snapshot.supports('ua')).toBe(true);
      });

      test('phrase bundle "forms" does not exist within languages "en" and "ua"', () => {
        expect(bundleRepository.data['en']['forms']).toBeUndefined();
        expect(bundleRepository.data['ua']['forms']).toBeUndefined();
      });
    });

    describe('When', () => {
      test('the feature module uses "forms" bundle', () => {
        expect(bundleRegistry.has('en', 'forms')).toBe(true);
      });
    });

    describe('Then', () => {
      test('bundle registry must register the bundle within the current language', () => {
        expect(bundleRegistry.has('en', 'forms')).toBe(true);
      });

      test(`bundle store must not contain the bundle until it's loaded`, () => {
        expect(bundlesStore.snapshot.has(new BundleToken('forms', 'en'))).toBe(false);
      });

      test('bundle repository must throw an error', done => {
        bundlesStore.state.pipe(
          take(1),  // take the pending bundle state
        ).subscribe({
          complete: done,
        });
      });

      test('bundle registry must keep the reference to invalid bundle', () => {
        expect(bundleRegistry.has('en', 'forms')).toBe(true);
      });

      test('bundle store must not contain the bundle after it failed to load', () => {
        expect(bundlesStore.snapshot.has(new BundleToken('forms', 'en'))).toBe(false);
      });

      test('translate store must not contain phrases of from requested bundle', () => {
        expect(translateStore.snapshot.has('form.field.required')).toBe(false);
      });
    });
  });

  describe('Scenario: single feature module uses multiple existing bundles', () => {
    let languageStore: LanguageStore;
    let bundlesStore: BundleCollectionStore;
    let translateStore: TranslateStore;
    let bundleRepository: BundleRepositoryFixture;
    let bundleRegistry: BundleRegistry;

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
            bundles: ['form', 'errors'],
          }),
        ],
      });

      languageStore = TestBed.inject(LanguageStore);
      translateStore = TestBed.inject(TranslateStore);
      bundleRegistry = TestBed.inject(BundleRegistry);
      bundleRepository = TestBed.inject(BundleRepository) as BundleRepositoryFixture;
      bundlesStore = TestBed.inject(BundleCollectionStore);
    });

    describe('Given', () => {
      test('language is "en"', () => {
        expect(languageStore.snapshot.currentLanguage).toBe('en');
      });

      test('known languages are "en" and "ua"', () => {
        expect(languageStore.snapshot.supports('en')).toBe(true);
        expect(languageStore.snapshot.supports('ua')).toBe(true);
      });

      test('phrase bundles "form" and "errors" exist within languages "en" and "ua"', () => {
        expect(bundleRepository.data['en']['form']).toBeDefined();
        expect(bundleRepository.data['ua']['form']).toBeDefined();
        expect(bundleRepository.data['en']['errors']).toBeDefined();
        expect(bundleRepository.data['ua']['errors']).toBeDefined();
      });

      test('feature module uses "form" and "errors" bundles', () => {
        expect(bundleRegistry.has('en', 'form')).toBe(true);
        expect(bundleRegistry.has('en', 'errors')).toBe(true);
      });
    });

    describe('When', () => {
      it('should load the bundles', done => {
        bundlesStore.state.pipe(
          take(3),    // take with complete bundles state
          toArray(),
        ).subscribe(snapshots => {
          expect(snapshots[0].has(new BundleToken('form', 'en'))).toBe(false);
          expect(snapshots[0].has(new BundleToken('errors', 'en'))).toBe(false);

          expect(snapshots[2].has(new BundleToken('form', 'en'))).toBe(true);
          expect(snapshots[2].has(new BundleToken('errors', 'en'))).toBe(true);

          expect(bundleRegistry.has('en', 'form')).toBe(true);
          expect(bundleRegistry.has('en', 'errors')).toBe(true);

          done();
        });
      });
    });

    describe('Then', () => {
      test('bundle store must contain the bundle after it has been load', () => {
        expect(bundlesStore.snapshot.has(new BundleToken('form', 'en'))).toBe(true);
        expect(bundlesStore.snapshot.has(new BundleToken('errors', 'en'))).toBe(true);
      });

      test('translate store must contain phrases of from requested bundles', () => {
        expect(translateStore.snapshot.has('form.field.required')).toBe(true);
      });
    });
  });

  describe('Scenario: multiple feature modules use multiple different existing bundles', () => {
    let languageStore: LanguageStore;
    let bundlesStore: BundleCollectionStore;
    let translateStore: TranslateStore;
    let bundleRepository: BundleRepositoryFixture;
    let bundleRegistry: BundleRegistry;

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
          TranslateModule.forFeature({
            bundles: ['errors'],
          }),
        ],
      });

      languageStore = TestBed.inject(LanguageStore);
      translateStore = TestBed.inject(TranslateStore);
      bundleRegistry = TestBed.inject(BundleRegistry);
      bundleRepository = TestBed.inject(BundleRepository) as BundleRepositoryFixture;
      bundlesStore = TestBed.inject(BundleCollectionStore);
    });

    describe('Given', () => {
      test('language is "en"', () => {
        expect(languageStore.snapshot.currentLanguage).toBe('en');
      });

      test('known languages are "en" and "ua"', () => {
        expect(languageStore.snapshot.supports('en')).toBe(true);
        expect(languageStore.snapshot.supports('ua')).toBe(true);
      });

      test('phrase bundles "form" and "errors" exist within languages "en" and "ua"', () => {
        expect(bundleRepository.data['en']['form']).toBeDefined();
        expect(bundleRepository.data['ua']['form']).toBeDefined();
        expect(bundleRepository.data['en']['errors']).toBeDefined();
        expect(bundleRepository.data['ua']['errors']).toBeDefined();
      });

      test('the first feature module uses "form" bundle', () => {
        expect(bundleRegistry.has('en', 'form')).toBe(true);
      });

      test('the second feature module uses "errors" bundle', () => {
        expect(bundleRegistry.has('en', 'errors')).toBe(true);
      });
    });

    describe('When', () => {
      it('"form" and "errors" bundles are loaded', done => {
        bundlesStore.state.pipe(
          skip(2),
          take(1),  // take with complete bundles state
        ).subscribe(snapshot => {
          expect(snapshot.has(new BundleToken('form', 'en'))).toBe(true);
          expect(snapshot.has(new BundleToken('errors', 'en'))).toBe(true);

          done();
        });
      });
    });

    describe('Then', () => {
      test('translate store has phrases from requested bundles', () => {
        expect(translateStore.snapshot.has('form.field.required')).toBe(true);
      });
    });
  });

});
