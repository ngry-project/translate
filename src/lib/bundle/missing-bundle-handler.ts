import { Observable } from 'rxjs';
import { BundleData } from './bundle-data';
import { BundleRequest } from './bundle-request';

/**
 * Represents a missing bundle handler which is being used to handle errors of bundle requests.
 * @since 2.0.0
 */
export abstract class MissingBundleHandler {

  /**
   * Handles a {@link BundleRequest} failure.
   * @since 2.0.0
   */
  abstract handle(request: BundleRequest): Observable<BundleData>;
}
