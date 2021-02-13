import { Language } from '../language/language';
import { BundleID } from './bundle-id';

/**
 * Represents bundle's unique token (aka composite primary key).
 * @since 2.0.0
 */
export class BundleToken {
  private readonly id: BundleID;
  private readonly language: Language;

  constructor(
    id: BundleID,
    language: Language,
  ) {
    this.id = id;
    this.language = language;
  }

  equals(other: BundleToken): boolean {
    return this.id === other.id && this.language === other.language;
  }
}
