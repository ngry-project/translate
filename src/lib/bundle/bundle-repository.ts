import { Observable } from 'rxjs';
import { BundleData } from './bundle-data';
import { BundleRequest } from './bundle-request';

export abstract class BundleRepository {
  abstract get(request: BundleRequest): Observable<BundleData | never>;
}
