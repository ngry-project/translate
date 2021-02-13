import { TestBed } from '@angular/core/testing';
import { PhraseCompiler } from './phrase-compiler';
import { PlainTextPhrase } from './plain-text-phrase';
import { TemplatePhrase } from './template-phrase';
import { ConfiguredPhrase } from './configuration/configured-phrase';

describe('PhraseCompiler', () => {
  let compiler: PhraseCompiler;

  beforeAll(() => {
    compiler = TestBed.inject(PhraseCompiler);
  });

  describe('compile', () => {
    it('should return PlainTextPhrase when phrase data is string without placeholders', () => {
      const phrase = compiler.compile('en', 'bundle', 'phrase', 'Hello world');

      expect(phrase).toBeInstanceOf(PlainTextPhrase);
      expect(phrase.translate()).toBe('Hello world');
    });

    it('should return TemplatePhrase when phrase data is string with placeholders', () => {
      const phrase = compiler.compile('en', 'bundle', 'phrase', 'Hello {{name}}');

      expect(phrase).toBeInstanceOf(TemplatePhrase);
      expect(phrase.translate({name: 'world'})).toBe('Hello world');
    });

    it('should return ConfiguredPhrase when phrase data is configuration object', () => {
      const phrase = compiler.compile('en', 'bundle', 'phrase', {
        options: [
          {
            when: {count: {$eq: 1}},
            then: 'Single',
          },
          {
            when: {count: {$gt: 1}},
            then: 'Many',
          },
        ],
        fallback: 'None',
      });

      expect(phrase).toBeInstanceOf(ConfiguredPhrase);
      expect(phrase.translate({count: 0})).toBe('None');
      expect(phrase.translate({count: 1})).toBe('Single');
      expect(phrase.translate({count: 2})).toBe('Many');
    });
  });
});
