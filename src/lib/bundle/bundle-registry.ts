import { Injectable } from '@angular/core';
import { LanguageID } from '../language/language-id';
import { BundleID } from './bundle-id';

@Injectable({
  providedIn: 'root',
})
export class BundleRegistry {
  private readonly registry = new Map<LanguageID, Set<BundleID>>();

  get knownBundleIds(): Iterable<BundleID> {
    const ids = new Set<BundleID>();

    for (const bundleIds of this.registry.values()) {
      for (const bundleId of bundleIds) {
        ids.add(bundleId);
      }
    }

    return ids;
  }

  has(languageId: LanguageID, bundleId: BundleID): boolean {
    return this.registry.get(languageId)?.has(bundleId) ?? false;
  }

  register(languageId: LanguageID, bundleId: BundleID): boolean {
    if (this.has(languageId, bundleId)) {
      return false;
    }

    const bundleIds: Set<BundleID> = this.registry.get(languageId) ?? new Set<BundleID>();

    bundleIds.add(bundleId);

    this.registry.set(languageId, bundleIds);

    return true;
  }
}
