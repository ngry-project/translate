import { Observable, of } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { DEBUG_ENABLED } from '../configuration/injection-token';
import { Locals } from '../phrase/locals';
import { PhraseKey } from '../phrase/phrase-key';
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

  constructor(
    @Inject(DEBUG_ENABLED)
    private readonly debug: boolean,
  ) {
    super();
  }

  instant(key: PhraseKey, locals?: Locals): string {
    return this.debug ? key : '';
  }

  translate(key: PhraseKey, locals?: Locals): Observable<string> {
    return of(this.debug ? key : '');
  }
}
