import { Observable } from 'rxjs';
import { BundleData } from './bundle-data';
import { BundleRequest } from './bundle-request';

/**
 * Represents an abstract repository of {@link BundleData}.
 * @since 2.0.0
 */
export abstract class BundleRepository {

  /**
   * Handles the {@link BundleRequest} for the {@link BundleData}.
   * @since 2.0.0
   */
  abstract get(request: BundleRequest): Observable<BundleData | never>;
}
