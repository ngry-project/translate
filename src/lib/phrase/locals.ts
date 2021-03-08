import { ToString } from '../types';
import { Parameter } from './parameter';

/**
 * Represents a context for phrase interpolation which is a mapping between {@link Parameter} name and value that is serializable to string.
 * @since 2.0.0
 */
export type Locals = Record<Parameter, ToString | null | undefined>;
