import { Observable } from 'rxjs';
import { Language } from './language';
import { LanguageChangeRequest } from './language-change-request';

export abstract class LanguageChangeHandler {
  abstract handle(request: LanguageChangeRequest): Observable<Language>;
}
