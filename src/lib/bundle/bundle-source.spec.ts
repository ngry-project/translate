import { BundleSource } from './bundle-source';
import { TestBed } from '@angular/core/testing';
import { TranslateModule } from '../translate/translate.module';
import { BundleRepository } from './bundle-repository';
import { StaticBundleRepository } from './static-bundle-repository';
import { BundleRequest } from './bundle-request';
import { take } from 'rxjs/operators';

describe('BundleSource', () => {
  let source: BundleSource;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot({
          language: {
            default: {
              useValue: 'en',
            },
          },
          bundle: {
            repository: {
              useFactory(): BundleRepository {
                return new StaticBundleRepository({
                  en: {
                    demo: {
                      $schema: './bundle.json',
                      phrase: 'Hello world',
                    },
                  },
                });
              },
            },
          },
        }),
      ],
    });

    source = TestBed.inject(BundleSource);
  });

  describe('get', () => {
    it('should return a bundle without a phrase with "$schema" key', done => {
      source.get(new BundleRequest('en', 'demo')).pipe(
        take(1),
      ).subscribe(bundle => {
        expect(bundle.phrases.has('$schema')).toBe(false);
        expect(bundle.phrases.has('phrase')).toBe(true);

        done();
      });
    });
  });
});
