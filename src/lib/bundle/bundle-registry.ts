import { Injectable } from '@angular/core';
import { Language } from '../language/language';
import { BundleID } from './bundle-id';

/**
 * Represents registry of {@link Bundle}s.
 * The registry is needed to register bundle requests to guarantee that each bundle will be requested only once.
 * @since 2.0.0
 * @internal
 */
@Injectable({
  providedIn: 'root',
})
export class BundleRegistry {
  private readonly registry = new Map<Language, Set<BundleID>>();

  /**
   * Get a set of registered {@link BundleID}s.
   * @since 2.0.0
   */
  get ids(): ReadonlySet<BundleID> {
    const ids = new Set<BundleID>();

    for (const bundleIds of this.registry.values()) {
      for (const bundleId of bundleIds) {
        ids.add(bundleId);
      }
    }

    return ids;
  }

  /**
   * Determines whether {@link Bundle} with such {@link Language} and {@link BundleID} has been already registered.
   * @since 2.0.0
   */
  has(language: Language, bundleId: BundleID): boolean {
    return this.registry.get(language)?.has(bundleId) ?? false;
  }

  /**
   * Registers a {@link Bundle} with such {@link Language} and {@link BundleID}.
   * @since 2.0.0
   */
  register(language: Language, bundleId: BundleID): boolean {
    if (this.has(language, bundleId)) {
      return false;
    }

    const bundleIds: Set<BundleID> = this.registry.get(language) ?? new Set<BundleID>();

    bundleIds.add(bundleId);

    this.registry.set(language, bundleIds);

    return true;
  }
}
