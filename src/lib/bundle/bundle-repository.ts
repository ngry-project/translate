import { Observable } from 'rxjs';
import { LanguageID } from '../language/language-id';
import { BundleData } from './bundle-data';
import { BundleID } from './bundle-id';

export abstract class BundleRepository {
  abstract get(languageId: LanguageID, bundleId: BundleID): Observable<BundleData>;
}
