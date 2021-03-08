import { Language } from './language';

/**
 * Represents a language mapping between the target {@link Language} and source {@link Language}s or {@link RegExp}s.
 * @since 2.0.0
 */
export type LanguageMapping = Record<Language, Array<Language | RegExp>>;
