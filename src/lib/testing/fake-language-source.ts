import { BehaviorSubject, NextObserver, Observable } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { LanguageID } from '../language/language-id';
import { LanguageSource } from '../language/language-source';
import { DEFAULT_LANGUAGE } from '../configuration/root-configuration';

@Injectable({
  providedIn: 'root',
})
export class FakeLanguageSource extends LanguageSource implements NextObserver<LanguageID> {
  private readonly languageSubject: BehaviorSubject<LanguageID>;

  /**
   * Gets ID of current language.
   * @since 2.0.0
   */
  get language(): LanguageID {
    return this.languageSubject.value;
  }

  /**
   * Gets Observable which notifies about language changes.
   * @since 2.0.0
   */
  get language$(): Observable<LanguageID> {
    return this.languageSubject;
  }

  constructor(
    @Inject(DEFAULT_LANGUAGE) defaultLanguage: LanguageID,
  ) {
    super();
    this.languageSubject = new BehaviorSubject(defaultLanguage);
  }

  next(language: LanguageID): void {
    this.languageSubject.next(language);
  }
}
