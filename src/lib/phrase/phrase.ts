import { PhraseKey } from './phrase-key';
import { Locals } from './locals';
import { BundleID } from '../bundle/bundle-id';
import { Language } from '../language/language';

/**
 * Represents an abstract phrase.
 * @since 2.0.0
 * @internal
 */
export abstract class Phrase {
  /**
   * Gets a {@link Language} of this {@link Phrase}.
   * @since 2.0.0
   */
  protected readonly language: Language;

  /**
   * Gets a {@link BundleID} of the {@link Bundle} this {@link Phrase} belongs to.
   * @since 2.0.0
   */
  protected readonly bundleId: BundleID;

  /**
   * Gets a {@link PhraseKey}.
   * @since 2.0.0
   */
  readonly key: PhraseKey;

  protected constructor(
    language: Language,
    bundleId: BundleID,
    key: PhraseKey,
  ) {
    this.language = language;
    this.bundleId = bundleId;
    this.key = key;
  }

  /**
   * Gets a string content of this {@link Phrase}.
   * @since 2.0.0
   */
  abstract translate(locals?: Locals): string;
}
