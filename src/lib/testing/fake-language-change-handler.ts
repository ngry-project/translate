import { Observable, ReplaySubject, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { LanguageChangeHandler } from '../language/language-change-handler';
import { Language } from '../language/language';
import { LanguageChangeRequest } from '../language/language-change-request';

/**
 * Represents an implementation of {@link LanguageChangeHandler} for testing which tracks requests and responses
 * and allows for approving and declining pending requests.
 * @since 2.0.0
 */
@Injectable({
  providedIn: 'root',
})
export class FakeLanguageChangeHandler extends LanguageChangeHandler {
  /**
   * Gets all and pending requests.
   * @since 2.0.0
   */
  readonly requests = {
    all: [] as Array<LanguageChangeRequest>,
    pending: [] as Array<LanguageChangeRequest>,
  };

  /**
   * Gets all and pending responses.
   * @since 2.0.0
   */
  readonly responses = {
    all: [] as Array<Subject<Language>>,
    pending: [] as Array<Subject<Language>>,
  };

  handle(request: LanguageChangeRequest): Observable<Language> {
    this.requests.all.push(request);
    this.requests.pending.push(request);

    const response = new ReplaySubject<Language>(1);

    this.responses.all.push(response);
    this.responses.pending.push(response);

    return response;
  }

  /**
   * Approves the latest pending request.
   * @since 2.0.0
   */
  approve(): void {
    const request = this.requests.pending.pop();
    const response = this.responses.pending.pop();

    if (request && response) {
      response.next(request.next);
      response.complete();
    }
  }

  /**
   * Declines the latest pending request.
   * @since 2.0.0
   */
  decline(): void {
    const request = this.requests.pending.pop();
    const response = this.responses.pending.pop();

    if (request && response) {
      response.complete();
    }
  }
}
