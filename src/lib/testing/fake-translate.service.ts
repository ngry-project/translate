import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { PhraseKey } from '../phrase/phrase-key';
import { Locals } from '../phrase/locals';
import { TranslateService } from '../translate/translate.service';

/**
 * Represents an implementation of {@link TranslateService} for testing.
 * It simply returns a phrase key as translation.
 * @since 2.0.0
 */
@Injectable({
  providedIn: 'root',
})
export class FakeTranslateService extends TranslateService {
  instant(key: PhraseKey, locals?: Locals): string {
    return key;
  }

  translate(key: PhraseKey, locals?: Locals): Observable<string> {
    return of(key);
  }
}
