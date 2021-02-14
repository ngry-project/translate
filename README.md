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

- **Bundle** is a pack of phrases for concrete feature
- **Bundles** is a solution for slicing large translation file into multiple chunks per feature
- Improves separation of concerns
- Bundles play nice with lazy modules and allow loading of fewer bytes

### Multiple languages support

- **Supported language**: guarantees usage of only supported language(s)
- **Language source**: an abstraction over source of language, for example browser settings, route param or env
  variables
- **Language change handler**: approve or decline the language change request
- **Languages mapping**: makes it simpler to work with language families

## License

MIT
