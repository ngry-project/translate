import { skip, take } from 'rxjs/operators';
import { Component } from '@angular/core';
import { Locals } from '../../lib/phrase/locals';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '../../lib/translate/translate.module';
import { BundleRepositoryFixture } from '../fixture/bundle-repository-fixture';
import { FakeLanguageSource } from '../../lib/testing/fake-language-source';
import { FakeLanguageChangeHandler } from '../../lib/testing/fake-language-change-handler';
import { BundleCollectionStore } from '../../lib/bundle/bundle-collection-store';
import { BundleToken } from '../../lib/bundle/bundle-token';
import { LanguageStore } from '../../lib/language/language-store';

@Component({
  selector: 'lib-simple-phrase',
  template: `
    {{'phrase.simple' | translate}}
  `,
})
class SimplePhraseComponent {
}

@Component({
  selector: 'lib-template-phrase',
  template: `
    {{'phrase.template' | translate: locals}}
  `,
})
class TemplatePhraseComponent {
  readonly locals: Locals = {value: 20};
}

@Component({
  selector: 'lib-configurable-phrase',
  template: `
    {{'phrase.configurable' | translate: locals}}
  `,
})
class ConfiguredPhraseComponent {
  readonly locals: Locals = {value: 20};
}

@Component({
  selector: 'lib-conditional-phrase',
  template: `
    {{(checked ? 'phrase.checked' : 'phrase.unchecked') | translate}}
  `,
})
class ConditionalPhraseComponent {
  checked = false;
}

describe('Feature: TranslatePipe', () => {

  describe('Scenario: simple phrase in text content', () => {
    let bundlesStore: BundleCollectionStore;
    let fixture: ComponentFixture<SimplePhraseComponent>;
    let component: SimplePhraseComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
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
            bundles: [
              'phrase',
            ],
          }),
        ],
        declarations: [
          SimplePhraseComponent,
        ],
      }).compileComponents();

      bundlesStore = TestBed.inject(BundleCollectionStore);

      fixture = TestBed.createComponent(SimplePhraseComponent);
      component = fixture.componentInstance;

      fixture.detectChanges();
      await fixture.whenStable();

      await bundlesStore.state.pipe(
        skip(1),
        take(1),
      ).toPromise();

      fixture.detectChanges();
      await fixture.whenStable();
    });

    describe('Given', () => {
      test('component which uses "translate" pipe in text content', () => {
        expect(component).toBeInstanceOf(SimplePhraseComponent);
      });
    });

    describe('When', () => {
      test('"phrase" bundle loaded', () => {
        expect(bundlesStore.snapshot.has(new BundleToken('phrase', 'en'))).toBe(true);
      });
    });

    describe('Then', () => {
      it('should replace phrase keys in component template', () => {
        const innerText = fixture.nativeElement.textContent.trim();

        expect(innerText).toBe('Simple phrase');
      });
    });
  });

  describe('Scenario: dynamic phrase in text content', () => {
    let bundlesStore: BundleCollectionStore;
    let fixture: ComponentFixture<TemplatePhraseComponent>;
    let component: TemplatePhraseComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
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
            bundles: [
              'phrase',
            ],
          }),
        ],
        declarations: [
          TemplatePhraseComponent,
        ],
      }).compileComponents();

      bundlesStore = TestBed.inject(BundleCollectionStore);

      fixture = TestBed.createComponent(TemplatePhraseComponent);
      component = fixture.componentInstance;

      fixture.detectChanges();
      await fixture.whenStable();

      await bundlesStore.state.pipe(
        skip(1),
        take(1),
      ).toPromise();

      fixture.detectChanges();
      await fixture.whenStable();
    });

    describe('Given', () => {
      test('component which uses "translate" pipe in text content', () => {
        expect(component).toBeInstanceOf(TemplatePhraseComponent);
      });
    });

    describe('When', () => {
      test('"phrase" bundle loaded', () => {
        expect(bundlesStore.snapshot.has(new BundleToken('phrase', 'en'))).toBe(true);
      });
    });

    describe('Then', () => {
      it('should replace phrase keys in component template', () => {
        const innerText = fixture.nativeElement.textContent.trim();

        expect(innerText).toBe('Dynamic value: 20');
      });
    });
  });

  describe('Scenario: configurable phrase in text content', () => {
    let bundlesStore: BundleCollectionStore;
    let fixture: ComponentFixture<ConfiguredPhraseComponent>;
    let component: ConfiguredPhraseComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
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
            bundles: [
              'phrase',
            ],
          }),
        ],
        declarations: [
          ConfiguredPhraseComponent,
        ],
      }).compileComponents();

      bundlesStore = TestBed.inject(BundleCollectionStore);

      fixture = TestBed.createComponent(ConfiguredPhraseComponent);
      component = fixture.componentInstance;

      fixture.detectChanges();
      await fixture.whenStable();

      await bundlesStore.state.pipe(
        skip(1),
        take(1),
      ).toPromise();

      fixture.detectChanges();
      await fixture.whenStable();
    });

    describe('Given', () => {
      test('component which uses "translate" pipe in text content', () => {
        expect(component).toBeInstanceOf(ConfiguredPhraseComponent);
      });
    });

    describe('When', () => {
      test('"phrase" bundle loaded', () => {
        expect(bundlesStore.snapshot.has(new BundleToken('phrase', 'en'))).toBe(true);
      });
    });

    describe('Then', () => {
      it('should replace phrase keys in component template', () => {
        const innerText = fixture.nativeElement.textContent.trim();

        expect(innerText).toBe('many');
      });
    });
  });

  describe('Scenario: language change updates UI', () => {
    let languageStore: LanguageStore;
    let bundlesStore: BundleCollectionStore;
    let fixture: ComponentFixture<SimplePhraseComponent>;
    let component: SimplePhraseComponent;
    const snapshots: Array<string> = [];

    beforeEach(async () => {
      await TestBed.configureTestingModule({
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
            bundles: [
              'phrase',
            ],
          }),
        ],
        declarations: [
          SimplePhraseComponent,
        ],
      }).compileComponents();

      languageStore = TestBed.inject(LanguageStore);
      bundlesStore = TestBed.inject(BundleCollectionStore);

      fixture = TestBed.createComponent(SimplePhraseComponent);
      component = fixture.componentInstance;

      fixture.detectChanges();
      await fixture.whenStable();

      snapshots.push(fixture.nativeElement.textContent.trim());

      // wait for "phrase" bundle to load within "en" language
      await bundlesStore.state.pipe(
        skip(1),
        take(1),
      ).toPromise();

      fixture.detectChanges();
      await fixture.whenStable();

      snapshots.push(fixture.nativeElement.textContent.trim());

      languageStore.initLanguageChange('ua');

      // wait for "phrase" bundle to load within "ua" language
      await bundlesStore.state.pipe(
        skip(1),
        take(1),
      ).toPromise();

      fixture.detectChanges();
      await fixture.whenStable();

      snapshots.push(fixture.nativeElement.textContent.trim());

    });

    describe('Given', () => {
      test('component which uses "translate" pipe in text content', () => {
        expect(component).toBeInstanceOf(SimplePhraseComponent);
      });
    });

    describe('When', () => {
      test('"phrase" bundle loaded within "en" language', () => {
        expect(bundlesStore.snapshot.has(new BundleToken('phrase', 'en'))).toBe(true);
      });

      test('"phrase" bundle loaded within "ua" language', () => {
        expect(bundlesStore.snapshot.has(new BundleToken('phrase', 'ua'))).toBe(true);
      });
    });

    describe('Then', () => {
      it('should replace phrase keys in component template', () => {
        expect(snapshots[0]).toBe('');
        expect(snapshots[1]).toBe('Simple phrase');
        expect(snapshots[2]).toBe('Проста фраза');
      });
    });
  });

  describe('Scenario: conditional phrase in text content', () => {
    let bundlesStore: BundleCollectionStore;
    let fixture: ComponentFixture<ConditionalPhraseComponent>;
    let component: ConditionalPhraseComponent;
    const snapshots: Array<string> = [];

    beforeEach(async () => {
      await TestBed.configureTestingModule({
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
            bundles: [
              'phrase',
            ],
          }),
        ],
        declarations: [
          ConditionalPhraseComponent,
        ],
      }).compileComponents();

      bundlesStore = TestBed.inject(BundleCollectionStore);

      fixture = TestBed.createComponent(ConditionalPhraseComponent);
      component = fixture.componentInstance;

      fixture.detectChanges();
      await fixture.whenStable();

      snapshots.push(fixture.nativeElement.textContent.trim());

      await bundlesStore.state.pipe(
        skip(1),
        take(1),
      ).toPromise();

      fixture.detectChanges();
      await fixture.whenStable();

      snapshots.push(fixture.nativeElement.textContent.trim());

      component.checked = true;

      fixture.detectChanges();
      await fixture.whenStable();

      snapshots.push(fixture.nativeElement.textContent.trim());
    });

    describe('Given', () => {
      test('component which uses "translate" pipe in text content', () => {
        expect(component).toBeInstanceOf(ConditionalPhraseComponent);
      });
    });

    describe('When', () => {
      test('component state changed', () => {
        expect(component.checked).toBe(true);
      });
    });

    describe('Then', () => {
      it('should have an initial text equal ""', () => {
        expect(snapshots[0]).toBe('');
      });

      it('should have text equal "Unchecked" after bundle has loaded', () => {
        expect(snapshots[1]).toBe('Unchecked');
      });

      it('should have text equal "Checked" after state has been changed', () => {
        expect(snapshots[2]).toBe('Checked');
      });
    });
  });

});
