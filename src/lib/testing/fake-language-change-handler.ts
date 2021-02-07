import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { LanguageID } from '../language/language-id';
import { LanguageChangeHandler } from '../language/language-change-handler';

@Injectable({
  providedIn: 'root',
})
export class FakeLanguageChangeHandler extends LanguageChangeHandler {
  handle(newLanguage: LanguageID, oldLanguage: LanguageID): Observable<LanguageID> {
    return of(newLanguage);
  }
}
