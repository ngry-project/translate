import { Language } from './language';

/**
 * Represents a request to change the current language.
 * @since 2.0.0
 */
export class LanguageChangeRequest {
  /**
   * Gets the new {@link Language}.
   * @since 2.0.0
   */
  readonly next: Language;

  /**
   * Gets the previous {@link Language}.
   * @since 2.0.0
   */
  readonly previous: Language;

  constructor(
    next: Language,
    previous: Language,
  ) {
    this.next = next;
    this.previous = previous;
  }
}
