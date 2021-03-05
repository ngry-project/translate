import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { BundleData } from './bundle-data';
import { BundleRequest } from './bundle-request';
import { MissingBundleHandler } from './missing-bundle-handler';

/**
 * Represents a default implementation of {@link MissingBundleHandler}.
 * This implementation is simply reply with an empty {@link BundleData}.
 * @since 2.0.0
 * @internal
 */
@Injectable({
  providedIn: 'root',
})
export class DefaultMissingBundleHandler extends MissingBundleHandler {
  handle(request: BundleRequest): Observable<BundleData> {
    return of({});
  }
}
