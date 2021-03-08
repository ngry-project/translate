import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { BundleData } from '../bundle/bundle-data';
import { MissingBundleHandler } from '../bundle/missing-bundle-handler';
import { BundleRequest } from '../bundle/bundle-request';

/**
 * Represents an implementation of {@link MissingBundleHandler} for testing which tracks all {@link BundleRequest}s
 * and returns an empty {@link BundleData}.
 * @since 2.0.0
 */
@Injectable({
  providedIn: 'root',
})
export class FakeMissingBundleHandler extends MissingBundleHandler {
  /**
   * Gets a list of {@link BundleRequest}s ever passed to this handler.
   * @since 2.0.0
   */
  readonly requests: Array<BundleRequest> = [];

  handle(request: BundleRequest): Observable<BundleData> {
    this.requests.push(request);

    return of({});
  }
}
