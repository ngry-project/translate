import { InjectableProvider } from '@angular/core';

/**
 * Represents root configuration.
 * @since 2.0.0
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
     */
    readonly default: InjectableProvider;

    /**
     * Provider of supported languages list.
     * Must provide an {@link Array} or {@link Language}s.
     * It prevents from using a language which is not supported.
     * By default list of supported languages includes only the default one.
     * @since 2.0.0
     */
    readonly supported?: InjectableProvider;

    /**
     * Provider of language mapping.
     * Must provide an instance of {@link LanguageMapping}.
     * When omitted, an empty mapping will be used.
     * @since 2.0.0
     */
    readonly mapping?: InjectableProvider;

    /**
     * Provider of language source.
     * Must provide an implementation of {@link LanguageSource} which initiates the language change.
     * When omitted, the default implementation is {@link DefaultLanguageSource}.
     * @since 2.0.0
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
       * When omitted, the default implementation is {@link DefaultMissingBundleHandler}.
       * @since 2.0.0
       */
      readonly missing?: InjectableProvider;
    }
  };
}
