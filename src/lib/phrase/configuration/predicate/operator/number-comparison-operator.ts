import { Operator } from './operator';
import { DebugContext } from '../../../../support/debug-context';
import { argument, typeOf } from '../../../../support/argument';
import { Language } from '../../../../language/language';
import { BundleID } from '../../../../bundle/bundle-id';
import { PhraseKey } from '../../../phrase-key';
import { Parameter } from '../../../parameter';

/**
 * Represents a base for number comparison operators.
 * @since 2.0.0
 * @internal
 */
export abstract class NumberComparisonOperator extends Operator<number> {
  /**
   * Gets right-side value.
   * @since 2.0.0
   */
  protected readonly value: number;

  /**
   * @throws {InvalidArgumentException} if value is not a number
   */
  constructor(language: Language, bundleId: BundleID, phraseKey: PhraseKey, property: Parameter, value: number) {
    super(language, bundleId, phraseKey, property, new DebugContext({language, bundleId, phraseKey, property, value}));

    argument(typeOf(value, 'number'), `Accepted value type is number. ${this.context}`);

    this.value = value;
  }

  /**
   * Tests value.
   * @throws {InvalidArgumentException} if value has not acceptable type
   * @since 2.0.0
   */
  abstract test(value: number): boolean;
}
