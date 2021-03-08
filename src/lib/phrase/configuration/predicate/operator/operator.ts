import { DebugContext } from '../../../../support/debug-context';
import { argument } from '../../../../support/argument';
import { Language } from '../../../../language/language';
import { BundleID } from '../../../../bundle/bundle-id';
import { PhraseKey } from '../../../phrase-key';
import { Parameter } from '../../../parameter';

/**
 * Represents base for all operators.
 * @since 2.0.0
 * @internal
 */
export abstract class Operator<T = unknown> {
  /**
   * Gets or sets debug context.
   * @since 2.0.0
   */
  protected context: DebugContext;

  /**
   * @throws {Error} if language name is invalid
   * @throws {Error} if bundle name is empty
   * @throws {Error} if phrase key is empty
   * @throws {Error} if property name is empty
   */
  protected constructor(language: Language, bundleId: BundleID, phraseKey: PhraseKey, property: Parameter, context: DebugContext) {
    this.context = context;

    argument(language.length === 2, `Language name length must be equal to 2. ${this.context}`);
    argument(bundleId.length > 0, `Bundle name cannot be empty. ${this.context}`);
    argument(phraseKey.length > 0, `Phrase key cannot be empty. ${this.context}`);
    argument(property.length > 0, `Property name cannot be empty. ${this.context}`);
  }

  /**
   * Tests value.
   * @throws {Error} if value is not acceptable
   * @since 2.0.0
   */
  abstract test(value: T): boolean;
}
