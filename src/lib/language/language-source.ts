import { Observable } from 'rxjs';
import { Language } from './language';

/**
 * Represents a source of language information.
 * It supplies a system with an initial language and notifies about the _intention_ to change the current {@link Language}.
 * @since 2.0.0
 */
export abstract class LanguageSource {

  /**
   * Instantly gets a current {@link Language} of the language source.
   * @since 2.0.0
   */
  abstract readonly language: Language;

  /**
   * Gets an {@link Observable} of {@link Language} changes.
   * @since 2.0.0
   */
  abstract readonly language$: Observable<Language>;
}
