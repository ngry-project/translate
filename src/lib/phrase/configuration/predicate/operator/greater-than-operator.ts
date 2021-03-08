import { NumberComparisonOperator } from './number-comparison-operator';
import { argument, typeOf } from '../../../../support/argument';

/**
 * Represents {@link Operator} which performs greater than (>) comparison.
 * @since 2.0.0
 * @internal
 */
export class GreaterThanOperator extends NumberComparisonOperator {
  /**
   * Tests value.
   * @throws {Error} if `value` has not acceptable type
   * @since 2.0.0
   */
  test(value: number): boolean {
    argument(typeOf(value, 'number'), `Accepted value type is number. ${this.context}`);
    argument(!isNaN(value), `NaN is not acceptable. ${this.context}`);

    return value > this.value;
  }
}
