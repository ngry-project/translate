import { Injectable } from '@angular/core';
import { BundleID } from '../bundle/bundle-id';
import { LanguageID } from '../language/language-id';
import { Phrase } from './phrase';
import { PhraseKey } from './phrase-key';
import { PhraseData } from './phrase-data';
import { PlainTextPhrase } from './plain-text-phrase';
import { TemplatePhrase } from './template-phrase';
import { Predicate } from './configuration/predicate/predicate';
import { PhraseOption } from './configuration/phrase-option';
import { ConfiguredPhrase } from './configuration/configured-phrase';
import { PredicateCompiler } from './configuration/predicate/predicate-compiler';

@Injectable({
  providedIn: 'root',
})
export class PhraseCompiler {

  constructor(
    private predicateCompiler: PredicateCompiler,
  ) {
  }

  compile(languageId: LanguageID, bundleId: BundleID, phraseKey: PhraseKey, phraseData: PhraseData): Phrase {
    if (typeof phraseData === 'string') {
      if (phraseData.includes('{')) {
        return new TemplatePhrase(languageId, bundleId, phraseKey, phraseData);
      } else {
        return new PlainTextPhrase(languageId, bundleId, phraseKey, phraseData);
      }
    } else {
      const phraseOptions: PhraseOption[] = phraseData.options.map(phraseOptionData => {
        const predicate: Predicate = this.predicateCompiler.compile(languageId, bundleId, phraseKey, phraseOptionData.when);
        const phrase: Phrase = this.compile(languageId, bundleId, phraseKey, phraseOptionData.then);

        return new PhraseOption(predicate, phrase);
      });

      return new ConfiguredPhrase(languageId, bundleId, phraseKey, phraseOptions, phraseData.fallback);
    }
  }
}
