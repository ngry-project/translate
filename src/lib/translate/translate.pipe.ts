import { Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';
import { ChangeDetectorRef, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { Locals } from '../phrase/locals';
import { PhraseKey } from '../phrase/phrase-key';
import { TranslateService } from './translate.service';

/**
 * Represents a translation pipe.
 * It is being used in templates to convert the phrase key (with optional context) into human-readable localized text.
 * @since 2.0.0
 */
@Pipe({
  name: 'translate',
  pure: false,
})
export class TranslatePipe implements PipeTransform, OnDestroy {
  private subscription?: Subscription;
  private lastKey?: string;

  constructor(
    private service: TranslateService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  transform(phraseKey: PhraseKey, locals?: Locals): string {
    const text: string = this.service.instant(phraseKey, locals);

    if (phraseKey !== this.lastKey) {
      if (this.subscription) {
        this.subscription.unsubscribe();
        delete this.subscription;
      }
    }

    if (!this.subscription) {
      this.subscription = this.service.translate(phraseKey, locals).pipe(
        skip(1),
      ).subscribe(() => {
        this.changeDetectorRef.markForCheck();
      });
    }

    this.lastKey = phraseKey;

    return text;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
