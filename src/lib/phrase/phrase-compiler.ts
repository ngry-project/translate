import { Injectable } from '@angular/core';
import { BundleID } from '../bundle/bundle-id';
import { Language } from '../language/language';
import { Phrase } from './phrase';
import { PhraseKey } from './phrase-key';
import { PhraseData } from './phrase-data';
import { PlainTextPhrase } from './plain-text-phrase';
import { TemplatePhrase } from './template-phrase';
import { Predicate } from './configuration/predicate/predicate';
import { PhraseOption } from './configuration/phrase-option';
import { ConfiguredPhrase } from './configuration/configured-phrase';
import { PredicateCompiler } from './configuration/predicate/predicate-compiler';

/**
 * Represents a phrase compiler which converts a raw {@link PhraseData} into corresponding implementation of {@link Phrase}.
 * @since 2.0.0
 * @internal
 */
@Injectable({
  providedIn: 'root',
})
export class PhraseCompiler {

  constructor(
    private predicateCompiler: PredicateCompiler,
  ) {
  }

  /**
   * Converts a raw {@link PhraseData} into corresponding implementation of {@link Phrase}.
   * @since 2.0.0
   */
  compile(language: Language, bundleId: BundleID, phraseKey: PhraseKey, phraseData: PhraseData): Phrase {
    if (typeof phraseData === 'string') {
      if (TemplatePhrase.test(phraseData)) {
        return new TemplatePhrase(language, bundleId, phraseKey, phraseData);
      } else {
        return new PlainTextPhrase(language, bundleId, phraseKey, phraseData);
      }
    } else {
      const phraseOptions: PhraseOption[] = phraseData.options.map(phraseOptionData => {
        const predicate: Predicate = this.predicateCompiler.compile(language, bundleId, phraseKey, phraseOptionData.when);
        const phrase: Phrase = this.compile(language, bundleId, phraseKey, phraseOptionData.then);

        return new PhraseOption(predicate, phrase);
      });

      return new ConfiguredPhrase(language, bundleId, phraseKey, phraseOptions, phraseData.fallback);
    }
  }
}
