import { argument, typeOf } from '../../../../support/argument';
import { DebugContext } from '../../../../support/debug-context';
import { Language } from '../../../../language/language';
import { BundleID } from '../../../../bundle/bundle-id';
import { PhraseKey } from '../../../phrase-key';
import { Operator } from './operator';
import { Parameter } from '../../../parameter';

/**
 * Represents {@link Operator} which performs strict equality (===) comparison.
 * @see EqualOperatorSource
 * @see TranslationsCompiler.compileOperator
 * @since 2.0.0
 */
export class EqualOperator extends Operator<string | number | boolean> {
  private readonly value: string | number | boolean;

  /**
   * @throws {Error} if `value` type not acceptable
   * @since 2.0.0
   */
  constructor(language: Language, bundleId: BundleID, phraseKey: PhraseKey, property: Parameter, value: string | number | boolean) {
    super(language, bundleId, phraseKey, property, new DebugContext({language, bundleId, phraseKey, property, value}));

    argument(
      typeOf(value, 'number', 'string', 'boolean'),
      `Accepted types of value are: string, number and boolean. ${this.context}`,
    );

    this.value = value;
  }

  /**
   * Tests value.
   * @param value Value to test
   * @throws {Error} if value has not acceptable type
   * @since 2.0.0
   */
  test(value: string | number | boolean): boolean {
    argument(
      typeOf(value, 'number', 'string', 'boolean'),
      `Accepted types of value are: string, number and boolean. ${this.context}`,
    );

    return value === this.value;
  }
}
