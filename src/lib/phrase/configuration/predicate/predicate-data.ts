import { OperatorData } from './operator/operator-data';
import { Parameter } from '../../parameter';

/**
 * Represents a predicate data which is a mapping between the {@link Parameter} and one or more {@link OperatorData}.
 * @since 2.0.0
 */
export type PredicateData = Record<Parameter, OperatorData | OperatorData[]>;
