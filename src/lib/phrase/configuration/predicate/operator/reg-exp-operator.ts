import { Operator } from './operator';
import { DebugContext } from '../../../../support/debug-context';
import { argument, typeOf } from '../../../../support/argument';

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
  private readonly _pattern: RegExp;

  /**
   * Creates new instance.
   * @param languageName Language name
   * @param bundleName Bundle name
   * @param phraseKey Phrase key
   * @param propertyName Property name
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
  constructor(languageName: string, bundleName: string, phraseKey: string, propertyName: string, pattern: string, flags?: string) {
    super(languageName, bundleName, phraseKey, propertyName);

    this.context = new DebugContext({languageName, bundleName, phraseKey, propertyName, pattern, flags});

    argument(pattern.length > 0, `Pattern cannot be empty. ${this.context}`);

    this._pattern = new RegExp(pattern, flags);
  }

  /**
   * Tests value.
   * @param value Value to test
   * @throws {Error} if value has not acceptable type
   * @since 2.0.0
   */
  test(value: string): boolean {
    argument(typeOf(value, 'string'), `Acceptable value type is string. ${this.context}`);

    return this._pattern.test(value);
  }
}
