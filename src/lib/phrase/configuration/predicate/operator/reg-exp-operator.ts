import { Operator } from './operator';
import { DebugContext } from '../../../../support/debug-context';
import { argument, typeOf } from '../../../../support/argument';
import { Language } from '../../../../language/language';
import { BundleID } from '../../../../bundle/bundle-id';
import { PhraseKey } from '../../../phrase-key';
import { Parameter } from '../../../parameter';

/**
 * Represents {@link Operator} which matches values against regular expression.
 * @since 2.0.0
 * @internal
 */
export class RegExpOperator extends Operator<string> {
  /**
   * Gets regular expression.
   * @since 2.0.0
   */
  private readonly pattern: RegExp;

  /**
   * @throws {Error} if language name is invalid
   * @throws {Error} if bundle name is empty
   * @throws {Error} if phrase key is empty
   * @throws {Error} if property name is empty
   * @throws {Error} if pattern is empty
   */
  constructor(language: Language, bundleId: BundleID, phraseKey: PhraseKey, property: Parameter, pattern: string, flags?: string) {
    super(language, bundleId, phraseKey, property, new DebugContext({language, bundleId, phraseKey, property, pattern, flags}));

    argument(pattern.length > 0, `Pattern cannot be empty. ${this.context}`);

    this.pattern = new RegExp(pattern, flags);
  }

  /**
   * Tests value.
   * @throws {Error} if value has not acceptable type
   * @since 2.0.0
   */
  test(value: string): boolean {
    argument(typeOf(value, 'string'), `Acceptable value type is string. ${this.context}`);

    return this.pattern.test(value);
  }
}
