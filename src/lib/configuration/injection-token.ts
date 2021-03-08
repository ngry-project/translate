import { InjectionToken } from '@angular/core';
import { Language } from '../language/language';
import { LanguageMapping } from '../language/language-mapping';
import { FeatureConfiguration } from './feature-configuration';

/**
 * An {@link InjectionToken} for default {@link Language}s.
 * @since 2.0.0
 * @internal
 */
export const DEFAULT_LANGUAGE = new InjectionToken<Language>('DEFAULT_LANGUAGE');

/**
 * An {@link InjectionToken} for {@link Array} of supported {@link Language}s.
 * @since 2.0.0
 * @internal
 */
export const SUPPORTED_LANGUAGES = new InjectionToken<Array<Language>>('SUPPORTED_LANGUAGES');

/**
 * An {@link InjectionToken} for {@link LanguageMapping}.
 * @since 2.0.0
 * @internal
 */
export const LANGUAGE_MAPPING = new InjectionToken<LanguageMapping>('LANGUAGE_MAPPING');

/**
 * An {@link InjectionToken} for {@link FeatureConfiguration} provided by {@link FeatureTranslateModule}.
 * @since 2.0.0
 * @internal
 */
export const FEATURE_CONFIGURATION = new InjectionToken<FeatureConfiguration>('FEATURE_CONFIGURATION');
