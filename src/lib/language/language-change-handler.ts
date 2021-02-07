import { Observable } from 'rxjs';
import { LanguageID } from './language-id';

export abstract class LanguageChangeHandler {
  abstract handle(newLanguage: LanguageID, oldLanguage: LanguageID): Observable<LanguageID>;
}
