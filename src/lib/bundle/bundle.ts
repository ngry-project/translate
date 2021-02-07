import { LanguageID } from '../language/language-id';
import { PhraseCollection } from '../phrase/phrase-collection';
import { BundleID } from './bundle-id';
import { BundleToken } from './bundle-token';

export class Bundle {
  readonly token: BundleToken;

  constructor(
    readonly bundleId: BundleID,
    readonly languageId: LanguageID,
    readonly phrases: PhraseCollection,
  ) {
    this.token = new BundleToken(bundleId, languageId);
  }
}
