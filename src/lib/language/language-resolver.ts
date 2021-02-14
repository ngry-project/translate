import { Inject, Injectable } from '@angular/core';
import { DEFAULT_LANGUAGE, LANGUAGE_MAPPING, SUPPORTED_LANGUAGES } from '../configuration/root-configuration';
import { Language } from './language';
import { LanguageMapping } from './language-mapping';

@Injectable({
  providedIn: 'root',
})
export class LanguageResolver {

  constructor(
    @Inject(DEFAULT_LANGUAGE) private readonly defaultLanguage: Language,
    @Inject(SUPPORTED_LANGUAGES) private readonly supportedLanguages: Array<Language>,
    @Inject(LANGUAGE_MAPPING) private readonly mapping: LanguageMapping,
  ) {
  }

  resolve(language: Language): Language {
    const candidates = this.findTargets(language);

    if (candidates.length > 1) {
      console.warn(
        `Found ${candidates.length} candidates for language "${language}": ${candidates.map(candidate => `"${candidate}"`).join(', ')}.\n` +
        `The first one (${candidates[0]}) will be used.`,
      );

      return candidates[0];
    } else if (candidates.length === 1) {
      return candidates[0];
    } else {
      if (this.supportedLanguages.includes(language)) {
        return language;
      } else {
        return this.defaultLanguage;
      }
    }
  }

  private findTargets(language: Language): Array<Language> {
    const targets: Array<Language> = [];

    for (const [target, sources] of Object.entries(this.mapping)) {
      const matches = sources.some(source => {
        if (typeof source === 'string') {
          return source.toLowerCase() === language.toLowerCase();
        } else {
          return source.test(language);
        }
      });

      if (matches) {
        targets.push(target);
      }
    }

    return targets;
  }
}
