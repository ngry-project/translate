import { PhraseKey } from './phrase-key';
import { Locals } from './locals';
import { BundleID } from '../bundle/bundle-id';
import { Language } from '../language/language';

export abstract class Phrase {
  protected constructor(
    protected readonly language: Language,
    protected readonly bundleId: BundleID,
    readonly key: PhraseKey,
  ) {
  }

  abstract translate(locals?: Locals): string;
}
