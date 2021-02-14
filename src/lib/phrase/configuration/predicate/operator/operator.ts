import { DebugContext } from '../../../../support/debug-context';
import { argument } from '../../../../support/argument';
import { Language } from '../../../../language/language';
import { BundleID } from '../../../../bundle/bundle-id';
import { PhraseKey } from '../../../phrase-key';
import { Parameter } from '../../../parameter';

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
   * Gets or sets debug context.
   * @since 2.0.0
   */
  protected context: DebugContext;

  /**
   * Creates new instance.
   * @param language Language name
   * @param bundleId Bundle name
   * @param phraseKey Phrase key
   * @param property Property name
   * @param context Debug context
   * @throws {Error} if language name is invalid
   * @throws {Error} if bundle name is empty
   * @throws {Error} if phrase key is empty
   * @throws {Error} if property name is empty
   * @since 2.0.0
   */
  protected constructor(language: Language, bundleId: BundleID, phraseKey: PhraseKey, property: Parameter, context: DebugContext) {
    this.context = context;

    argument(language.length === 2, `Language name length must be equal to 2. ${this.context}`);
    argument(bundleId.length > 0, `Bundle name cannot be empty. ${this.context}`);
    argument(phraseKey.length > 0, `Phrase key cannot be empty. ${this.context}`);
    argument(property.length > 0, `Property name cannot be empty. ${this.context}`);
  }

  /**
   * Tests value.
   * @param value Value to test
   * @throws {Error} if value is not acceptable
   * @since 2.0.0
   */
  abstract test(value: T): boolean;
}
