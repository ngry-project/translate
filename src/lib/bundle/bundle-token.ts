import { LanguageID } from '../language/language-id';
import { BundleID } from './bundle-id';

/**
 * Represents bundle's unique token (aka composite primary key).
 * @since 2.0.0
 */
export class BundleToken {
  private readonly bundleId: BundleID;
  private readonly languageId: LanguageID;

  constructor(
    bundleId: BundleID,
    languageId: LanguageID,
  ) {
    this.bundleId = bundleId;
    this.languageId = languageId;
  }

  equals(other: BundleToken): boolean {
    return this.bundleId === other.bundleId && this.languageId === other.languageId;
  }
}
