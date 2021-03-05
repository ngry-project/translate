import { Observable } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { Inject, Injectable } from '@angular/core';
import { StoreBase } from '@ngry/store';
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from '../configuration/root-configuration';
import { Language } from './language';
import { LanguageChangeHandler } from './language-change-handler';
import { LanguageChangeRequest } from './language-change-request';
import { LanguageSource } from './language-source';
import { LanguageState } from './language-state';
import { LanguageResolver } from './language-resolver';

/**
 * Represents a store of the current language.
 * Language store is a mediator between:
 * - the {@link LanguageState} which reflects the current language state,
 * - the {@link LanguageSource} which notifies about the intention to change the current {@link Language},
 * - the {@link LanguageResolver} which resolves a {@link Language} of the {@link LanguageSource} to a supported one,
 * - the {@link LanguageChangeHandler} which handles the {@link LanguageChangeRequest}s and makes the final decision about language change.
 * @since 2.0.0
 * @internal
 */
@Injectable({
  providedIn: 'root',
})
export class LanguageStore extends StoreBase<LanguageState> {
  /**
   * Gets a stream of the current {@link Language}
   * @since 2.0.0
   */
  readonly current$: Observable<Language> = this.select(state => state.current);

  constructor(
    @Inject(DEFAULT_LANGUAGE) defaultLanguage: Language,
    @Inject(SUPPORTED_LANGUAGES) supportedLanguages: Array<Language>,
    private source: LanguageSource,
    private resolver: LanguageResolver,
    private handler: LanguageChangeHandler,
  ) {
    super(
      new LanguageState(
        source.language,
        defaultLanguage,
        supportedLanguages,
      ),
    );

    this.source.language$.subscribe(language => {
      this.initLanguageChange(language);
    });
  }

  /**
   * Initiates a language change.
   * Usually the language change is being initialized by the {@link LanguageSource},
   * then the {@link LanguageResolver} resolves the new {@link Language} to the supported one,
   * then the {@link LanguageChangeHandler} decides whether to confirm or deny the {@link Language} change,
   * and finally the new {@link Language} is being applied.
   * @since 2.0.0
   */
  readonly initLanguageChange = this.effect((newLanguage$: Observable<Language>) => {
    return newLanguage$.pipe(
      map(newLanguage => this.resolver.resolve(newLanguage)),
      switchMap(newLanguage => {
        return this.state.pipe(
          take(1),
          filter(state => state.current !== newLanguage),
          switchMap(state => {
            return this.handler.handle(new LanguageChangeRequest(newLanguage, state.current)).pipe(
              tap(finalLanguage => this.completeLanguageChange(finalLanguage)),
            );
          }),
        );
      }),
    );
  });

  /**
   * Completes a language change and applies the final {@link Language} as the current one.
   * @since 2.0.0
   */
  readonly completeLanguageChange = this.updater((state, finalLanguage: Language) => {
    return state.setLanguage(finalLanguage);
  });
}
