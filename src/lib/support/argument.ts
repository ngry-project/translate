/**
 * @deprecated Will be imported from @monument/contract
 */
export type SupplyFunction<T> = () => T;

/**
 * Result of `typeof` operator.
 * @since 2.0.0
 * @deprecated Will be imported from @monument/contract
 */
export type TypeOfResult = 'string' | 'boolean' | 'number' | 'object' | 'undefined' | 'symbol' | 'bigint' | 'function';

/**
 * @deprecated Will be imported from @monument/contract
 */
export function typeOf<T>(value: T, required: TypeOfResult, ...optional: TypeOfResult[]): boolean {
  return [required, ...optional].includes(typeof value);
}

/**
 * Tests expression resolves to `true`.
 * If it resolves to `false`, then throws {@link Error}.
 * @param expression Expression evaluation result
 * @throws {Error} if expression resolves to `false`
 * @since 2.0.0
 * @deprecated Will be imported from @monument/contract
 */
export function argument(expression: boolean): void | never;

/**
 * Tests expression resolves to `true`.
 * If it resolves to `false`, then throws {@link Error}.
 * @param expression Expression evaluation result
 * @param message Message
 * @throws {Error} if expression resolves to `false`
 * @since 2.0.0
 * @deprecated Will be imported from @monument/contract
 */
export function argument(expression: boolean, message: string): void | never;

/**
 * Tests expression resolves to `true`.
 * If it resolves to `false`, then throws {@link Error}.
 * @param expression Expression evaluation result
 * @param message Message supplier
 * @throws {Error} if expression resolves to `false`
 * @since 2.0.0
 * @deprecated Will be imported from @monument/contract
 */
export function argument(expression: boolean, message: SupplyFunction<string>): void | never;

export function argument(expression: boolean, message?: string | SupplyFunction<string>): void | never {
  if (!expression) {
    switch (typeof message) {
      case 'undefined':
        throw new Error('Expression resolved to false');
      case 'string':
        throw new Error(message);
      case 'function':
        throw new Error(message());
    }
  }
}
