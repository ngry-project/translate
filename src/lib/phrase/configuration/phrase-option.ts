import { Locals } from '../locals';
import { Phrase } from '../phrase';
import { Predicate } from './predicate/predicate';

/**
 * Represents phrase option.
 * @since 2.0.0
 */
export class PhraseOption {
  /**
   * Gets option predicate.
   * @since 2.0.0
   */
  private readonly when: Predicate;

  /**
   * Gets result phrase.
   * @since 2.0.0
   */
  private readonly then: Phrase;

  /**
   * Creates new instance.
   * @param when Phrase option predicate
   * @param then Resulting phrase
   * @since 2.0.0
   */
  constructor(when: Predicate, then: Phrase) {
    this.when = when;
    this.then = then;
  }

  /**
   * Determines whether this option compatible with locals.
   * @param locals Locals
   * @since 2.0.0
   */
  test(locals: Locals): boolean {
    return this.when.test(locals);
  }

  /**
   * Gets resulting phrase translations.
   * @param locals Locals
   * @since 2.0.0
   */
  translate(locals?: Locals): string {
    return this.then.translate(locals);
  }
}
