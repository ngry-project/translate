import { BundleID } from '../bundle/bundle-id';
import { Language } from '../language/language';
import { Locals } from './locals';
import { Parameter } from './parameter';
import { Phrase } from './phrase';
import { PhraseKey } from './phrase-key';

// @dynamic
const ENTRY: RegExp = /{{\s*(\w+)\s*}}/g;

/**
 * Represents an implementation of {@link Phrase} which interpolates using parameters from {@link Locals}.
 * @since 2.0.0
 * @internal
 */
export class TemplatePhrase extends Phrase {
  static test(phrase: string): boolean {
    return ENTRY.test(phrase);
  }

  private readonly template: string;

  constructor(language: Language, bundleId: BundleID, key: PhraseKey, template: string) {
    super(language, bundleId, key);

    this.template = template;
  }

  /**
   * Gets an interpolated {@link Phrase} content.
   * @since 2.0.0
   */
  translate(locals: Locals = {}): string {
    return this.template.replace(ENTRY, (substring: string, parameter: Parameter) => {
      return String(locals[parameter] ?? '');
    });
  }
}
