import { BundleID } from '../bundle/bundle-id';
import { LanguageID } from '../language/language-id';
import { Locals } from './locals';
import { Phrase } from './phrase';
import { PhraseKey } from './phrase-key';

const ENTRY: RegExp = /{\s*(\w+)\s*}/g;

export class TemplatePhrase extends Phrase {
  private readonly template: string;

  constructor(languageId: LanguageID, bundleId: BundleID, key: PhraseKey, template: string) {
    super(languageId, bundleId, key);

    this.template = template;
  }

  translate(locals: Locals = {}): string {
    return this.template.replace(ENTRY, (substring: string, key: string) => {
      return String(locals[key] ?? '');
    });
  }
}
