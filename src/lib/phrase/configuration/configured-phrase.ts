import { argument } from '../../support/argument';
import { Locals } from '../locals';
import { Phrase } from '../phrase';
import { PhraseOption } from './phrase-option';
import { Language } from '../../language/language';
import { BundleID } from '../../bundle/bundle-id';
import { PhraseKey } from '../phrase-key';

/**
 * Represents configured phrase. Configured phrase is implementation of {@link Phrase}
 * which picks one of phrase variants for which predicate returns true.
 * If none of variants predicate succeeded, {@link fallback} value will be returned.
 * @since 2.0.0
 * @internal
 */
export class ConfiguredPhrase extends Phrase {
  /**
   * Gets phrase options.
   * @since 2.0.0
   */
  private readonly options: Array<PhraseOption>;

  /**
   * Gets fallback value.
   * @since 2.0.0
   */
  private readonly fallback: string;

  /**
   * @throws {InvalidArgumentException} if options list is empty
   * @throws {InvalidArgumentException} if language name is invalid
   * @throws {InvalidArgumentException} if bundle name is empty
   * @throws {InvalidArgumentException} if phrase key is empty
   */
  constructor(language: Language, bundleId: BundleID, phraseKey: PhraseKey, options: Array<PhraseOption>, fallback: string = '') {
    super(language, bundleId, phraseKey);

    argument(options.length > 0, 'Options list must contain at least one element');

    this.options = options;
    this.fallback = fallback;
  }

  /**
   * Gets translation based on phrase configuration and {@link Locals}.
   * @since 2.0.0
   */
  translate(locals: Locals): string {
    for (const option of this.options) {
      if (option.test(locals)) {
        return option.translate(locals);
      }
    }

    return this.fallback;
  }
}
