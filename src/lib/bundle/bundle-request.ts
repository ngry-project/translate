import { Language } from '../language/language';
import { BundleID } from './bundle-id';

/**
 * Represents a request for the data of the single bundle of specific language.
 * @since 2.0.0
 */
export class BundleRequest {
  /**
   * Gets a desired language of phrases in requested bundle.
   * @since 2.0.0
   */
  readonly language: Language;

  /**
   * Gets an ID of requested bundle.
   * @since 2.0.0
   */
  readonly bundleId: BundleID;

  constructor(
    language: Language,
    bundleId: BundleID,
  ) {
    this.language = language;
    this.bundleId = bundleId;
  }
}
