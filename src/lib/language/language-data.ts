import { BundleData } from '../bundle/bundle-data';
import { BundleID } from '../bundle/bundle-id';

/**
 * Represents a raw language data which is a mapping between the {@link BundleID}s and the corresponding {@link BundleData}.
 * @since 2.0.0
 */
export type LanguageData = Record<BundleID, BundleData>;
