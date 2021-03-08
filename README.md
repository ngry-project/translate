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

### Bundle

✅ A better way to organize phrases by slicing them per feature modules\
✅ Have a flat key/value structure\
✅ Loaded on-demand alongside with lazy modules\
✅ Phrases of 3 types: plain text, template and configurable\
✅ Type-safe with TypeScript typings and JSON schema\
✅ Bundle repository encapsulates the bundle source\
✅ Missing bundle handler handles failed bundle requests

### Language

✅ Default language\
✅ List of supported languages\
✅ Language mapping maps language variants to one of the supported list\
✅ Language source encapsulates the source of app's language\
✅ Language change handler manages language transitions

## Root configuration

You can configure the translation module in the app root by using `TranslateModule.forRoot` method.

In the simplest case you need to provide a default language, and an implementation of bundles repository:

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

Missing bundle handler is an entity which handles failed bundle requests.

When a bundle repository fails to handle a bundle request (for example, the bundle does not exist), then missing bundle
handler tries to find a workaround.

Declare a provider of the missing bundle handler in the root module:

```ts
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngry/translate';
import { CustomBundleRepository } from './support/translate/custom-bundle-repository';
import { CustomMissingBundleHandler } from './support/translate/custom-missing-bundle-handler';

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
        handler: {
          missing: {
            useExisting: CustomMissingBundleHandler,
          },
        },
      },
    }),
  ],
})
export class AppModule {
}
```

To implement a custom bundle repository, you need to extend a `MissingBundleHandler` abstract class.

## Feature configuration

You can configure every lazy-loaded module separately by importing the translation module this way:

```ts
import { NgModule } from '@angular/core';
import { TranslateModule } from './translate.module';

@NgModule({
  imports: [
    TranslateModule.forFeature({
      bundles: ['user'],
    }),
  ],
})
export class UserModule {
}
```

### Bundles list

As lazy modules are being loaded on demand when you visit specific route, then why not to load a bundle of translations
for it in a lazy manner as way?

You achieve that by creating feature module where you can specify which bundle(s) to load once it's being initialized.

```ts
import { NgModule } from '@angular/core';
import { TranslateModule } from './translate.module';

@NgModule({
  imports: [
    TranslateModule.forFeature({
      bundles: ['user'],
    }),
  ],
})
export class UserModule {
}
```

## License

MIT
