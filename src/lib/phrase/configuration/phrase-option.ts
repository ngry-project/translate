import { Locals } from '../locals';
import { Phrase } from '../phrase';
import { Predicate } from './predicate/predicate';

/**
 * Represents a phrase option.
 * @since 2.0.0
 * @internal
 */
export class PhraseOption {
  /**
   * Gets an option {@link Predicate}.
   * @since 2.0.0
   */
  private readonly when: Predicate;

  /**
   * Gets the result phrase.
   * @since 2.0.0
   */
  private readonly then: Phrase;

  constructor(when: Predicate, then: Phrase) {
    this.when = when;
    this.then = then;
  }

  /**
   * Determines whether this option compatible with locals.
   * @since 2.0.0
   */
  test(locals: Locals): boolean {
    return this.when.test(locals);
  }

  /**
   * Gets resulting phrase translations.
   * Passes {@link Locals} to the resulting {@link Phrase} for phrase variables interpolate.
   * @since 2.0.0
   */
  translate(locals?: Locals): string {
    return this.then.translate(locals);
  }
}
