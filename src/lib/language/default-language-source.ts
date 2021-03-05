import { BehaviorSubject, Observable } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { DEFAULT_LANGUAGE } from '../configuration/root-configuration';
import { Language } from './language';
import { LanguageSource } from './language-source';

/**
 * Represents an implementation of {@link LanguageSource} used by default.
 * It simply uses the {@link DEFAULT_LANGUAGE} and does not push any updates.
 * @since 2.0.0
 * @internal
 */
@Injectable({
  providedIn: 'root',
})
export class DefaultLanguageSource extends LanguageSource {
  private readonly languageSubject: BehaviorSubject<Language>;

  /**
   * Gets or sets ID of current language.
   * @since 2.0.0
   */
  get language(): Language {
    return this.languageSubject.value;
  }

  /**
   * Gets an {@link Observable} which notifies about language changes.
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
}
