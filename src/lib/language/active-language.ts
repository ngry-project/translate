import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Language } from './language';
import { LanguageStore } from './language-store';

/**
 * Represents a lightweight facade for {@link LanguageStore}.
 * @since 2.0.0
 * @see LanguageStore
 */
@Injectable({
  providedIn: 'root',
})
export class ActiveLanguage {

  /**
   * Gets a code of the current language.
   * @since 2.0.0
   * @see LanguageState.current
   * @see LanguageSource.language
   */
  get current(): Language {
    return this.store.snapshot.current;
  }

  /**
   * Gets a stream of the current language code updates.
   * @since 2.0.0
   * @see LanguageStore.current$
   */
  get current$(): Observable<Language> {
    return this.store.current$;
  }

  /**
   * Gets a code of the default language.
   * @since 2.0.0
   * @see LanguageState.default
   * @see DEFAULT_LANGUAGE
   */
  get default(): Language {
    return this.store.snapshot.default;
  }

  /**
   * Gets codes of the supported languages.
   * @since 2.0.0
   * @see LanguageState.supported
   * @see SUPPORTED_LANGUAGES
   */
  get supported(): ReadonlySet<Language> {
    return this.store.snapshot.supported;
  }

  constructor(
    private store: LanguageStore,
  ) {
  }
}
