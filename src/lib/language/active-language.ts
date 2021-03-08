import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Language } from './language';
import { LanguageStore } from './language-store';

/**
 * Represents a lightweight facade over the internal {@link LanguageStore} for monitoring the language state.
 * @since 2.0.0
 */
@Injectable({
  providedIn: 'root',
})
export class ActiveLanguage {

  /**
   * Gets a code of the current language.
   * @since 2.0.0
   */
  get current(): Language {
    return this.store.snapshot.current;
  }

  /**
   * Gets a stream of the current language code updates.
   * @since 2.0.0
   */
  get current$(): Observable<Language> {
    return this.store.current$;
  }

  /**
   * Gets a code of the default language.
   * @since 2.0.0
   */
  get default(): Language {
    return this.store.snapshot.default;
  }

  /**
   * Gets codes of the supported languages.
   * @since 2.0.0
   */
  get supported(): ReadonlySet<Language> {
    return this.store.snapshot.supported;
  }

  constructor(
    private store: LanguageStore,
  ) {
  }
}
