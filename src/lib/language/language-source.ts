import { Observable } from 'rxjs';
import { LanguageID } from './language-id';

/**
 * Represents source of language information.
 * It supplies system with initial language an
 */
export abstract class LanguageSource {
  abstract readonly language: LanguageID;
  abstract readonly language$: Observable<LanguageID>;
}
