import { argument } from '../../support/argument';
import { Locals } from '../locals';
import { Phrase } from '../phrase';
import { PhraseOption } from './phrase-option';
import { LanguageID } from '../../language/language-id';
import { BundleID } from '../../bundle/bundle-id';
import { PhraseKey } from '../phrase-key';

/**
 * Represents configured phrase. Configured phrase is implementation of {@link Phrase}
 * which picks one of phrase variants for which predicate returns true.
 * If none of variants predicate succeeded, {@link fallback} value will be returned.
 * @see PhraseCompiler.compilePhrase
 * @see PhraseSource
 * @see ConfiguredPhraseSource
 * @see Phrase
 * @see PhraseOption
 * @see Predicate
 * @see Operator
 * @since 2.0.0
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
   * Creates new instance.
   * @param languageId Language ID
   * @param bundleId Bundle ID
   * @param phraseKey Phrase key
   * @param options Phrase options
   * @param fallback Phrase fallback
   * @throws {InvalidArgumentException} if options list is empty
   * @throws {InvalidArgumentException} if language name is invalid
   * @throws {InvalidArgumentException} if bundle name is empty
   * @throws {InvalidArgumentException} if phrase key is empty
   * @since 2.0.0
   */
  constructor(languageId: LanguageID, bundleId: BundleID, phraseKey: PhraseKey, options: Array<PhraseOption>, fallback: string = '') {
    super(languageId, bundleId, phraseKey);

    argument(options.length > 0, 'Options list must contain at least one element');

    this.options = options;
    this.fallback = fallback;
  }

  /**
   * Gets translation based on phrase configuration and {@link Locals}.
   * @param locals Locals
   * @see Phrase.translate
   * @see TranslateService.translate
   * @see TranslateService.instant
   * @see TranslatePipe
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
