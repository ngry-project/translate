import { Injectable } from '@angular/core';
import { FakeBundleRepository } from '../../lib/testing/fake-bundle-repository';

@Injectable({
  providedIn: 'root',
})
export class BundleRepositoryFixture extends FakeBundleRepository {
  constructor() {
    super({
      en: {
        form: {
          'form.field.required': 'This field is required',
        },
        errors: {
          'error.not-found': 'Not found',
        },
        phrase: {
          'phrase.simple': 'Simple phrase',
          'phrase.template': 'Dynamic value: {{ value }}',
          'phrase.configurable': {
            fallback: 'fallback',
            options: [
              {
                when: {value: {$eq: 0}},
                then: 'none',
              },
              {
                when: {value: {$eq: 1}},
                then: 'single',
              },
              {
                when: {value: {$gt: 1}},
                then: 'many',
              },
            ],
          },
          'phrase.checked': 'Checked',
          'phrase.unchecked': 'Unchecked',
        },
      },
      ua: {
        form: {
          'form.field.required': `Обов'язкове поле`,
        },
        errors: {
          'error.not-found': 'Не знайдено',
        },
        phrase: {
          'phrase.simple': 'Проста фраза',
          'phrase.template': 'Динамічне значення: {{ value }}',
          'phrase.configurable': {
            fallback: 'Запаска',
            options: [
              {
                when: {value: {$eq: 0}},
                then: 'пусто',
              },
              {
                when: {value: {$eq: 1}},
                then: 'один',
              },
              {
                when: {value: {$gt: 1}},
                then: 'багато',
              },
            ],
          },
          'phrase.checked': 'Відмічено',
          'phrase.unchecked': 'Не відмічено',
        },
      },
    });
  }
}
