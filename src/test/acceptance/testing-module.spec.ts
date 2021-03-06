import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Language } from '../../lib/language/language';
import { ActiveLanguage } from '../../lib/language/active-language';
import { TranslateModule } from '../../lib/translate/translate.module';
import { TranslateService } from '../../lib/translate/translate.service';
import { FakeTranslateService } from '../../lib/testing/fake-translate.service';

describe('testing module', () => {
  describe('translate pipe', () => {
    it('should provide a TranslatePipe', async () => {
      @Component({
        selector: 'lib-test',
        template: `{{ 'phrase.key' | translate }}`,
      })
      class TestComponent {
      }

      TestBed.configureTestingModule({
        imports: [
          TranslateModule.forTesting({
            language: {
              default: {
                useValue: 'en',
              },
            },
          }),
        ],
        declarations: [TestComponent],
      });

      await TestBed.compileComponents();

      const fixture = TestBed.createComponent(TestComponent);

      fixture.detectChanges();

      await fixture.whenStable();
      await fixture.whenRenderingDone();

      expect(fixture.elementRef.nativeElement.innerHTML).toBe('');
    });
  });

  describe('translate service', () => {
    it('should provide a TranslateService', async () => {
      @Component({
        selector: 'lib-test',
        template: `{{ translateService.translate('phrase.key') | async }}`,
      })
      class TestComponent {
        constructor(
          readonly translateService: TranslateService,
        ) {
        }
      }

      TestBed.configureTestingModule({
        imports: [
          TranslateModule.forTesting({
            language: {
              default: {
                useValue: 'en',
              },
            },
          }),
        ],
        declarations: [
          TestComponent,
        ],
      });

      await TestBed.compileComponents();

      const fixture = TestBed.createComponent(TestComponent);
      const component = fixture.componentInstance;

      expect(component.translateService).toBeInstanceOf(FakeTranslateService);
    });
  });

  describe('active language', () => {
    it('should provide an ActiveLanguage', async () => {
      @Component({
        selector: 'lib-test',
        template: `
          <p>Current language: {{ language }}</p>
          <label for="lang-input">{{ 'phrase.key' | translate }}</label>
          <select id="lang-input">
            <option *ngFor="let language of languages">
              {{language}}
            </option>
          </select>
        `,
      })
      class TestComponent {
        language: Language;
        languages: Array<Language>;

        constructor(
          activeLanguage: ActiveLanguage,
        ) {
          this.language = activeLanguage.current;
          this.languages = [...activeLanguage.supported];
        }
      }

      TestBed.configureTestingModule({
        imports: [
          TranslateModule.forTesting({
            language: {
              default: {
                useValue: 'en',
              },
              supported: {
                useValue: ['en', 'ua'],
              },
            },
          }),
        ],
        declarations: [
          TestComponent,
        ],
      });

      await TestBed.compileComponents();

      const fixture = TestBed.createComponent(TestComponent);
      const component = fixture.componentInstance;

      fixture.detectChanges();

      await fixture.whenStable();
      await fixture.whenRenderingDone();

      expect(component.language).toBe('en');
      expect(component.languages).toEqual(['en', 'ua']);

      expect(fixture.debugElement.query(By.css('p')).nativeElement.innerHTML).toBe('Current language: en');
      expect(fixture.debugElement.query(By.css('label')).nativeElement.innerHTML).toBe('');
      expect(fixture.debugElement.queryAll(By.css('option')).length).toBe(2);
    });
  });

  describe('debug mode is default', () => {
    it('should render an empty string', async () => {
      @Component({
        selector: 'lib-test',
        template: `{{ 'phrase.key' | translate }}`,
      })
      class TestComponent {
      }

      TestBed.configureTestingModule({
        imports: [
          TranslateModule.forTesting({
            language: {
              default: {
                useValue: 'en',
              },
            },
          }),
        ],
        declarations: [
          TestComponent,
        ],
      });

      await TestBed.compileComponents();

      const fixture = TestBed.createComponent(TestComponent);

      fixture.detectChanges();

      await fixture.whenStable();
      await fixture.whenRenderingDone();

      expect(fixture.nativeElement.textContent).toBe('');
    });
  });

  describe('debug mode is disabled', () => {
    it('should render an empty string', async () => {
      @Component({
        selector: 'lib-test',
        template: `{{ 'phrase.key' | translate }}`,
      })
      class TestComponent {
      }

      TestBed.configureTestingModule({
        imports: [
          TranslateModule.forTesting({
            language: {
              default: {
                useValue: 'en',
              },
            },
            debug: {
              enabled: {
                useValue: false,
              },
            },
          }),
        ],
        declarations: [
          TestComponent,
        ],
      });

      await TestBed.compileComponents();

      const fixture = TestBed.createComponent(TestComponent);

      fixture.detectChanges();

      await fixture.whenStable();
      await fixture.whenRenderingDone();

      expect(fixture.nativeElement.textContent).toBe('');
    });
  });

  describe('debug mode is enabled', () => {
    it('should render the phrase key', async () => {
      @Component({
        selector: 'lib-test',
        template: `{{ 'phrase.key' | translate }}`,
      })
      class TestComponent {
      }

      TestBed.configureTestingModule({
        imports: [
          TranslateModule.forTesting({
            language: {
              default: {
                useValue: 'en',
              },
            },
            debug: {
              enabled: {
                useValue: true,
              },
            },
          }),
        ],
        declarations: [
          TestComponent,
        ],
      });

      await TestBed.compileComponents();

      const fixture = TestBed.createComponent(TestComponent);

      fixture.detectChanges();

      await fixture.whenStable();
      await fixture.whenRenderingDone();

      expect(fixture.nativeElement.textContent).toBe('phrase.key');
    });
  });
});
