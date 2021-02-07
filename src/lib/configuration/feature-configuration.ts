import { InjectionToken } from '@angular/core';
import { BundleID } from '../bundle/bundle-id';

export const FEATURE_CONFIGURATION = new InjectionToken<FeatureConfiguration>('FEATURE_CONFIGURATION');

export interface FeatureConfiguration {
  readonly bundles: Array<BundleID>;
  readonly isolate?: boolean;
}
