import { skip, take } from 'rxjs/operators';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FakeLanguageSource, LanguageSource, Locals, TranslateModule } from '../../public-api';
import { BundleToken } from '../../lib/bundle/bundle-token';
import { BundleCollectionStore } from '../../lib/bundle/bundle-collection-store';
import { BundleRepositoryFixture } from '../fixture/bundle-repository-fixture';

describe('TranslatePipe', () => {

  describe('simple phrase in text content', () => {
    @Component({
      selector: 'lib-simple-phrase',
      template: `
        {{'phrase.simple' | translate}}
      `,
    })
    class SimplePhraseComponent {
    }

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

    describe('given', () => {
      test('component which uses "translate" pipe in text content', () => {
        expect(component).toBeInstanceOf(SimplePhraseComponent);
      });
    });

    describe('when', () => {
      test('"phrase" bundle loaded', () => {
        expect(bundlesStore.snapshot.has(new BundleToken('phrase', 'en'))).toBe(true);
      });
    });

    describe('then', () => {
      it('should replace phrase keys in component template', () => {
        const innerText = fixture.nativeElement.textContent.trim();

        expect(innerText).toBe('Simple phrase');
      });
    });
  });

  describe('dynamic phrase in text content', () => {
    @Component({
      selector: 'lib-template-phrase',
      template: `
        {{'phrase.template' | translate: locals}}
      `,
    })
    class TemplatePhraseComponent {
      readonly locals: Locals = {value: 20};
    }

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

    describe('given', () => {
      test('component which uses "translate" pipe in text content', () => {
        expect(component).toBeInstanceOf(TemplatePhraseComponent);
      });
    });

    describe('when', () => {
      test('"phrase" bundle loaded', () => {
        expect(bundlesStore.snapshot.has(new BundleToken('phrase', 'en'))).toBe(true);
      });
    });

    describe('then', () => {
      it('should replace phrase keys in component template', () => {
        const innerText = fixture.nativeElement.textContent.trim();

        expect(innerText).toBe('Dynamic value: 20');
      });
    });
  });

  describe('configurable phrase in text content', () => {
    @Component({
      selector: 'lib-configurable-phrase',
      template: `
        {{'phrase.configurable' | translate: locals}}
      `,
    })
    class ConfiguredPhraseComponent {
      readonly locals: Locals = {value: 20};
    }

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

    describe('given', () => {
      test('component which uses "translate" pipe in text content', () => {
        expect(component).toBeInstanceOf(ConfiguredPhraseComponent);
      });
    });

    describe('when', () => {
      test('"phrase" bundle loaded', () => {
        expect(bundlesStore.snapshot.has(new BundleToken('phrase', 'en'))).toBe(true);
      });
    });

    describe('then', () => {
      it('should replace phrase keys in component template', () => {
        const innerText = fixture.nativeElement.textContent.trim();

        expect(innerText).toBe('many');
      });
    });
  });

  describe('language change updates UI', () => {
    @Component({
      selector: 'lib-simple-phrase',
      template: `
        {{'phrase.simple' | translate}}
      `,
    })
    class SimplePhraseComponent {
    }

    let languageSource: FakeLanguageSource;
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

      languageSource = TestBed.inject(LanguageSource) as FakeLanguageSource;
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

      languageSource.next('ua');

      // wait for "phrase" bundle to load within "ua" language
      await bundlesStore.state.pipe(
        skip(1),
        take(1),
      ).toPromise();

      fixture.detectChanges();
      await fixture.whenStable();

      snapshots.push(fixture.nativeElement.textContent.trim());

    });

    describe('given', () => {
      test('component which uses "translate" pipe in text content', () => {
        expect(component).toBeInstanceOf(SimplePhraseComponent);
      });
    });

    describe('when', () => {
      test('"phrase" bundle loaded within "en" language', () => {
        expect(bundlesStore.snapshot.has(new BundleToken('phrase', 'en'))).toBe(true);
      });

      test('"phrase" bundle loaded within "ua" language', () => {
        expect(bundlesStore.snapshot.has(new BundleToken('phrase', 'ua'))).toBe(true);
      });
    });

    describe('then', () => {
      it('should replace phrase keys in component template', () => {
        expect(snapshots[0]).toBe('');
        expect(snapshots[1]).toBe('Simple phrase');
        expect(snapshots[2]).toBe('Проста фраза');
      });
    });
  });

  describe('conditional phrase in text content', () => {
    @Component({
      selector: 'lib-conditional-phrase',
      template: `
        {{(checked ? 'phrase.checked' : 'phrase.unchecked') | translate}}
      `,
    })
    class ConditionalPhraseComponent {
      checked = false;
    }

    let bundlesStore: BundleCollectionStore;
    let fixture: ComponentFixture<ConditionalPhraseComponent>;
    let component: ConditionalPhraseComponent;
    let snapshots: Array<string>;

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

      snapshots = [];
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

    describe('given', () => {
      test('the component which uses "translate" pipe in text content', () => {
        expect(component).toBeInstanceOf(ConditionalPhraseComponent);
      });
    });

    describe('when', () => {
      test('the component state changes', () => {
        expect(component.checked).toBe(true);
      });
    });

    describe('then', () => {
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

  describe('debug mode is enabled', () => {
    @Component({
      selector: 'lib-simple-phrase',
      template: `{{'phrase.simple' | translate}}`,
    })
    class SimplePhraseComponent {
    }

    let bundlesStore: BundleCollectionStore;
    let fixture: ComponentFixture<SimplePhraseComponent>;
    let component: SimplePhraseComponent;
    let snapshots: Array<string>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [
          TranslateModule.forRoot({
            language: {
              default: {
                useValue: 'en',
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
            debug: {
              enabled: {
                useValue: true,
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

      snapshots = [];
      bundlesStore = TestBed.inject(BundleCollectionStore);
      fixture = TestBed.createComponent(SimplePhraseComponent);
      component = fixture.componentInstance;

      fixture.detectChanges();
      await fixture.whenStable();
      await fixture.whenRenderingDone();

      snapshots.push(fixture.nativeElement.textContent.trim());

      await bundlesStore.state.pipe(
        skip(1),
        take(1),
      ).toPromise();

      fixture.detectChanges();
      await fixture.whenStable();
      await fixture.whenRenderingDone();

      snapshots.push(fixture.nativeElement.textContent.trim());
    });

    describe('given', () => {
      test('the component which uses "translate" pipe in text content', () => {
        expect(component).toBeInstanceOf(SimplePhraseComponent);
      });
    });

    describe('when', () => {
      test('the component is rendered', () => {
        expect(snapshots.length).toBe(2);
      });
    });

    describe('then', () => {
      test('the text before bundle has been loaded equals to phrase key', () => {
        expect(snapshots[0]).toBe('phrase.simple');
      });

      test('the text after bundle has been loaded is taken from bundle', () => {
        expect(snapshots[1]).toBe('Simple phrase');
      });
    });
  });

  describe('debug mode is disabled', () => {
    @Component({
      selector: 'lib-simple-phrase',
      template: `{{'phrase.simple' | translate}}`,
    })
    class SimplePhraseComponent {
    }

    let bundlesStore: BundleCollectionStore;
    let fixture: ComponentFixture<SimplePhraseComponent>;
    let component: SimplePhraseComponent;
    let snapshots: Array<string>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [
          TranslateModule.forRoot({
            language: {
              default: {
                useValue: 'en',
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
            debug: {
              enabled: {
                useValue: false,
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

      snapshots = [];
      bundlesStore = TestBed.inject(BundleCollectionStore);
      fixture = TestBed.createComponent(SimplePhraseComponent);
      component = fixture.componentInstance;

      fixture.detectChanges();
      await fixture.whenStable();
      await fixture.whenRenderingDone();

      snapshots.push(fixture.nativeElement.textContent.trim());

      await bundlesStore.state.pipe(
        skip(1),
        take(1),
      ).toPromise();

      fixture.detectChanges();
      await fixture.whenStable();
      await fixture.whenRenderingDone();

      snapshots.push(fixture.nativeElement.textContent.trim());
    });

    describe('given', () => {
      test('the component which uses "translate" pipe in text content', () => {
        expect(component).toBeInstanceOf(SimplePhraseComponent);
      });
    });

    describe('when', () => {
      test('the component is rendered', () => {
        expect(snapshots.length).toBe(2);
      });
    });

    describe('then', () => {
      test('the text before bundle has been loaded equals to an empty string', () => {
        expect(snapshots[0]).toBe('');
      });

      test('the text after bundle has been loaded is taken from that bundle', () => {
        expect(snapshots[1]).toBe('Simple phrase');
      });
    });
  });

  describe('debug mode is default', () => {
    @Component({
      selector: 'lib-simple-phrase',
      template: `{{'phrase.simple' | translate}}`,
    })
    class SimplePhraseComponent {
    }

    let bundlesStore: BundleCollectionStore;
    let fixture: ComponentFixture<SimplePhraseComponent>;
    let component: SimplePhraseComponent;
    let snapshots: Array<string>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [
          TranslateModule.forRoot({
            language: {
              default: {
                useValue: 'en',
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

      snapshots = [];
      bundlesStore = TestBed.inject(BundleCollectionStore);
      fixture = TestBed.createComponent(SimplePhraseComponent);
      component = fixture.componentInstance;

      fixture.detectChanges();
      await fixture.whenStable();
      await fixture.whenRenderingDone();

      snapshots.push(fixture.nativeElement.textContent.trim());

      await bundlesStore.state.pipe(
        skip(1),
        take(1),
      ).toPromise();

      fixture.detectChanges();
      await fixture.whenStable();
      await fixture.whenRenderingDone();

      snapshots.push(fixture.nativeElement.textContent.trim());
    });

    describe('given', () => {
      test('the component which uses "translate" pipe in text content', () => {
        expect(component).toBeInstanceOf(SimplePhraseComponent);
      });
    });

    describe('when', () => {
      test('the component is rendered', () => {
        expect(snapshots.length).toBe(2);
      });
    });

    describe('then', () => {
      test('the text before bundle has been loaded equals to an empty string', () => {
        expect(snapshots[0]).toBe('');
      });

      test('the text after bundle has been loaded is taken from that bundle', () => {
        expect(snapshots[1]).toBe('Simple phrase');
      });
    });
  });

});
