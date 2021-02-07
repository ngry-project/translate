import { Observable, of, throwError } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';
import { BundleData } from '../bundle/bundle-data';
import { BundleRepository } from '../bundle/bundle-repository';
import { LanguageID } from '../language/language-id';
import { BundleID } from '../bundle/bundle-id';

export interface FakeBundleRepositoryData {
  [languageId: string]: FakeLanguageData;
}

export interface FakeLanguageData {
  [bundleId: string]: BundleData;
}

export abstract class FakeBundleRepository extends BundleRepository {

  protected constructor(
    readonly data: FakeBundleRepositoryData,
  ) {
    super();
  }

  get(languageId: LanguageID, bundleId: BundleID): Observable<BundleData> {
    const bundleData = this.data[languageId]?.[bundleId];

    if (bundleData) {
      return of(bundleData).pipe(
        delay(10),
      );
    }

    // todo: how to track the error in tests?

    return of(undefined).pipe(
      delay(10),
      switchMap(() => {
        return throwError(new Error(`Bundle "${bundleId}" not found for language "${languageId}"`));
      }),
    );
  }
}
