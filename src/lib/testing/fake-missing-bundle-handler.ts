import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { BundleData } from '../bundle/bundle-data';
import { MissingBundleHandler } from '../bundle/missing-bundle-handler';
import { BundleRequest } from '../bundle/bundle-request';

@Injectable({
  providedIn: 'root',
})
export class FakeMissingBundleHandler extends MissingBundleHandler {
  readonly requests: Array<BundleRequest> = [];

  handle(request: BundleRequest): Observable<BundleData> {
    this.requests.push(request);

    return of({});
  }
}
