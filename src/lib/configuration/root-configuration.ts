import { InjectableProvider, InjectionToken } from '@angular/core';
import { LanguageID } from '../language/language-id';
import { LanguageMapping } from '../language/language-mapping';

export const SUPPORTED_LANGUAGES = new InjectionToken<Iterable<LanguageID>>('SUPPORTED_LANGUAGES');
export const DEFAULT_LANGUAGE = new InjectionToken<LanguageID>('DEFAULT_LANGUAGE');
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
   * Language configuration gives you control over set of supported languages and language change behavior.
   * @since 2.0.0
   */
  readonly language: {

    /**
     * Provider of default language.
     * Must provide value of type {@link LanguageID}.
     * It also serves as a fallback language in the case when non-supported language has been tried to use.
     * @since 2.0.0
     * @see LanguageID
     * @see LanguageState
     * @see LanguageStore
     */
    readonly default: InjectableProvider;

    /**
     * Provider of supported languages list.
     * Must provide an {@link Array} or {@link LanguageID}s.
     * It prevents from using a language which is not supported.
     * @since 2.0.0
     * @see LanguageID
     */
    readonly supported: InjectableProvider;

    /**
     * Provider of language source.
     * Must provide an implementation of {@link LanguageSource} which initiates the language change.
     * @since 2.0.0
     * @see LanguageSource
     */
    readonly source: InjectableProvider;

    /**
     * Provider of language mapping.
     * Must provide an instance of {@link LanguageMapping}.
     * @since 2.0.0
     * @see LanguageMapping
     */
    readonly mapping?: InjectableProvider;

    /**
     * Language change configuration.
     * @since 2.0.0
     */
    readonly change: {

      /**
       * Provider of language change handler.
       * Must provide an implementation of {@link LanguageChangeHandler} which will be used to confirm or decline the language change.
       * @since 2.0.0
       * @see LanguageChangeHandler
       */
      readonly handler: InjectableProvider;
    };
  };

  /**
   * Bundles configuration gives you control over bundles source.
   * @since 2.0.0
   */
  readonly bundle: {

    /**
     * Provider of bundles repository.
     * Must provide an implementation of {@link BundleRepository} which will be used to get phrase bundles.
     * @since 2.0.0
     * @see BundleRepository
     * @see BundleSource
     */
    readonly repository: InjectableProvider;
  };
}
