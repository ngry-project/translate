import { Observable } from 'rxjs';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';
import { Inject, Injectable } from '@angular/core';
import { DEBUG_ENABLED } from '../configuration/injection-token';
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
    @Inject(DEBUG_ENABLED)
    private readonly debug: boolean,
  ) {
    super();
  }

  instant(key: PhraseKey, locals?: Locals): string {
    const phrase = this.store.snapshot.get(key);

    return phrase ? phrase.translate(locals) : this.debug ? key : '';
  }

  translate(key: PhraseKey, locals?: Locals): Observable<string> {
    return this.store.state.pipe(
      map(phrases => phrases.get(key)),
      map(phrase => phrase ? phrase.translate(locals) : this.debug ? key : ''),
      filter(value => value.length > 0),
      distinctUntilChanged(),
    );
  }
}
