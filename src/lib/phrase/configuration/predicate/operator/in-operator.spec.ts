import { InOperator } from './in-operator';

describe('InOperator', () => {
  describe('test(value)', () => {
    it('should throw error when value type is not string, numeric or boolean', () => {
      const operator = new InOperator('en', 'uikit', 'button', 'param', [1, true, 'yes']);

      // tslint:disable-next-line:no-any
      expect(() => operator.test({} as any)).toThrow();
    });

    it('should test values of acceptable types', () => {
      const operator = new InOperator('en', 'uikit', 'button', 'param', [1, true, 'yes']);

      expect(operator.test(1)).toBe(true);
      expect(operator.test(0)).toBe(false);
      expect(operator.test(true)).toBe(true);
      expect(operator.test(false)).toBe(false);
      expect(operator.test('yes')).toBe(true);
      expect(operator.test('no')).toBe(false);
    });
  });
});
