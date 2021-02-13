import { Language } from '../language/language';
import { BundleID } from './bundle-id';

export class BundleRequest {
  constructor(
    readonly language: Language,
    readonly bundleId: BundleID
  ) {
  }
}
