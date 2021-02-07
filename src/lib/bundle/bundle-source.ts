import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Bundle } from './bundle';
import { BundleID } from './bundle-id';
import { BundleRegistry } from './bundle-registry';
import { BundleRepository } from './bundle-repository';
import { LanguageID } from '../language/language-id';
import { BundleCompiler } from './bundle-compiler';

@Injectable({
  providedIn: 'root',
})
export class BundleSource {
  constructor(
    private repository: BundleRepository,
    private registry: BundleRegistry,
    private compiler: BundleCompiler,
  ) {
  }

  get(languageId: LanguageID, bundleId: BundleID): Observable<Bundle> {
    const registered = this.registry.has(languageId, bundleId);

    if (registered) {
      return EMPTY;
    }

    this.registry.register(languageId, bundleId);

    return this.repository.get(languageId, bundleId).pipe(
      map(bundleData => this.compiler.compile(languageId, bundleId, bundleData)),
      // todo: delegate error handling to BundleErrorHandler
      catchError(() => EMPTY),
    );
  }
}
