import { InjectionToken } from '@angular/core';
import { BundleID } from '../bundle/bundle-id';

/**
 * An {@link InjectionToken} for {@link FeatureConfiguration} provided by {@link FeatureTranslateModule}.
 * @since 2.0.0
 * @internal
 */
export const FEATURE_CONFIGURATION = new InjectionToken<FeatureConfiguration>('FEATURE_CONFIGURATION');

/**
 * Represents a configuration of {@link FeatureTranslateModule}.
 * @since 2.0.0
 */
export interface FeatureConfiguration {

  /**
   * Gets IDs of {@link Bundle}s needed by a feature module.
   * @since 2.0.0
   */
  readonly bundles: Array<BundleID>;
}
