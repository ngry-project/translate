import { argument, typeOf } from '../../../../support/argument';
import { DebugContext } from '../../../../support/debug-context';
import { LanguageID } from '../../../../language/language-id';
import { BundleID } from '../../../../bundle/bundle-id';
import { PhraseKey } from '../../../phrase-key';
import { Operator } from './operator';

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
  constructor(languageId: LanguageID, bundleId: BundleID, phraseKey: PhraseKey, propertyName: string, value: string | number | boolean) {
    super(languageId, bundleId, phraseKey, propertyName);

    this.context = new DebugContext({languageName: languageId, bundleName: bundleId, phraseKey, propertyName, value});

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
