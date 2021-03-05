
/**
 * Represents source of operator that checks value equals to one of those in the list.
 * @since 2.0.0
 */
export type InOperatorData = {
  /**
   * Gets set of values which must include parameter value.
   * @since 2.0.0
   */
  readonly $in: Array<string | number>;
};
