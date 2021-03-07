import { BundleID } from '../bundle/bundle-id';

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
