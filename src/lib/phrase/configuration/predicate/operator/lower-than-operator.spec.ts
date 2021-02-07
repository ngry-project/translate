import { LowerThanOperator } from './lower-than-operator';

describe('LowerThanOperator', () => {
  describe('test(value)', () => {
    it('should throw error when value type is not acceptable', () => {
      const operator = new LowerThanOperator('en', 'uikit', 'button', 'param', 0);

      // tslint:disable-next-line:no-any
      expect(() => operator.test(false as any)).toThrow();
    });

    it('should test numeric value', () => {
      const operator = new LowerThanOperator('en', 'uikit', 'button', 'param', 0);
      expect(operator.test(-1)).toBe(true);
      expect(operator.test(0)).toBe(false);
      expect(operator.test(1)).toBe(false);
    });
  });
});
