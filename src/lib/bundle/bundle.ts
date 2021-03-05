import { Language } from '../language/language';
import { PhraseCollection } from '../phrase/phrase-collection';
import { BundleID } from './bundle-id';
import { BundleToken } from './bundle-token';

/**
 * Represents a bundle of {@link Phrase}s.
 * @since 2.0.0
 * @internal
 */
export class Bundle {
  /**
   * Gets a unique ID of bundle within concrete language.
   * @since 2.0.0
   */
  readonly id: BundleID;

  /**
   * Gets the language this bundle provides phrases for.
   * @since 2.0.0
   */
  readonly language: Language;

  /**
   * Gets a composite identifier of this bundle.
   * @since 2.0.0
   */
  readonly token: BundleToken;

  /**
   * Gets a collection of phrases.
   * @since 2.0.0
   */
  readonly phrases: PhraseCollection;

  constructor(
    id: BundleID,
    language: Language,
    phrases: PhraseCollection,
  ) {
    this.id = id;
    this.language = language;
    this.token = new BundleToken(id, language);
    this.phrases = phrases;
  }
}
