import { Observable, Subscription } from 'rxjs';
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

@Injectable({
  providedIn: 'root',
})
export class LanguageStore extends StoreBase<LanguageState> {
  private subscription: Subscription;

  readonly current$: Observable<Language> = this.select(state => state.current);

  constructor(
    @Inject(DEFAULT_LANGUAGE) defaultLanguage: Language,
    @Inject(SUPPORTED_LANGUAGES) supportedLanguages: Array<Language>,
    source: LanguageSource,
    resolver: LanguageResolver,
    private changeHandler: LanguageChangeHandler,
  ) {
    super(
      new LanguageState(
        source.language,
        defaultLanguage,
        supportedLanguages,
      ),
    );

    this.subscription = source.language$.pipe(
      map(language => resolver.resolve(language)),
    ).subscribe(language => {
      this.initLanguageChange(language);
    });
  }

  private readonly initLanguageChange = this.effect((newLanguage$: Observable<Language>) => {
    return newLanguage$.pipe(
      switchMap(newLanguage => {
        return this.state.pipe(
          take(1),
          filter(state => state.current !== newLanguage),
          switchMap(state => {
            return this.changeHandler.handle(new LanguageChangeRequest(newLanguage, state.current)).pipe(
              tap(finalLanguage => this.completeLanguageChange(finalLanguage)),
            );
          }),
        );
      }),
    );
  });

  private readonly completeLanguageChange = this.updater((state, language: Language) => {
    return state.setLanguage(language);
  });

  complete(): void {
    this.subscription.unsubscribe();
    super.complete();
  }
}
