import { from, Observable } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { EntityCollectionStore } from '@ngry/store';
import { Bundle } from './bundle';
import { BundleCollection } from './bundle-collection';
import { BundleToken } from './bundle-token';
import { BundleSource } from './bundle-source';
import { BundleRequest } from './bundle-request';
import { BundlesRequest } from './bundles-request';

/**
 * Represents store of all loaded {@link Bundle}s.
 * @since 2.0.0
 * @internal
 */
@Injectable({
  providedIn: 'root',
})
export class BundleCollectionStore extends EntityCollectionStore<BundleToken, Bundle, BundleCollection> {

  constructor(
    private readonly source: BundleSource,
  ) {
    super(new BundleCollection());
  }

  /**
   * Loads single {@link Bundle} as adds it to collection.
   * @since 2.0.0
   */
  readonly load = this.effect((request$: Observable<BundleRequest>) => {
    return request$.pipe(
      mergeMap(request => this.source.get(request)),
      tap(bundle => this.add(bundle)),
    );
  });

  /**
   * Loads multiple {@link Bundle}s add adds them to collection.
   * @since 2.0.0
   */
  readonly loadMany = this.effect((request$: Observable<BundlesRequest>) => {
    return request$.pipe(
      mergeMap(request => {
        return from(request.bundleIds).pipe(
          tap(bundleId => this.load(new BundleRequest(request.language, bundleId))),
        );
      }),
    );
  });
}
