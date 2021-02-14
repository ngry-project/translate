import { Operator } from './operator';
import { DebugContext } from '../../../../support/debug-context';
import { argument, typeOf } from '../../../../support/argument';
import { Language } from '../../../../language/language';
import { BundleID } from '../../../../bundle/bundle-id';
import { PhraseKey } from '../../../phrase-key';
import { Parameter } from '../../../parameter';

/**
 * Represents {@link Operator} which performs check for value presence in set.
 * @see InOperatorSource
 * @see TranslationsCompiler.compileOperator
 * @since 2.0.0
 */
export class InOperator extends Operator<string | number | boolean> {
  private readonly values: Array<string | number | boolean>;

  /**
   * Creates new instance.
   * @throws {Error} if values list has too few elements
   * @throws {Error} if value type not acceptable
   * @since 2.0.0
   */
  constructor(
    language: Language,
    bundleId: BundleID,
    phraseKey: PhraseKey,
    propertyName: Parameter,
    values: Array<string | number | boolean>
  ) {
    super(language, bundleId, phraseKey, propertyName, new DebugContext({language, bundleId, phraseKey, propertyName, values}));

    argument(Array.isArray(values), `Values list must be array. ${this.context}`);
    argument(values.length >= 2, `Values array must contain at least 2 elements. ${this.context}`);

    values.forEach((value, index) => {
      argument(
        typeOf(value, 'string', 'number', 'boolean'),
        `Type of value at index [${index}] is not acceptable. Acceptable value types are: string, number and boolean. ${this.context}`,
      );
    });

    this.values = values;
  }

  /**
   * Tests value.
   * @param value Value to test
   * @throws {Error} if value has not acceptable type
   * @since 2.0.0
   */
  test(value: number | string | boolean): boolean {
    argument(
      typeOf(value, 'string', 'number', 'boolean'),
      `Acceptable value types are: string, number and boolean. ${this.context}`,
    );

    return this.values.includes(value);
  }
}
