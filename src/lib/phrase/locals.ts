import { ToString } from '../types';
import { Parameter } from './parameter';

export type Locals = Record<Parameter, ToString | null | undefined>;
