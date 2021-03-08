import { Observable } from 'rxjs';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Locals } from '../phrase/locals';
import { PhraseKey } from '../phrase/phrase-key';
import { RootTranslateStore } from './root-translate.store';
import { TranslateService } from './translate.service';

/**
 * Represents an implementation of {@link TranslateService} which takes translations from the {@link RootTranslateStore}.
 * @since 2.0.0
 * @internal
 */
@Injectable({
  providedIn: 'root',
})
export class RootTranslateService extends TranslateService {

  constructor(
    private readonly store: RootTranslateStore,
  ) {
    super();
  }

  instant(key: PhraseKey, locals?: Locals): string {
    const phrase = this.store.snapshot.get(key);

    if (phrase) {
      return phrase.translate(locals);
    } else {
      return '';
    }
  }

  translate(key: PhraseKey, locals?: Locals): Observable<string> {
    return this.store.state.pipe(
      map(phrases => phrases.get(key)),
      filter(phrase => phrase != null),
      map(phrase => phrase!.translate(locals)),
      distinctUntilChanged(),
    );
  }
}
