import { BehaviorSubject, Observable } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { Language } from '../language/language';
import { LanguageSource } from '../language/language-source';
import { DEFAULT_LANGUAGE } from '../configuration/root-configuration';

@Injectable({
  providedIn: 'root',
})
export class FakeLanguageSource extends LanguageSource {
  private readonly languageSubject: BehaviorSubject<Language>;

  /**
   * Gets ID of current language.
   * @since 2.0.0
   */
  get language(): Language {
    return this.languageSubject.value;
  }

  /**
   * Gets Observable which notifies about language changes.
   * @since 2.0.0
   */
  get language$(): Observable<Language> {
    return this.languageSubject;
  }

  constructor(
    @Inject(DEFAULT_LANGUAGE) defaultLanguage: Language,
  ) {
    super();
    this.languageSubject = new BehaviorSubject(defaultLanguage);
  }

  next(language: Language): void {
    this.languageSubject.next(language);
  }
}
