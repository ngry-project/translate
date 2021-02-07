import { NumberComparisonOperator } from './number-comparison-operator';
import { argument, typeOf } from '../../../../support/argument';

/**
 * Represents {@link Operator} which performs greater than or equal (>=) comparison.
 * @see GreaterThanOrEqualOperatorSource
 * @see TranslationsCompiler.compileOperator
 * @since 2.0.0
 */
export class GreaterThanOrEqualOperator extends NumberComparisonOperator {
  /**
   * Tests value.
   * @param value Value to test
   * @throws {Error} if value has not acceptable type
   * @since 2.0.0
   */
  test(value: number): boolean {
    argument(typeOf(value, 'number'), `Accepted value type is number. ${this.context}`);

    return value >= this._value;
  }
}