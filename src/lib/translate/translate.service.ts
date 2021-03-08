import { Observable } from 'rxjs';
import { Locals } from '../phrase/locals';
import { PhraseKey } from '../phrase/phrase-key';

/**
 * Represents service for resolving phrases translations.
 * @since 2.0.0
 */
export abstract class TranslateService {

  /**
   * Gets instant phrase translation by its key.
   * Also, local variables may be provided to compile the template phrase.
   * @since 2.0.0
   */
  abstract instant(key: PhraseKey, locals?: Locals): string;

  /**
   * Gets stream of phrase translation by its key.
   * Also, local variables may be provided to compile the template phrase.
   * @since 2.0.0
   */
  abstract translate(key: PhraseKey, locals?: Locals): Observable<string>;
}
