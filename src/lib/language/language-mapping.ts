import { LanguageID } from './language-id';

export type LanguageMapping = Record<LanguageID, Array<LanguageID | RegExp>>;
