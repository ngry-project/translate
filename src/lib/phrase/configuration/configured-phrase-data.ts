import { PhraseOptionData } from './phrase-option-data';

/**
 * Represents source of configured phrase.
 * @since 2.0.0
 */
export interface ConfiguredPhraseData {
  /**
   * Gets list of phrase options.
   * Phrase can take one of these options under certain conditions.
   * @since 2.0.0
   */
  readonly options: PhraseOptionData[];

  /**
   * Gets fallback used when none of options satisfies conditions.
   * @since 2.0.0
   */
  readonly fallback?: string;
}
