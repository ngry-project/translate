import { PhraseKey } from './phrase-key';
import { Locals } from './locals';
import { BundleID } from '../bundle/bundle-id';
import { LanguageID } from '../language/language-id';

export abstract class Phrase {
  protected constructor(
    readonly languageId: LanguageID,
    readonly bundleId: BundleID,
    readonly key: PhraseKey,
  ) {
  }

  abstract translate(locals?: Locals): string;
}
