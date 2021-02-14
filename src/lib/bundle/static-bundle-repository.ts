import { Observable, of, throwError } from 'rxjs';
import { Language } from '../language/language';
import { BundleData } from './bundle-data';
import { BundleID } from './bundle-id';
import { BundleRepository } from './bundle-repository';
import { BundleRepositoryData } from './bundle-repository-data';
import { BundleRequest } from './bundle-request';

export abstract class StaticBundleRepository extends BundleRepository {

  protected constructor(
    private readonly data: BundleRepositoryData,
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

  has(language: Language, bundleId: BundleID): boolean {
    return this.data[language]?.[bundleId] != null;
  }
}
