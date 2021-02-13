import { Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';
import { ChangeDetectorRef, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { Locals } from '../phrase/locals';
import { PhraseKey } from '../phrase/phrase-key';
import { TranslateService } from './translate.service';

@Pipe({
  name: 'translate',
  pure: false,
})
export class TranslatePipe implements PipeTransform, OnDestroy {
  private _subscription?: Subscription;
  private _lastKey?: string;

  constructor(
    private service: TranslateService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  transform(phraseKey: PhraseKey, locals?: Locals): string {
    const text: string = this.service.instant(phraseKey, locals);

    if (phraseKey !== this._lastKey) {
      if (this._subscription) {
        this._subscription.unsubscribe();
        delete this._subscription;
      }
    }

    if (!this._subscription) {
      this._subscription = this.service.translate(phraseKey, locals).pipe(
        skip(1),
      ).subscribe(() => {
        this.changeDetectorRef.markForCheck();
      });
    }

    this._lastKey = phraseKey;

    return text;
  }

  ngOnDestroy(): void {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }
}
