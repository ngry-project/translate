import { Observable, ReplaySubject, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { LanguageChangeHandler } from '../language/language-change-handler';
import { Language } from '../language/language';
import { LanguageChangeRequest } from '../language/language-change-request';

@Injectable({
  providedIn: 'root',
})
export class FakeLanguageChangeHandler extends LanguageChangeHandler {
  readonly requests = {
    all: [] as Array<LanguageChangeRequest>,
    pending: [] as Array<LanguageChangeRequest>,
  };
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

  approve(): void {
    const request = this.requests.pending.pop();
    const response = this.responses.pending.pop();

    if (request && response) {
      response.next(request.next);
      response.complete();
    }
  }

  decline(): void {
    const request = this.requests.pending.pop();
    const response = this.responses.pending.pop();

    if (request && response) {
      response.complete();
    }
  }
}
