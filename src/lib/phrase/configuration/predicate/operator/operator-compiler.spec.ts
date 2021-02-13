import { TestBed } from '@angular/core/testing';
import { EqualOperator } from './equal-operator';
import { OperatorCompiler } from './operator-compiler';
import { GreaterThanOperator } from './greater-than-operator';
import { GreaterThanOrEqualOperator } from './greater-than-or-equal-operator';
import { LowerThanOrEqualOperator } from './lower-than-or-equal-operator';
import { LowerThanOperator } from './lower-than-operator';
import { InOperator } from './in-operator';
import { RegExpOperator } from './reg-exp-operator';

describe('OperatorCompiler', () => {
  let compiler: OperatorCompiler;

  beforeAll(() => {
    compiler = TestBed.inject(OperatorCompiler);
  });

  describe('compile', () => {
    it('should compile $eq with numeric value to EqualOperator', () => {
      const operator: EqualOperator = compiler.compile('en', 'bundle', 'phrase.key', 'property', {
        $eq: 1,
      }) as EqualOperator;

      expect(operator).toBeInstanceOf(EqualOperator);
    });

    it('should compile $eq with string value to EqualOperator', () => {
      const operator: EqualOperator = compiler.compile('en', 'bundle', 'phrase.key', 'property', {
        $eq: 'val',
      }) as EqualOperator;

      expect(operator).toBeInstanceOf(EqualOperator);
    });

    it('should compile $eq with boolean value to EqualOperator', () => {
      const operator: EqualOperator = compiler.compile('en', 'bundle', 'phrase.key', 'property', {
        $eq: true,
      }) as EqualOperator;

      expect(operator).toBeInstanceOf(EqualOperator);
    });

    it('should compile $gt with numeric value to GreaterThanOperator', () => {
      const operator: GreaterThanOperator = compiler.compile('en', 'bundle', 'phrase.key', 'property', {
        $gt: 1,
      }) as GreaterThanOperator;

      expect(operator).toBeInstanceOf(GreaterThanOperator);
    });

    it('should compile $gte with numeric value to GreaterThanOrEqualOperator', () => {
      const operator: GreaterThanOrEqualOperator = compiler.compile('en', 'bundle', 'phrase.key', 'property', {
        $gte: 1,
      }) as GreaterThanOrEqualOperator;

      expect(operator).toBeInstanceOf(GreaterThanOrEqualOperator);
    });

    it('should compile $lt with numeric value to LowerThanOperator', () => {
      const operator: LowerThanOperator = compiler.compile('en', 'bundle', 'phrase.key', 'property', {
        $lt: 1,
      }) as LowerThanOperator;

      expect(operator).toBeInstanceOf(LowerThanOperator);
    });

    it('should compile $lte with numeric value to LowerThanOrEqualOperator', () => {
      const operator: LowerThanOrEqualOperator = compiler.compile('en', 'bundle', 'phrase.key', 'property', {
        $lte: 1,
      }) as LowerThanOrEqualOperator;

      expect(operator).toBeInstanceOf(LowerThanOrEqualOperator);
    });

    it('should compile $in with numeric values to InOperator', () => {
      const operator: InOperator = compiler.compile('en', 'bundle', 'phrase.key', 'property', {
        $in: [1, 0],
      }) as InOperator;

      expect(operator).toBeInstanceOf(InOperator);
    });

    it('should compile $in with string values to InOperator', () => {
      const operator: InOperator = compiler.compile('en', 'bundle', 'phrase.key', 'property', {
        $in: ['a', 'A'],
      }) as InOperator;

      expect(operator).toBeInstanceOf(InOperator);
    });

    it('should compile $in with mixed values to InOperator', () => {
      const operator: InOperator = compiler.compile('en', 'bundle', 'phrase.key', 'property', {
        $in: [1, '1'],
      }) as InOperator;

      expect(operator).toBeInstanceOf(InOperator);
    });

    it('should compile $regexp without flags to RegExpOperator', () => {
      const operator: RegExpOperator = compiler.compile('en', 'bundle', 'phrase.key', 'property', {
        $regexp: '\w+',
      }) as RegExpOperator;

      expect(operator).toBeInstanceOf(RegExpOperator);
    });

    it('should compile $regexp with flags to RegExpOperator', () => {
      const operator: RegExpOperator = compiler.compile('en', 'bundle', 'phrase.key', 'property', {
        $regexp: '\w+',
        $flags: 'i',
      }) as RegExpOperator;

      expect(operator).toBeInstanceOf(RegExpOperator);
    });

    it('should throw an error when operator is not supported', () => {
      expect(() => {
        // tslint:disable-next-line:no-any
        compiler.compile('en', 'bundle', 'phrase.key', 'property', {} as any);
      }).toThrowError('Cannot recognize operator by it\'s source');
    });
  });
});
