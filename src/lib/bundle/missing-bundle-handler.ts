import { Observable } from 'rxjs';
import { BundleData } from './bundle-data';
import { BundleRequest } from './bundle-request';

export abstract class MissingBundleHandler {
  abstract handle(request: BundleRequest): Observable<BundleData>;
}
