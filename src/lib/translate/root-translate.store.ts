import { combineLatest, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { EntityCollectionStore } from '@ngry/store';
import { BundleCollectionStore } from '../bundle/bundle-collection-store';
import { BundleRegistry } from '../bundle/bundle-registry';
import { BundlesRequest } from '../bundle/bundles-request';
import { LanguageStore } from '../language/language-store';
import { Phrase } from '../phrase/phrase';
import { PhraseCollection } from '../phrase/phrase-collection';
import { PhraseKey } from '../phrase/phrase-key';

/**
 * Represents a root translations store which stores a collection of phrases for current {@link Language}.
 * @since 2.0.0
 * @internal
 */
@Injectable({
  providedIn: 'root',
})
export class RootTranslateStore extends EntityCollectionStore<PhraseKey, Phrase, PhraseCollection> {
  private subscription: Subscription = new Subscription();

  constructor(
    private bundleCollectionStore: BundleCollectionStore,
    private bundleRegistry: BundleRegistry,
    private languageStore: LanguageStore,
  ) {
    super(
      new PhraseCollection(),
    );

    this.initLanguageChange();
    this.initMissingBundlesLoading();
  }

  private initLanguageChange(): void {
    this.subscription.add(
      combineLatest([
        this.languageStore.current$,
        this.bundleCollectionStore.state,
      ]).pipe(
        map(([language, bundles]) => bundles.collectPhrasesOf(language)),
      ).subscribe(state => this.next(state)),
    );
  }

  private initMissingBundlesLoading(): void {
    this.subscription.add(
      this.languageStore.current$.subscribe(language => {
        const bundleIds = this.bundleRegistry.ids;

        this.bundleCollectionStore.loadMany(new BundlesRequest(language, bundleIds));
      }),
    );
  }

  complete(): void {
    this.subscription.unsubscribe();
    super.complete();
  }
}
