import { EntityCollection } from '@ngry/store';
import { Phrase } from './phrase';
import { PhraseKey } from './phrase-key';

/**
 * Represents an immutable collection of {@link Phrase}s.
 * @since 2.0.0
 * @internal
 */
export class PhraseCollection extends EntityCollection<PhraseKey, Phrase, PhraseCollection> {
  protected compareIds(a: PhraseKey, b: PhraseKey): boolean {
    return a === b;
  }

  protected create(phrases: Iterable<Phrase>): PhraseCollection {
    return new PhraseCollection(phrases);
  }

  protected selectId(phrase: Phrase): PhraseKey {
    return phrase.key;
  }
}
