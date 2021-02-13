import { Language } from '../language/language';
import { PhraseCollection } from '../phrase/phrase-collection';
import { BundleID } from './bundle-id';
import { BundleToken } from './bundle-token';

export class Bundle {
  readonly token: BundleToken;

  constructor(
    readonly id: BundleID,
    readonly language: Language,
    readonly phrases: PhraseCollection,
  ) {
    this.token = new BundleToken(id, language);
  }
}
