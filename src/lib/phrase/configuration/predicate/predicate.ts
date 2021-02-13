import { Locals} from '../../locals';
import { Operator } from './operator/operator';
import { Parameter } from '../../parameter';

/**
 * Represents {@link PhraseOption} predicate.
 * @see PhraseOption.when
 * @since 2.0.0
 */
export class Predicate {
  /**
   * Gets named pool of {@link Operator}s associated with variable name in {@link Locals}.
   * @since 2.0.0
   */
  private readonly conditions: Record<Parameter, Operator[]>;

  /**
   * Creates new instance.
   * @param conditions Conditions represented as map of property names and operators
   */
  constructor(conditions: Record<Parameter, Operator[]>) {
    this.conditions = conditions;
  }

  /**
   * Determines whether this {@link Predicate} matches {@link Locals}.
   * @throws {InvalidArgumentException} if phrase any operator throws such exception.
   * @see Operator.test
   * @since 2.0.0
   */
  test(locals: Locals): boolean {
    return Object.entries(this.conditions).every(([property, operators]) => {
      return operators.every(operator => operator.test(locals[property]));
    });
  }
}
