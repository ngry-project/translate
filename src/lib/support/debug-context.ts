import { ToString } from '../types';

/**
 * Represents debug context used to aggregate debug information for error logging.
 * @since 2.0.0
 * @internal
 */
export class DebugContext implements ToString {
  /**
   * Gets named pool of context values.
   * @since 2.0.0
   */
  private readonly info: Record<string, unknown>;

  constructor(info: Record<string, unknown>) {
    this.info = info;
  }

  /**
   * Gets string representation of debug context.
   * @since 2.0.0
   */
  toString(): string {
    return 'Context:\n' + JSON.stringify(this.info, null, 2);
  }
}
