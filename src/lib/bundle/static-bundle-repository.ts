import { Observable, of, throwError } from 'rxjs';
import { Language } from '../language/language';
import { BundleData } from './bundle-data';
import { BundleID } from './bundle-id';
import { BundleRepository } from './bundle-repository';
import { BundleRequest } from './bundle-request';
import { StaticBundleRepositoryData } from './static-bundle-repository-data';

/**
 * Represents an implementation of {@link BundleRepository} which provides a {@link BundleData} from the static source.
 * @since 2.0.0
 */
export class StaticBundleRepository extends BundleRepository {

  constructor(
    private readonly data: StaticBundleRepositoryData = {},
  ) {
    super();
  }

  get(request: BundleRequest): Observable<BundleData | never> {
    const bundleData = this.data[request.language]?.[request.bundleId];

    if (bundleData) {
      return of(bundleData);
    }

    return throwError(new Error(`Bundle "${request.bundleId}" not found for language "${request.language}"`));
  }

  /**
   * Determines whether this repository has a {@link BundleData} of {@link Bundle} with given {@link BundleID} and {@link Language}.
   * @since 2.0.0
   */
  has(language: Language, bundleId: BundleID): boolean {
    return this.data[language]?.[bundleId] != null;
  }
}
