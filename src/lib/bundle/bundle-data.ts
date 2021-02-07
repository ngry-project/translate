import { PhraseData } from '../phrase/phrase-data';

export interface BundleData {
  [phraseKey: string]: PhraseData;
}
