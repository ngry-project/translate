import { Phrase } from './phrase';
import { BundleID } from '../bundle/bundle-id';
import { Language } from '../language/language';
import { Locals } from './locals';
import { PhraseKey } from './phrase-key';

/**
 * Represents an implementation of {@link Phrase} which uses a simple text value.
 * @since 2.0.0
 * @internal
 */
export class PlainTextPhrase extends Phrase {
  private readonly content: string;

  constructor(language: Language, bundleId: BundleID, key: PhraseKey, content: string) {
    super(language, bundleId, key);

    this.content = content;
  }

  /**
   * Gets a text content of this {@link Phrase}.
   * @since 2.0.0
   */
  translate(locals?: Locals): string {
    return this.content;
  }
}
