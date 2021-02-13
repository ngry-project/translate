import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { BundleData } from './bundle-data';
import { BundleRequest } from './bundle-request';
import { MissingBundleHandler } from './missing-bundle-handler';

@Injectable({
  providedIn: 'root',
})
export class NoopMissingBundleHandler extends MissingBundleHandler {
  handle(request: BundleRequest): Observable<BundleData> {
    return of({});
  }
}
