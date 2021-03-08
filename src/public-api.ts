/*
 * Public API Surface
 */

export * from './lib/bundle/bundle-data';
export * from './lib/bundle/bundle-id';
export * from './lib/bundle/bundle-repository';
export * from './lib/bundle/bundle-request';
export * from './lib/bundle/missing-bundle-handler';
export * from './lib/bundle/static-bundle-repository';
export * from './lib/bundle/static-bundle-repository-data';

export * from './lib/configuration/feature-configuration';
export * from './lib/configuration/root-configuration';

export * from './lib/language/active-language';
export * from './lib/language/browser-language-source';
export * from './lib/language/language';
export * from './lib/language/language-change-handler';
export * from './lib/language/language-change-request';
export * from './lib/language/language-data';
export * from './lib/language/language-mapping';
export * from './lib/language/language-source';

export * from './lib/phrase/locals';
export * from './lib/phrase/parameter';
export * from './lib/phrase/phrase-data';
export * from './lib/phrase/phrase-key';
export * from './lib/phrase/configuration/configured-phrase-data';
export * from './lib/phrase/configuration/phrase-option-data';
export * from './lib/phrase/configuration/predicate/predicate-data';
export * from './lib/phrase/configuration/predicate/operator/equal-operator-data';
export * from './lib/phrase/configuration/predicate/operator/greater-than-operator-data';
export * from './lib/phrase/configuration/predicate/operator/greater-than-or-equal-operator-data';
export * from './lib/phrase/configuration/predicate/operator/in-operator-data';
export * from './lib/phrase/configuration/predicate/operator/lower-than-operator-data';
export * from './lib/phrase/configuration/predicate/operator/lower-than-or-equal-operator-data';
export * from './lib/phrase/configuration/predicate/operator/operator-data';
export * from './lib/phrase/configuration/predicate/operator/reg-exp-operator-data';

export * from './lib/testing/fake-bundle-repository';
export * from './lib/testing/fake-language-change-handler';
export * from './lib/testing/fake-language-source';
export * from './lib/testing/fake-missing-bundle-handler';
export * from './lib/testing/fake-translate.service';

export * from './lib/translate/translate.module';
export * from './lib/translate/translate.pipe';
export * from './lib/translate/translate.service';

export * from './lib/types';
