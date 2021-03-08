import { fromEvent, Observable } from 'rxjs';
import { map, shareReplay, startWith } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Language } from './language';
import { LanguageSource } from './language-source';

/**
 * Represents an implementation of {@link LanguageSource} which uses browser settings as language source.
 * Initially, it takes the {@link Language} from {@link navigator.language} and listens to {@link Window.onlanguagechange} event
 * to push {@link Language} updates when user changes language preferences in browsers settings.
 * @since 2.0.0
 */
@Injectable({
  providedIn: 'root',
})
export class BrowserLanguageSource extends LanguageSource {
  /**
   * Gets a stream of {@link Navigator.language} updates.
   * @since 2.0.0
   * @see Navigator.language
   * @see Window.onlanguagechange
   */
  readonly language$: Observable<Language>;

  /**
   * Gets a current {@link Language} from {@link Navigator.language}.
   * @since 2.0.0
   * @see Navigator.language
   */
  get language(): Language {
    return navigator.language;
  }

  constructor() {
    super();

    this.language$ = fromEvent(window, 'languagechange').pipe(
      map(() => this.language),
      startWith(this.language),
      shareReplay(1),
    );
  }
}
