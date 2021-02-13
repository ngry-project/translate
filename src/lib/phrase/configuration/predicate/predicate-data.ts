import { OperatorData } from './operator/operator-data';
import { Parameter } from '../../parameter';

/**
 * Represents named pool which stores property name and operator(s).
 * @since 2.0.0
 */
export type PredicateData = Record<Parameter, OperatorData | OperatorData[]>;
