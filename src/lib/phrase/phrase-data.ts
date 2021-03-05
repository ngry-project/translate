import { ConfiguredPhraseData } from './configuration/configured-phrase-data';

/**
 * Represents a raw phrase data which is either a phrase text value or {@link ConfiguredPhraseData}.
 * @since 2.0.0
 */
export type PhraseData = string | ConfiguredPhraseData;
