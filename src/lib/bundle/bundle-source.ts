import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Bundle } from './bundle';
import { BundleCompiler } from './bundle-compiler';
import { BundleRegistry } from './bundle-registry';
import { BundleRepository } from './bundle-repository';
import { BundleRequest } from './bundle-request';
import { MissingBundleHandler } from './missing-bundle-handler';

/**
 * Represents a source of bundles.
 * @since 2.0.0
 * @internal
 */
@Injectable({
  providedIn: 'root',
})
export class BundleSource {

  constructor(
    private readonly registry: BundleRegistry,
    private readonly repository: BundleRepository,
    private readonly handler: MissingBundleHandler,
    private readonly compiler: BundleCompiler,
  ) {
  }

  /**
   * Gets the {@link Bundle} by executing the {@link BundleRequest}.
   * @since 2.0.0
   */
  get(request: BundleRequest): Observable<Bundle | never> {
    if (this.registry.register(request.language, request.bundleId)) {
      return this.repository.get(request).pipe(
        catchError(() => this.handler.handle(request)),
        map(bundleData => this.compiler.compile(request.language, request.bundleId, bundleData)),
      );
    } else {
      return EMPTY;
    }
  }
}
