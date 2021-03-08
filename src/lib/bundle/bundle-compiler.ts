import { Injectable } from '@angular/core';
import { BundleID } from './bundle-id';
import { Language } from '../language/language';
import { BundleData } from './bundle-data';
import { PhraseCollection } from '../phrase/phrase-collection';
import { Bundle } from './bundle';
import { PhraseCompiler } from '../phrase/phrase-compiler';

/**
 * Represents a bundle compiler which converts raw {@link BundleData} to instances of {@link Bundle}.
 * @since 2.0.0
 * @internal
 */
@Injectable({
  providedIn: 'root',
})
export class BundleCompiler {

  constructor(
    private readonly phraseCompiler: PhraseCompiler,
  ) {
  }

  /**
   * Compiles raw {@link BundleData} into instance of {@link Bundle}.
   * @since 2.0.0
   */
  compile(language: Language, bundleId: BundleID, bundleData: BundleData): Bundle {
    const phrases = new PhraseCollection(
      Object.entries(bundleData).map(([phraseKey, phraseData]) => {
        return this.phraseCompiler.compile(language, bundleId, phraseKey, phraseData);
      }),
    );

    return new Bundle(bundleId, language, phrases);
  }
}
