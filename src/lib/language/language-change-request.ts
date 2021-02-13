import { Language } from './language';

export class LanguageChangeRequest {
  constructor(
    readonly next: Language,
    readonly previous: Language
  ) {
  }
}
