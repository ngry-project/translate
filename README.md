[![build](https://github.com/ngry-project/translate/workflows/build/badge.svg?branch=master)](https://github.com/ngry-project/translate/actions?query=workflow%3Abuild)
[![unit-tests](https://github.com/ngry-project/translate/workflows/unit-tests/badge.svg?branch=master)](https://github.com/ngry-project/translate/actions?query=workflow%3Aunit-tests)
[![code-style](https://github.com/ngry-project/translate/workflows/code-style/badge.svg?branch=master)](https://github.com/ngry-project/translate/actions?query=workflow%3Acode-style)
[![GitHub release (latest by date)](https://img.shields.io/github/v/release/ngry-project/translate?logo=github)](https://github.com/ngry-project/translate/releases)
[![npm (scoped)](https://img.shields.io/npm/v/@ngry/translate?logo=npm)](https://www.npmjs.com/package/@ngry/translate)
[![Coveralls github](https://img.shields.io/coveralls/github/ngry-project/translate?logo=jest)](https://coveralls.io/github/ngry-project/translate)

## Description

Flexible and efficient translation module for Angular apps, an alternative to `ngx-translate`.

## Installation

Using NPM:

```bash
npm i @ngry/translate
```

Using Yarn:

```bash
yarn add @ngry/translate
```

## Key concepts

### Customizable phrases

#### Simple phrase

```json
{
  "heading": "Hello world"
}
```

#### Template phrase

```json
{
  "heading": "Hello {{ name }}"
}
```

#### Configured phrase

```json
{
  "list.header.results.count": {
    "fallback": "Invalid value",
    "options": [
      {
        "when": {
          "count": {
            "$eq": 0
          }
        },
        "then": "No items found"
      },
      {
        "when": {
          "count": {
            "$eq": 1
          }
        },
        "then": "Single item found"
      },
      {
        "when": {
          "count": {
            "$gt": 1
          }
        },
        "then": "{{ count }} items found"
      }
    ]
  }
}
```

## Root configuration

### Default language

Usually, the default language is a primary language supported by your product. It also serves as a fallback in uncertain
situations.

Declare a provider of default language in the root module:

```ts
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngry/translate';

@NgModule({
  imports: [
    TranslateModule.forRoot({
      language: {
        default: {
          useValue: 'en',
        },
      },
    }),
  ],
})
export class AppModule {
}
```

### Supported languages

If your product is multilingual, you can specify the list of supported languages.

Declare a provider of a list of supported languages in the root module:

```ts
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngry/translate';

@NgModule({
  imports: [
    TranslateModule.forRoot({
      language: {
        default: {
          useValue: 'en',
        },
        supported: {
          useValue: ['en', 'fr', 'de', 'ua'],
        },
      },
    }),
  ],
})
export class AppModule {
}
```

### Language mapping

Language mapping may be helpful in situations when you need to implement some sort of "redirect" for source language
variants to one of known ones.

Declare a provider of language mapping in the root module:

```ts
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngry/translate';

@NgModule({
  imports: [
    TranslateModule.forRoot({
      language: {
        default: {
          useValue: 'en',
        },
        supported: {
          useValue: ['en', 'fr', 'de', 'ua'],
        },
        mapping: {
          en: [/^en/i],
          fr: [/^fr/i],
          de: [/^de/i],
          ua: [/^ua/i, /^ru/i, /^be/i],
        },
      },
    }),
  ],
})
export class AppModule {
}
```

### Language source

Language source is an entity which

- encapsulates the source of the current language,
- pushes updates when the current language has been changed within the source.

There are a bunch of implementations coming out-of-the-box, such as

- `DefaultLanguageSource` which uses the default language as a source and never pushes updates (this implementation is
  being used by default unless you specify an alternative);
- `BrowserLanguageSource` which uses browser's language as a source and pushes updates when the user changes his
  preferences in a browser's settings;
- `FakeLanguageSource` which is useful when writing tests.

Declare a provider of the language source in the root module:

```ts
import { NgModule } from '@angular/core';
import { BrowserLanguageSource, TranslateModule } from '@ngry/translate';

@NgModule({
  imports: [
    TranslateModule.forRoot({
      language: {
        default: {
          useValue: 'en',
        },
        supported: {
          useValue: ['en', 'fr', 'de', 'ua'],
        },
        mapping: {
          en: [/^en/i],
          fr: [/^fr/i],
          de: [/^de/i],
          ua: [/^ua/i, /^ru/i, /^be/i],
        },
        source: {
          useExisting: BrowserLanguageSource,
        },
      },
    }),
  ],
})
export class AppModule {
}
```

To implement a custom language source, you need to extend a `LanguageSource` abstract class.

### Language change handler

Language change handler is an entity which gives you a control over decision when and how to apply the new language.

On one side, the language source only notifies about language change. On the other side, the language change handler
makes a final decision about 2 things:

- whether to apply the new language;
- what's the new language will be applied the end.

There are a bunch of implementations coming out-of-the-box, such as

- `DefaultLanguageChangeHandler` which immediately allows to use the new language (this implementation is being used by
  default unless you specify an alternative);
- `FakeLanguageChangeHandler` which is useful when writing tests.

Declare a provider of the language change handler in the root module:

```ts
import { NgModule } from '@angular/core';
import { BrowserLanguageSource, TranslateModule } from '@ngry/translate';
import { CustomLanguageChangeHandler } from './support/translate/custom-language-change-handler';

@NgModule({
  imports: [
    TranslateModule.forRoot({
      language: {
        default: {
          useValue: 'en',
        },
        supported: {
          useValue: ['en', 'fr', 'de', 'ua'],
        },
        mapping: {
          en: [/^en/i],
          fr: [/^fr/i],
          de: [/^de/i],
          ua: [/^ua/i, /^ru/i, /^be/i],
        },
        source: {
          useExisting: BrowserLanguageSource,
        },
        handler: {
          change: {
            useExisting: CustomLanguageChangeHandler,
          },
        },
      },
    }),
  ],
})
export class AppModule {
}
```

To implement a custom language change handler, you need to extend a `LanguageChangeHandler` abstract class.

### Bundle repository

Bundle repository is an entity which encapsulates a source of bundles (ex. static files, remote 3rd-party service, etc).
It's aware from where to get the bundle data to satisfy the bundle requests.

Declare a provider of the bundle repository in the root module:

```ts
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngry/translate';
import { CustomBundleRepository } from './support/translate/custom-bundle-repository';

@NgModule({
  imports: [
    TranslateModule.forRoot({
      language: {
        default: {
          useValue: 'en',
        },
      },
      bundle: {
        repository: {
          useExisting: CustomBundleRepository,
        },
      },
    }),
  ],
})
export class AppModule {
}
```

To implement a custom bundle repository, you need to extend a `BundleRepository` abstract class.

### Missing bundle handler

Missing bundle handler is an entity

```ts
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngry/translate';
import { CustomBundleRepository } from './support/translate/custom-bundle-repository';

@NgModule({
  imports: [
    TranslateModule.forRoot({
      language: {
        default: {
          useValue: 'en',
        },
      },
      bundle: {
        repository: {
          useExisting: CustomBundleRepository,
        },
      },
    }),
  ],
})
export class AppModule {
}
```

To implement a custom bundle repository, you need to extend a `MissingBundleHandler` abstract class.

## License

MIT
