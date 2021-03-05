import { Observable, ReplaySubject, throwError, timer } from 'rxjs';
import { catchError, delay, switchMap, tap } from 'rxjs/operators';
import { BundleData } from '../bundle/bundle-data';
import { StaticBundleRepositoryData } from '../bundle/static-bundle-repository-data';
import { StaticBundleRepository } from '../bundle/static-bundle-repository';
import { BundleRequest } from '../bundle/bundle-request';

/**
 * Represents an abstract fake {@link BundleRepository} used for testing.
 * @since 2.0.0
 */
export abstract class FakeBundleRepository extends StaticBundleRepository {
  /**
   * Gets a list of {@link BundleRequest}s.
   * @since 2.0.0
   */
  readonly requests: Array<BundleRequest> = [];

  /**
   * Gets a stream of {@link BundleRequest}s.
   * @since 2.0.0
   */
  readonly requests$: ReplaySubject<BundleRequest> = new ReplaySubject();

  /**
   * Gets a list of responses with {@link BundleData}.
   * @since 2.0.0
   */
  readonly responses: Array<BundleData> = [];

  /**
   * Gets a stream of responses with {@link BundleData}.
   * @since 2.0.0
   */
  readonly responses$: ReplaySubject<BundleData> = new ReplaySubject();

  /**
   * Gets a list of errors.
   * @since 2.0.0
   */
  readonly errors: Array<Error> = [];

  /**
   * Gets a stream of errors.
   * @since 2.0.0
   */
  readonly errors$: ReplaySubject<Error> = new ReplaySubject();

  protected constructor(
    data: StaticBundleRepositoryData,
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
