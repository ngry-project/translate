import { PhraseData } from '../phrase/phrase-data';
import { PhraseKey } from '../phrase/phrase-key';

/**
 * Represents a raw data of a {@link Bundle}. In a nutshell it's a simple mapping between {@link PhraseKey} and {@link PhraseData}.
 * @since 2.0.0
 */
export type BundleData = Record<PhraseKey, PhraseData>;
