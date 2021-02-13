import { Language } from './language';

export class LanguageState {
  readonly current: Language;
  readonly default: Language;
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
