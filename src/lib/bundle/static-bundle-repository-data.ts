import { Language } from '../language/language';
import { LanguageData } from '../language/language-data';

/**
 * Represents a raw static data for {@link StaticBundleRepository}.
 * @since 2.0.0
 */
export type StaticBundleRepositoryData = Record<Language, LanguageData>;
