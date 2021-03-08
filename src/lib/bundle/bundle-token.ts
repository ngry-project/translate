import { Language } from '../language/language';
import { BundleID } from './bundle-id';

/**
 * Represents bundle's unique token (aka composite primary key).
 * @since 2.0.0
 * @internal
 */
export class BundleToken {
  /**
   * Gets a {@link BundleID} component of this token.
   * @since 2.0.0
   */
  private readonly id: BundleID;

  /**
   * Gets a {@link Language} component of token.
   * @since 2.0.0
   */
  private readonly language: Language;

  constructor(
    id: BundleID,
    language: Language,
  ) {
    this.id = id;
    this.language = language;
  }

  /**
   * Checks for equality of this token and the other one.
   * @since 2.0.0
   */
  equals(other: BundleToken): boolean {
    return this.id === other.id && this.language === other.language;
  }
}
