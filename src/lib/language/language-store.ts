import { Observable, Subscription } from 'rxjs';
import { filter, switchMap, take, tap } from 'rxjs/operators';
import { Inject, Injectable } from '@angular/core';
import { StoreBase } from '@ngry/store';
import { DEFAULT_LANGUAGE, LANGUAGE_MAPPING, SUPPORTED_LANGUAGES } from '../configuration/root-configuration';
import { LanguageChangeHandler } from './language-change-handler';
import { LanguageID } from './language-id';
import { LanguageSource } from './language-source';
import { LanguageState } from './language-state';
import { LanguageMapping } from './language-mapping';

@Injectable({
  providedIn: 'root',
})
export class LanguageStore extends StoreBase<LanguageState> {
  private subscription: Subscription;

  readonly currentLanguage$: Observable<LanguageID> = this.select(state => state.currentLanguage);

  constructor(
    @Inject(DEFAULT_LANGUAGE) defaultLanguage: LanguageID,
    @Inject(SUPPORTED_LANGUAGES) supportedLanguages: Array<LanguageID>,
    @Inject(LANGUAGE_MAPPING) languageMapping: LanguageMapping,
    source: LanguageSource,
    private changeHandler: LanguageChangeHandler,
  ) {
    super(
      new LanguageState(
        source.language,
        defaultLanguage,
        supportedLanguages,
      ),
    );

    this.subscription = source.language$.subscribe(language => {
      this.initLanguageChange(language);
    });
  }

  readonly initLanguageChange = this.effect((newLanguage$: Observable<LanguageID>) => {
    return newLanguage$.pipe(
      switchMap(newLanguage => {
        return this.state.pipe(
          take(1),
          filter(state => state.currentLanguage !== newLanguage),
          filter(state => state.supports(newLanguage)),
          switchMap(state => {
            return this.changeHandler.handle(newLanguage, state.currentLanguage).pipe(
              tap(finalLanguage => this.completeLanguageChange(finalLanguage)),
            );
          }),
        );
      }),
    );
  });

  readonly completeLanguageChange = this.updater((state, languageId: LanguageID) => {
    return state.setLanguage(languageId);
  });

  complete(): void {
    this.subscription.unsubscribe();
    super.complete();
  }
}
