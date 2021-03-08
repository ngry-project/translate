import { Injectable } from '@angular/core';
import { PhraseKey } from '../phrase/phrase-key';
import { BundleData } from './bundle-data';

@Injectable({
  providedIn: 'root',
})
export class BundleDataFilter {
  private excludePhraseKeys: Array<PhraseKey> = [
    '$schema',
  ];

  filter(bundleData: BundleData): void {
    for (const key of this.excludePhraseKeys) {
      delete bundleData[key];
    }
  }
}
