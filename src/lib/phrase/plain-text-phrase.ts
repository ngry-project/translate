import { Phrase } from './phrase';
import { LanguageID } from '../language/language-id';
import { BundleID } from '../bundle/bundle-id';
import { PhraseKey } from './phrase-key';
import { Locals } from './locals';

export class PlainTextPhrase extends Phrase {
  private readonly translation: string;

  constructor(languageId: LanguageID, bundleId: BundleID, key: PhraseKey, translation: string) {
    super(languageId, bundleId, key);

    this.translation = translation;
  }

  translate(locals?: Locals): string {
    return this.translation;
  }
}
