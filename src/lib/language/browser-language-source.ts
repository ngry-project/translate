import { fromEvent, Observable } from 'rxjs';
import { map, shareReplay, startWith } from 'rxjs/operators';
import { Inject, Injectable } from '@angular/core';
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from '../configuration/root-configuration';
import { Language } from './language';
import { LanguageSource } from './language-source';

@Injectable({
  providedIn: 'root',
})
export class BrowserLanguageSource extends LanguageSource {
  private readonly defaultLanguage: Language;
  private readonly knownLanguages: ReadonlySet<Language>;

  readonly language$: Observable<Language>;

  get language(): Language {
    let language: Language = navigator.language.slice(0, 2).toLowerCase();

    if (!this.knownLanguages.has(language)) {
      language = this.defaultLanguage;
    }

    return language;
  }

  constructor(
    @Inject(DEFAULT_LANGUAGE) defaultLanguage: Language,
    @Inject(SUPPORTED_LANGUAGES) supportedLanguages: Array<Language>,
  ) {
    super();
    this.defaultLanguage = defaultLanguage;
    this.knownLanguages = new Set(supportedLanguages);
    this.language$ = fromEvent(window, 'languagechange').pipe(
      map(() => this.language),
      startWith(this.language),
      shareReplay(1),
    );
  }
}
