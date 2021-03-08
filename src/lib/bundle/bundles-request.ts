import { Language } from '../language/language';
import { BundleID } from './bundle-id';

/**
 * Represents a request for multiple {@link Bundle}s.
 * @since 2.0.0
 * @internal
 */
export class BundlesRequest {

  /**
   * Gets the {@link Language} of requested {@link Bundle}s.
   * @since 2.0.0
   */
  readonly language: Language;

  /**
   * Gets {@link BundleID}s of requested {@link Bundle}s.
   * @since 2.0.0
   */
  readonly bundleIds: Iterable<BundleID>;

  constructor(
    language: Language,
    bundleIds: Iterable<BundleID>,
  ) {
    this.bundleIds = bundleIds;
    this.language = language;
  }
}
