import { argument, typeOf } from '../../../../support/argument';
import { NumberComparisonOperator } from './number-comparison-operator';

/**
 * Represents an {@link Operator} which performs a lower than or equal (<=) comparison.
 * @since 2.0.0
 * @internal
 */
export class LowerThanOrEqualOperator extends NumberComparisonOperator {
  /**
   * Tests value.
   * @throws {Error} if value has not acceptable type
   * @since 2.0.0
   */
  test(value: number): boolean {
    argument(typeOf(value, 'number'), `Accepted value type is number. ${this.context}`);

    return value <= this.value;
  }
}
