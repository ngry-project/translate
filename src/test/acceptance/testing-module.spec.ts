import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Language } from '../../lib/language/language';
import { ActiveLanguage } from '../../lib/language/active-language';
import { TranslateModule } from '../../lib/translate/translate.module';
import { TranslateService } from '../../lib/translate/translate.service';

describe('testing module', () => {
  describe('translate pipe', () => {
    it('should register the "translate" pipe', async () => {
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

      expect(fixture.elementRef.nativeElement.innerHTML).toBe('phrase.key');
    });
  });

  describe('translate service', () => {
    it('should provide a TranslateService', async () => {
      @Component({
        selector: 'lib-test',
        template: `{{ trs.translate('phrase.key') | async }}`,
      })
      class TestComponent {
        constructor(
          readonly trs: TranslateService,
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

      fixture.detectChanges();

      await fixture.whenStable();
      await fixture.whenRenderingDone();

      expect(fixture.debugElement.nativeElement.innerHTML).toBe('phrase.key');
    });
  });

  describe('active language', () => {
    it('should provide an ActiveLanguage provider', async () => {
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
      expect(fixture.debugElement.query(By.css('label')).nativeElement.innerHTML).toBe('phrase.key');
      expect(fixture.debugElement.queryAll(By.css('option')).length).toBe(2);
    });
  });
});
