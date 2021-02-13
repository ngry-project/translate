import { InjectableProvider, InjectionToken } from '@angular/core';
import { Language } from '../language/language';
import { LanguageMapping } from '../language/language-mapping';

export const SUPPORTED_LANGUAGES = new InjectionToken<Array<Language>>('SUPPORTED_LANGUAGES');
export const DEFAULT_LANGUAGE = new InjectionToken<Language>('DEFAULT_LANGUAGE');
export const LANGUAGE_MAPPING = new InjectionToken<LanguageMapping>('LANGUAGE_MAPPING');

/**
 * Represents root configuration.
 * @since 2.0.0
 * @see TranslateModule
 * @see TranslateModule.forRoot
 * @see RootTranslateModule
 */
export interface RootConfiguration {

  /**
   * Configuration of language-related features.
   * @since 2.0.0
   */
  readonly language: {

    /**
     * Provider of default language.
     * Must provide a {@link Language}.
     * It also serves as a fallback language in the case when non-supported language has been tried to use.
     * @since 2.0.0
     * @see Language
     * @see LanguageState
     * @see LanguageStore
     * @see DEFAULT_LANGUAGE
     */
    readonly default: InjectableProvider;

    /**
     * Provider of supported languages list.
     * Must provide an {@link Array} or {@link Language}s.
     * It prevents from using a language which is not supported.
     * By default list of supported languages includes only the default one.
     * @since 2.0.0
     * @see Language
     * @see LanguageState
     * @see LanguageStore
     * @see SUPPORTED_LANGUAGES
     */
    readonly supported?: InjectableProvider;

    /**
     * Provider of language mapping.
     * Must provide an instance of {@link LanguageMapping}.
     * When omitted, an empty mapping will be used.
     * @since 2.0.0
     * @see LanguageMapping
     * @see LanguageResolver
     * @see LanguageStore
     * @see LANGUAGE_MAPPING
     */
    readonly mapping?: InjectableProvider;

    /**
     * Provider of language source.
     * Must provide an implementation of {@link LanguageSource} which initiates the language change.
     * When omitted, the default implementation is {@link DefaultLanguageSource}.
     * @since 2.0.0
     * @see LanguageSource
     * @see DefaultLanguageSource
     */
    readonly source?: InjectableProvider;

    /**
     * Configuration of language handlers.
     * @since 2.0.0
     */
    readonly handler?: {

      /**
       * Provider of language change handler.
       * Must provide an implementation of {@link LanguageChangeHandler} which will be used to confirm or decline the language change.
       * When omitted, the default implementation is {@link DefaultLanguageChangeHandler}.
       * @since 2.0.0
       * @see LanguageChangeHandler
       * @see DefaultLanguageChangeHandler
       */
      readonly change?: InjectableProvider;
    };
  };

  /**
   * Configuration of bundle-related features.
   * @since 2.0.0
   */
  readonly bundle: {

    /**
     * Provider of {@link BundleRepository} used to fetch bundles.
     * @since 2.0.0
     * @see BundleRepository
     * @see BundleSource.get
     */
    readonly repository: InjectableProvider;

    /**
     * Configuration of bundle handlers.
     * @since 2.0.0
     */
    readonly handler?: {

      /**
       * Provider of missing bundle handler.
       * Must provide an implementation of {@link MissingBundleHandler} which will be used to react on missing bundle.
       * @since 2.0.0
       * @see MissingBundleHandler
       * @see BundleSource.get
       */
      readonly missing?: InjectableProvider;
    }
  };
}
