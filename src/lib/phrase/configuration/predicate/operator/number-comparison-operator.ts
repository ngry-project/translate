import { Operator } from './operator';
import { DebugContext } from '../../../../support/debug-context';
import { argument, typeOf } from '../../../../support/argument';
import { Language } from '../../../../language/language';
import { BundleID } from '../../../../bundle/bundle-id';
import { PhraseKey } from '../../../phrase-key';
import { Parameter } from '../../../parameter';

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
  protected readonly value: number;

  /**
   * Creates new instance.
   * @param language Language name
   * @param bundleId Bundle name
   * @param phraseKey Phrase key
   * @param property Property name
   * @param value Right-side value
   * @throws {InvalidArgumentException} if value is not a number
   * @since 2.0.0
   */
  constructor(language: Language, bundleId: BundleID, phraseKey: PhraseKey, property: Parameter, value: number) {
    super(language, bundleId, phraseKey, property, new DebugContext({language, bundleId, phraseKey, property, value}));

    argument(typeOf(value, 'number'), `Accepted value type is number. ${this.context}`);

    this.value = value;
  }

  /**
   * Tests value.
   * @param value Value to test
   * @throws {InvalidArgumentException} if value has not acceptable type
   * @since 2.0.0
   */
  abstract test(value: number): boolean;
}
