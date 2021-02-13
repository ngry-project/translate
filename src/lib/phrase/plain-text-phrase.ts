import { Phrase } from './phrase';
import { Language } from '../language/language';
import { BundleID } from '../bundle/bundle-id';
import { PhraseKey } from './phrase-key';
import { Locals } from './locals';

export class PlainTextPhrase extends Phrase {
  private readonly translation: string;

  constructor(language: Language, bundleId: BundleID, key: PhraseKey, translation: string) {
    super(language, bundleId, key);

    this.translation = translation;
  }

  translate(locals?: Locals): string {
    return this.translation;
  }
}
