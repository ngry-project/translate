import { Observable, ReplaySubject, throwError, timer } from 'rxjs';
import { catchError, delay, switchMap, tap } from 'rxjs/operators';
import { BundleData } from '../bundle/bundle-data';
import { BundleRepositoryData } from '../bundle/bundle-repository-data';
import { StaticBundleRepository } from '../bundle/static-bundle-repository';
import { BundleRequest } from '../bundle/bundle-request';

export abstract class FakeBundleRepository extends StaticBundleRepository {
  readonly requests: Array<BundleRequest> = [];
  readonly requests$: ReplaySubject<BundleRequest> = new ReplaySubject();

  readonly responses: Array<BundleData> = [];
  readonly responses$: ReplaySubject<BundleData> = new ReplaySubject();

  readonly errors: Array<Error> = [];
  readonly errors$: ReplaySubject<Error> = new ReplaySubject();

  protected constructor(
    data: BundleRepositoryData,
  ) {
    super(data);
  }

  get(request: BundleRequest): Observable<BundleData> {
    this.requests.push(request);
    this.requests$.next(request);

    return super.get(request).pipe(
      delay(10),
      tap(data => this.responses.push(data)),
      tap(data => this.responses$.next(data)),
      catchError(err => {
        return timer(10).pipe(
          tap(() => this.errors.push(err)),
          tap(() => this.errors$.next(err)),
          switchMap(() => throwError(err)),
        );
      }),
    );
  }
}
