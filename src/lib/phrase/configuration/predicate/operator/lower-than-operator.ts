import { argument, typeOf } from '../../../../support/argument';
import { NumberComparisonOperator } from './number-comparison-operator';

/**
 * Represents {@link Operator} which performs lower than (<) comparison.
 * @see LowerThanOperatorSource
 * @see TranslationsCompiler.compileOperator
 * @since 2.0.0
 */
export class LowerThanOperator extends NumberComparisonOperator {
  /**
   * Tests value.
   * @param value Value to test
   * @throws {Error} if value has not acceptable type
   * @since 2.0.0
   */
  test(value: number): boolean {
    argument(typeOf(value, 'number'), `Accepted value type is number. ${this.context}`);

    return value < this.value;
  }
}
