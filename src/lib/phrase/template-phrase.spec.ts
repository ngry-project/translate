import { TemplatePhrase } from './template-phrase';

describe('TemplatePhrase', () => {
  describe('translate', () => {
    it('should interpolate parameter without spaces within name', () => {
      const phrase = new TemplatePhrase('en', 'bundle', 'key', 'Hello {{name}}');

      expect(phrase.translate({name: 'world'})).toBe('Hello world');
    });

    it('should interpolate parameter with spaces within name', () => {
      const phrase = new TemplatePhrase('en', 'bundle', 'key', 'Hello {{ name }}');

      expect(phrase.translate({name: 'world'})).toBe('Hello world');
    });

    it(`should interpolate parameter when it's not present in locals`, () => {
      const phrase = new TemplatePhrase('en', 'bundle', 'key', 'Hello {{ name }}');

      expect(phrase.translate()).toBe('Hello ');
      expect(phrase.translate({})).toBe('Hello ');
      expect(phrase.translate({value: 'world'})).toBe('Hello ');
    });

    it(`should interpolate parameter when its value equals to null`, () => {
      const phrase = new TemplatePhrase('en', 'bundle', 'key', 'Hello {{ name }}');

      expect(phrase.translate({name: null})).toBe('Hello ');
    });

    it(`should interpolate parameter when its value equals to undefined`, () => {
      const phrase = new TemplatePhrase('en', 'bundle', 'key', 'Hello {{ name }}');

      expect(phrase.translate({name: undefined})).toBe('Hello ');
    });

    it(`should interpolate parameter when its value is string`, () => {
      const phrase = new TemplatePhrase('en', 'bundle', 'key', 'Hello {{ name }}');

      expect(phrase.translate({name: 'Alex'})).toBe('Hello Alex');
    });

    it(`should interpolate parameter when its value is number`, () => {
      const phrase = new TemplatePhrase('en', 'bundle', 'key', '{{a}} + {{b}} = {{ sum }}');

      expect(phrase.translate({a: 1, b: 1, sum: 2})).toBe('1 + 1 = 2');
    });

    it(`should interpolate parameter when its value is boolean`, () => {
      const phrase = new TemplatePhrase('en', 'bundle', 'key', 'Checked: {{ checked }}');

      expect(phrase.translate({checked: true})).toBe('Checked: true');
      expect(phrase.translate({checked: false})).toBe('Checked: false');
    });
  });
});
