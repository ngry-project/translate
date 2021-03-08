import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Language } from './language';
import { LanguageChangeHandler } from './language-change-handler';
import { LanguageChangeRequest } from './language-change-request';

/**
 * Represents an implementation of {@link LanguageChangeHandler} used by default.
 * It simply confirms the language change.
 * @since 2.0.0
 * @internal
 */
@Injectable({
  providedIn: 'root',
})
export class DefaultLanguageChangeHandler extends LanguageChangeHandler {
  handle(request: LanguageChangeRequest): Observable<Language> {
    return of(request.next);
  }
}
