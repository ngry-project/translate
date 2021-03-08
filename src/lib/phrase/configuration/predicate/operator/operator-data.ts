import { EqualOperatorData } from './equal-operator-data';
import { GreaterThanOperatorData } from './greater-than-operator-data';
import { GreaterThanOrEqualOperatorData } from './greater-than-or-equal-operator-data';
import { LowerThanOperatorData } from './lower-than-operator-data';
import { LowerThanOrEqualOperatorData } from './lower-than-or-equal-operator-data';
import { RegExpOperatorData } from './reg-exp-operator-data';
import { InOperatorData } from './in-operator-data';

/**
 * Represents a raw state of supported operators.
 * @since 2.0.0
 */
export type OperatorData =
  EqualOperatorData
  | GreaterThanOperatorData
  | GreaterThanOrEqualOperatorData
  | LowerThanOperatorData
  | LowerThanOrEqualOperatorData
  | RegExpOperatorData
  | InOperatorData;
