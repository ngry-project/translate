import { GreaterThanOrEqualOperator } from './greater-than-or-equal-operator';

describe('GreaterThanOrEqualOperator', () => {
  describe('test', () => {
    it('should throw InvalidArgumentException if value type is not acceptable', () => {
      const operator = new GreaterThanOrEqualOperator('en', 'uikit', 'button', 'param', 0);

      // tslint:disable-next-line:no-any
      expect(() => operator.test(false as any)).toThrow();
    });

    it('should test numeric value', () => {
      const operator = new GreaterThanOrEqualOperator('en', 'uikit', 'button', 'param', 0);
      expect(operator.test(-1)).toBe(false);
      expect(operator.test(0)).toBe(true);
      expect(operator.test(1)).toBe(true);
    });
  });
});
