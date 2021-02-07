import { Operator } from './operator';
import { DebugContext } from '../../../../support/debug-context';
import { argument, typeOf } from '../../../../support/argument';

/**
 * Represents base for number comparison operators.
 * @see GreaterThanOperator
 * @see GreaterThanOrEqualOperator
 * @see LowerThanOperator
 * @see LowerThanOrEqualOperator
 * @since 2.0.0
 */
export abstract class NumberComparisonOperator extends Operator<number> {
  /**
   * Gets right-side value.
   * @since 2.0.0
   */
  protected readonly _value: number;

  /**
   * Creates new instance.
   * @param languageName Language name
   * @param bundleName Bundle name
   * @param phraseKey Phrase key
   * @param propertyName Property name
   * @param value Right-side value
   * @throws {Error} if value type not acceptable
   * @since 2.0.0
   */
  constructor(languageName: string, bundleName: string, phraseKey: string, propertyName: string, value: number) {
    super(languageName, bundleName, phraseKey, propertyName);

    this.context = new DebugContext({languageName, bundleName, phraseKey, propertyName, value});

    argument(typeOf(value, 'number'), `Accepted value type is number. ${this.context}`);

    this._value = value;
  }

  /**
   * Tests value.
   * @param value Value to test
   * @throws {InvalidArgumentException} if value has not acceptable type
   * @since 2.0.0
   */
  abstract test(value: number): boolean;
}
