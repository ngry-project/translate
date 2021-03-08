import { Locals } from '../../locals';
import { Operator } from './operator/operator';
import { Parameter } from '../../parameter';

/**
 * Represents {@link PhraseOption} predicate.
 * @since 2.0.0
 * @internal
 */
export class Predicate {
  /**
   * Gets named pool of {@link Operator}s associated with variable name in {@link Locals}.
   * @since 2.0.0
   */
  private readonly conditions: Record<Parameter, Operator[]>;

  constructor(conditions: Record<Parameter, Operator[]>) {
    this.conditions = conditions;
  }

  /**
   * Determines whether this {@link Predicate} matches {@link Locals}.
   * @throws {InvalidArgumentException} if phrase any operator throws such exception.
   * @since 2.0.0
   */
  test(locals: Locals): boolean {
    return Object.entries(this.conditions).every(([property, operators]) => {
      return operators.every(operator => operator.test(locals[property]));
    });
  }
}
