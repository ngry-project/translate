import { combineLatest, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { EntityCollectionStore } from '@ngry/store';
import { BundleCollectionStore } from '../bundle/bundle-collection-store';
import { BundleRegistry } from '../bundle/bundle-registry';
import { LanguageStore } from '../language/language-store';
import { Phrase } from '../phrase/phrase';
import { PhraseCollection } from '../phrase/phrase-collection';
import { PhraseKey } from '../phrase/phrase-key';

@Injectable({
  providedIn: 'root',
})
export class RootTranslateStore extends EntityCollectionStore<PhraseKey, Phrase, PhraseCollection> {
  private subscription: Subscription = new Subscription();

  constructor(
    bundleCollectionStore: BundleCollectionStore,
    bundleRegistry: BundleRegistry,
    languageStore: LanguageStore,
  ) {
    super(
      new PhraseCollection(),
    );

    this.subscription.add(
      combineLatest([
        languageStore.current$,
        bundleCollectionStore.state,
      ]).pipe(
        map(([language, bundles]) => bundles.collectPhrasesOf(language)),
      ).subscribe(state => this.next(state)),
    );

    this.subscription.add(
      languageStore.current$.subscribe(language => {
        const bundleIds = bundleRegistry.knownBundleIds;

        bundleCollectionStore.loadMany({
          language,
          bundleIds,
        });
      }),
    );
  }

  complete(): void {
    this.subscription.unsubscribe();
    super.complete();
  }
}
