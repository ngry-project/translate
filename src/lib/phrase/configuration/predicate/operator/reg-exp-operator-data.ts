
/**
 * Represents source of operator that tests value against regular expression.
 * @since 2.0.0
 */
export interface RegExpOperatorData {
  /**
   * Gets regular expression pattern.
   * @since 2.0.0
   */
  readonly $regexp: string;

  /**
   * Gets regular expression flags.
   * @since 2.0.0
   */
  readonly $flags?: string;
}
