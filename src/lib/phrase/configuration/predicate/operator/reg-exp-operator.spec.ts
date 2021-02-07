import { RegExpOperator } from './reg-exp-operator';

describe('RegExpOperator', () => {
  describe('test(value)', () => {
    it('should throw InvalidArgumentException if value type is not acceptable', () => {
      const operator = new RegExpOperator('en', 'uikit', 'button', 'param', 'test');

      // tslint:disable-next-line:no-any
      expect(() => operator.test(false as any)).toThrow();
    });

    it('should test string value with default flags', () => {
      const operator = new RegExpOperator('en', 'uikit', 'button', 'param', 'test');
      expect(operator.test('test')).toBe(true);
      expect(operator.test('Test')).toBe(false);
      expect(operator.test('TEST')).toBe(false);
      expect(operator.test('Other')).toBe(false);
    });

    it('should test string value with ignore case flag', () => {
      const operator = new RegExpOperator('en', 'uikit', 'button', 'param', 'test', 'i');
      expect(operator.test('test')).toBe(true);
      expect(operator.test('Test')).toBe(true);
      expect(operator.test('TEST')).toBe(true);
      expect(operator.test('Other')).toBe(false);
    });
  });
});
