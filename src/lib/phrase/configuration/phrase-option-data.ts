import { PredicateData } from './predicate/predicate-data';

/**
 * Represents source of configured phrase option.
 * @since 2.0.0
 */
export interface PhraseOptionData {
  /**
   * Gets phrase predicate.
   * @since 2.0.0
   */
  readonly when: PredicateData;

  /**
   * Gets phrase translation.
   * @since 2.0.0
   */
  readonly then: string;
}
