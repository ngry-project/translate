import { ToString } from '../types';

/**
 * Represents debug context used to aggregate debug information for error logging.
 * @since 2.0.0
 */
export class DebugContext implements ToString {
  /**
   * Gets named pool of context values.
   * @since 2.0.0
   */
  private readonly _info: Record<string, unknown>;

  /**
   * Creates new instance.
   * @param info Context information
   * @since 2.0.0
   */
  constructor(info: Record<string, unknown>) {
    this._info = info;
  }

  /**
   * Gets string representation of debug context.
   * @since 2.0.0
   */
  toString(): string {
    return 'Context:\n' + JSON.stringify(this._info, null, 2);
  }
}
