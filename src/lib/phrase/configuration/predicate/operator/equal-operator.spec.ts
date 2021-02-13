import { EqualOperator } from './equal-operator';

describe('EqualOperator', () => {
  describe('constructor', () => {
    it('should throw error when language name length is not equal to 2', () => {
      expect(() => new EqualOperator('eng', 'uikit', 'button', 'param', 1)).toThrow();
    });

    it('should throw error when bundle name is empty', () => {
      expect(() => new EqualOperator('eng', '', 'button', 'param', 1)).toThrow();
    });

    it('should throw error when phrase key is empty', () => {
      expect(() => new EqualOperator('eng', 'uikit', '', 'param', 1)).toThrow();
    });

    it('should throw error when property name is empty', () => {
      expect(() => new EqualOperator('eng', 'uikit', 'button', '', 1)).toThrow();
    });

    it('should throw error when value type is not acceptable', () => {
      // tslint:disable-next-line:no-any
      expect(() => new EqualOperator('eng', 'uikit', 'button', '', {} as any)).toThrow();
    });
  });

  describe('test', () => {
    it('should test numeric value', () => {
      const operator = new EqualOperator('en', 'uikit', 'button', 'param', 1);
      expect(operator.test(0)).toBe(false);
      expect(operator.test(1)).toBe(true);
    });

    it('should test string value', () => {
      const operator = new EqualOperator('en', 'uikit', 'button', 'param', 'one');
      expect(operator.test('one')).toBe(true);
      expect(operator.test('two')).toBe(false);
    });

    it('should test boolean value', () => {
      const operator = new EqualOperator('en', 'uikit', 'button', 'param', true);
      expect(operator.test(true)).toBe(true);
      expect(operator.test(false)).toBe(false);
      expect(operator.test('true')).toBe(false);
    });
  });
});
