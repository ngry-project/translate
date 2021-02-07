import { from, Observable } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { EntityCollectionStore } from '@ngry/store';
import { Bundle } from './bundle';
import { BundleID } from './bundle-id';
import { BundleCollection } from './bundle-collection';
import { BundleToken} from './bundle-token';
import { BundleSource } from './bundle-source';
import { LanguageID } from '../language/language-id';

@Injectable({
  providedIn: 'root',
})
export class BundleCollectionStore extends EntityCollectionStore<BundleToken, Bundle, BundleCollection> {
  constructor(
    private source: BundleSource,
  ) {
    super(new BundleCollection());
  }

  readonly load = this.effect((action$: Observable<{ languageId: LanguageID, bundleId: BundleID }>) => {
    return action$.pipe(
      mergeMap(action => this.source.get(action.languageId, action.bundleId)),
      map(bundle => this.snapshot.add(bundle)),
      tap(collection => this.next(collection)),
    );
  });

  readonly loadMany = this.effect((action$: Observable<{ languageId: LanguageID, bundleIds: Iterable<BundleID> }>) => {
    return action$.pipe(
      mergeMap(({languageId, bundleIds}) => {
        return from(bundleIds).pipe(
          tap(bundleId => this.load({languageId, bundleId})),
        );
      }),
    );
  });
}
