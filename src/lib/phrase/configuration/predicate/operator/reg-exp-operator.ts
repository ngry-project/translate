import { Operator } from './operator';
import { DebugContext } from '../../../../support/debug-context';
import { argument, typeOf } from '../../../../support/argument';
import { Language } from '../../../../language/language';
import { BundleID } from '../../../../bundle/bundle-id';
import { PhraseKey } from '../../../phrase-key';
import { Parameter } from '../../../parameter';

/**
 * Represents {@link Operator} which matches values against regular expression.
 * @see RegExpOperatorSource
 * @see TranslationsCompiler.compileOperator
 * @since 2.0.0
 */
export class RegExpOperator extends Operator<string> {
  /**
   * Gets regular expression.
   * @since 2.0.0
   */
  private readonly pattern: RegExp;

  /**
   * Creates new instance.
   * @param language Language name
   * @param bundleId Bundle name
   * @param phraseKey Phrase key
   * @param property Property name
   * @param pattern RegExp pattern.
   * @param flags RegExp flags.
   * @throws {Error} if language name is invalid
   * @throws {Error} if bundle name is empty
   * @throws {Error} if phrase key is empty
   * @throws {Error} if property name is empty
   * @throws {Error} if pattern is empty
   * @see RegExpOperatorSource.pattern
   * @see RegExpOperatorSource.flags
   * @since 2.0.0
   */
  constructor(language: Language, bundleId: BundleID, phraseKey: PhraseKey, property: Parameter, pattern: string, flags?: string) {
    super(language, bundleId, phraseKey, property, new DebugContext({language, bundleId, phraseKey, property, pattern, flags}));

    argument(pattern.length > 0, `Pattern cannot be empty. ${this.context}`);

    this.pattern = new RegExp(pattern, flags);
  }

  /**
   * Tests value.
   * @param value Value to test
   * @throws {Error} if value has not acceptable type
   * @since 2.0.0
   */
  test(value: string): boolean {
    argument(typeOf(value, 'string'), `Acceptable value type is string. ${this.context}`);

    return this.pattern.test(value);
  }
}
