import { Injectable } from '@angular/core';
import { BundleID } from './bundle-id';
import { LanguageID } from '../language/language-id';
import { BundleData } from './bundle-data';
import { PhraseCollection } from '../phrase/phrase-collection';
import { Bundle } from './bundle';
import { PhraseCompiler } from '../phrase/phrase-compiler';

@Injectable({
  providedIn: 'root',
})
export class BundleCompiler {
  constructor(
    private phraseCompiler: PhraseCompiler,
  ) {
  }

  compile(languageId: LanguageID, bundleId: BundleID, bundleData: BundleData): Bundle {
    const phrases = new PhraseCollection(
      Object.entries(bundleData).map(([phraseKey, phraseData]) => {
        return this.phraseCompiler.compile(languageId, bundleId, phraseKey, phraseData);
      }),
    );

    return new Bundle(bundleId, languageId, phrases);
  }
}
