import { DebugContext } from '../../../../support/debug-context';
import { argument } from '../../../../support/argument';

/**
 * Represents base for all operators.
 * @see EqualOperator
 * @see GreaterThanOperator
 * @see GreaterThanOrEqualOperator
 * @see InOperator
 * @see LowerThanOperator
 * @see LowerThanOrEqualOperator
 * @see NumberComparisonOperator
 * @see RegExpOperator
 * @since 2.0.0
 */
export abstract class Operator<T = unknown> {
  /**
   * Language name.
   * @since 2.0.0
   */
  readonly languageName: string;

  /**
   * Bundle name.
   * @since 2.0.0
   */
  readonly bundleName: string;

  /**
   * Phrase key.
   * @since 2.0.0
   */
  readonly phraseKey: string;

  /**
   * Property name.
   * @since 2.0.0
   */
  readonly propertyName: string;

  /**
   * Gets or sets debug context.
   * @since 2.0.0
   */
  protected context: DebugContext;

  /**
   * Creates new instance.
   * @param languageName Language name
   * @param bundleName Bundle name
   * @param phraseKey Phrase key
   * @param propertyName Property name
   * @throws {Error} if language name is invalid
   * @throws {Error} if bundle name is empty
   * @throws {Error} if phrase key is empty
   * @throws {Error} if property name is empty
   * @since 2.0.0
   */
  protected constructor(languageName: string, bundleName: string, phraseKey: string, propertyName: string) {
    this.context = new DebugContext({languageName, bundleName, phraseKey, propertyName});

    argument(languageName.length === 2, `Language name length must be equal to 2. ${this.context}`);
    argument(bundleName.length > 0, `Bundle name cannot be empty. ${this.context}`);
    argument(phraseKey.length > 0, `Phrase key cannot be empty. ${this.context}`);
    argument(propertyName.length > 0, `Property name cannot be empty. ${this.context}`);

    this.languageName = languageName;
    this.bundleName = bundleName;
    this.phraseKey = phraseKey;
    this.propertyName = propertyName;
  }

  /**
   * Tests value.
   * @param value Value to test
   * @throws {Error} if value is not acceptable
   * @since 2.0.0
   */
  abstract test(value: T): boolean;
}
