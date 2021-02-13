import { Observable } from 'rxjs';
import { Language } from './language';

/**
 * Represents source of language information.
 * It supplies system with initial language and notifies about _intention_ to change the language
 */
export abstract class LanguageSource {
  abstract readonly language: Language;
  abstract readonly language$: Observable<Language>;
}
