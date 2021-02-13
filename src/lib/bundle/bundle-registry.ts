import { Injectable } from '@angular/core';
import { Language } from '../language/language';
import { BundleID } from './bundle-id';

@Injectable({
  providedIn: 'root',
})
export class BundleRegistry {
  private readonly registry = new Map<Language, Set<BundleID>>();

  get knownBundleIds(): ReadonlySet<BundleID> {
    const ids = new Set<BundleID>();

    for (const bundleIds of this.registry.values()) {
      for (const bundleId of bundleIds) {
        ids.add(bundleId);
      }
    }

    return ids;
  }

  has(language: Language, bundleId: BundleID): boolean {
    return this.registry.get(language)?.has(bundleId) ?? false;
  }

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
