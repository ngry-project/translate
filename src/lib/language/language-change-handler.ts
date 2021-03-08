import { Observable } from 'rxjs';
import { Language } from './language';
import { LanguageChangeRequest } from './language-change-request';

/**
 * Represents a handler of {@link LanguageChangeRequest}.
 * Concrete implementation decides:
 * - whether to change the the current language or not
 * - what's the next value of the current language will be
 * @since 2.0.0
 */
export abstract class LanguageChangeHandler {
  /**
   * Handles a {@link LanguageChangeRequest}.
   * @since 2.0.0
   */
  abstract handle(request: LanguageChangeRequest): Observable<Language>;
}
