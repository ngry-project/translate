import { from, Observable } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { EntityCollectionStore } from '@ngry/store';
import { Language } from '../language/language';
import { Bundle } from './bundle';
import { BundleID } from './bundle-id';
import { BundleCollection } from './bundle-collection';
import { BundleToken } from './bundle-token';
import { BundleSource } from './bundle-source';
import { BundleRequest } from './bundle-request';

@Injectable({
  providedIn: 'root',
})
export class BundleCollectionStore extends EntityCollectionStore<BundleToken, Bundle, BundleCollection> {
  constructor(
    private source: BundleSource,
  ) {
    super(new BundleCollection());
  }

  readonly load = this.effect((request$: Observable<BundleRequest>) => {
    return request$.pipe(
      mergeMap(request => this.source.get(request)),
      map(bundle => this.snapshot.add(bundle)),
      tap(state => this.next(state)),
    );
  });

  readonly loadMany = this.effect((action$: Observable<{ language: Language, bundleIds: Iterable<BundleID> }>) => {
    return action$.pipe(
      mergeMap(({language, bundleIds}) => {
        return from(bundleIds).pipe(
          tap(bundleId => this.load({language, bundleId})),
        );
      }),
    );
  });
}
