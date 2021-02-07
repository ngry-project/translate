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
npm i @ngry/translate @ngry/store
```

Using Yarn:

```bash
yarn add @ngry/translate @ngry/store
```

## Features

### Compatibility with `ngx-translate`

This library ships `TranslatePipe` for declarative translation and `TranslateService` for imperative translation just
like `ngx-translate` do.

### Customizable phrases

- Plain-text phrase
- Template phrase
- Configured phrase

### Bundles of phrases

- Solves "big ball of mud" problem
- One bundle provides a pack of phrases for one feature
- Improves separation of concerns
- Lazy loaded

### Multiple languages support

- Switch languages at runtime
- Align with external language sources, for example browser settings or env variables
- Makes it possible to request a confirmation for language change from user
- Languages mapping to cover more language families with fewer efforts

## License

MIT
