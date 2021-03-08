import { EntityCollection } from '@ngry/store';
import { Bundle } from './bundle';
import { Language } from '../language/language';
import { PhraseCollection } from '../phrase/phrase-collection';
import { BundleToken } from './bundle-token';

/**
 * Represents an immutable collection of {@link Bundle}s.
 * @since 2.0.0
 * @internal
 */
export class BundleCollection extends EntityCollection<BundleToken, Bundle, BundleCollection> {
  /**
   * Collects {@link Phrase}s from all {@link Bundle}s with given {@link Language}.
   */
  collectPhrasesOf(language: Language): PhraseCollection {
    let phrases = new PhraseCollection();

    for (const bundle of this) {
      if (bundle.language === language) {
        phrases = phrases.addMany(bundle.phrases);
      }
    }

    return phrases;
  }

  protected compareIds(a: BundleToken, b: BundleToken): boolean {
    return a.equals(b);
  }

  protected create(entities: Iterable<Bundle>): BundleCollection {
    return new BundleCollection(entities);
  }

  protected selectId(entity: Bundle): BundleToken {
    return entity.token;
  }
}
