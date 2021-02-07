import { LanguageID } from './language-id';

export class LanguageState {
  private readonly defaultLanguage: LanguageID;
  private readonly supportedLanguages: ReadonlySet<LanguageID>;

  readonly currentLanguage: LanguageID;

  constructor(
    initialLanguage: LanguageID,
    defaultLanguage: LanguageID,
    supportedLanguages: Iterable<LanguageID>,
  ) {
    this.currentLanguage = initialLanguage;
    this.defaultLanguage = defaultLanguage;
    this.supportedLanguages = new Set(supportedLanguages);
  }

  setLanguage(language: LanguageID): LanguageState {
    if (this.supports(language) && this.currentLanguage !== language) {
      return new LanguageState(
        language,
        this.defaultLanguage,
        this.supportedLanguages,
      );
    }

    return this;
  }

  supports(language: LanguageID): boolean {
    return this.supportedLanguages.has(language);
  }
}
