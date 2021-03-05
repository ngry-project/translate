import { Language } from './language';

/**
 * Represents a language state.
 * @since 2.0.0
 * @internal
 */
export class LanguageState {
  /**
   * Get the current {@link Language}.
   * @since 2.0.0
   */
  readonly current: Language;

  /**
   * Gets the default {@link Language}.
   * @since 2.0.0
   */
  readonly default: Language;

  /**
   * Gets the list of supported {@link Language}s.
   * @since 2.0.0
   */
  readonly supported: ReadonlySet<Language>;

  constructor(
    initialLanguage: Language,
    defaultLanguage: Language,
    supportedLanguages: Iterable<Language>,
  ) {
    this.current = initialLanguage;
    this.default = defaultLanguage;
    this.supported = new Set(supportedLanguages);
  }

  /**
   * Produces a new {@link LanguageState} if the new language is different to the current one.
   * @since 2.0.0
   */
  setLanguage(language: Language): LanguageState {
    if (this.supported.has(language) && this.current !== language) {
      return new LanguageState(
        language,
        this.default,
        this.supported,
      );
    }

    return this;
  }
}
