import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Bundle } from './bundle';
import { BundleRegistry } from './bundle-registry';
import { BundleRepository } from './bundle-repository';
import { BundleCompiler } from './bundle-compiler';
import { BundleRequest } from './bundle-request';
import { MissingBundleHandler } from './missing-bundle-handler';

@Injectable({
  providedIn: 'root',
})
export class BundleSource {
  constructor(
    private repository: BundleRepository,
    private registry: BundleRegistry,
    private compiler: BundleCompiler,
    private handler: MissingBundleHandler,
  ) {
  }

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
