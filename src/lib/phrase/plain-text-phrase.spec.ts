import { PlainTextPhrase } from './plain-text-phrase';

describe('PlainTextPhrase', () => {
  describe('translate', () => {
    it('should return the text value', () => {
      const phrase = new PlainTextPhrase('en', 'bundle', 'key', 'Hello world');

      expect(phrase.translate()).toBe('Hello world');
    });
  });
});
