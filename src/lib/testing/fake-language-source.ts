import { BehaviorSubject, Observable, NextObserver } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { DEFAULT_LANGUAGE } from '../configuration/root-configuration';
import { Language } from '../language/language';
import { LanguageSource } from '../language/language-source';

/**
 * Represents an implementation of {@link LanguageSource} for testing which uses {@link DEFAULT_LANGUAGE} for initial value and
 * allows for pushing changes.
 * @since 2.0.0
 */
@Injectable({
  providedIn: 'root',
})
export class FakeLanguageSource extends LanguageSource implements NextObserver<Language> {
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

  /**
   * Pushes {@link Language} change.
   * @since 2.0.0
   */
  next(language: Language): void {
    this.languageSubject.next(language);
  }
}
