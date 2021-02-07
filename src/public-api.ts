/*
 * Public API Surface
 */

export * from './lib/bundle/bundle';
export * from './lib/bundle/bundle-collection';
export * from './lib/bundle/bundle-collection-store';
export * from './lib/bundle/bundle-compiler';
export * from './lib/bundle/bundle-data';
export * from './lib/bundle/bundle-id';
export * from './lib/bundle/bundle-registry';
export * from './lib/bundle/bundle-repository';
export * from './lib/bundle/bundle-source';
export * from './lib/bundle/bundle-token';

export * from './lib/configuration/feature-configuration';
export * from './lib/configuration/root-configuration';

export * from './lib/language/browser-language-source';
export * from './lib/language/language-change-handler';
export * from './lib/language/language-id';
export * from './lib/language/language-mapping';
export * from './lib/language/language-source';
export * from './lib/language/language-state';
export * from './lib/language/language-store';

export * from './lib/phrase/locals';
export * from './lib/phrase/phrase';
export * from './lib/phrase/phrase-collection';
export * from './lib/phrase/phrase-compiler';
export * from './lib/phrase/phrase-data';
export * from './lib/phrase/phrase-key';
export * from './lib/phrase/plain-text-phrase';
export * from './lib/phrase/template-phrase';
export * from './lib/phrase/configuration/configured-phrase';
export * from './lib/phrase/configuration/configured-phrase-data';
export * from './lib/phrase/configuration/phrase-option';
export * from './lib/phrase/configuration/phrase-option-data';
export * from './lib/phrase/configuration/predicate/predicate';
export * from './lib/phrase/configuration/predicate/predicate-compiler';
export * from './lib/phrase/configuration/predicate/predicate-data';
export * from './lib/phrase/configuration/predicate/operator/equal-operator';
export * from './lib/phrase/configuration/predicate/operator/equal-operator-data';
export * from './lib/phrase/configuration/predicate/operator/greater-than-operator';
export * from './lib/phrase/configuration/predicate/operator/greater-than-operator-data';
export * from './lib/phrase/configuration/predicate/operator/greater-than-or-equal-operator';
export * from './lib/phrase/configuration/predicate/operator/greater-than-or-equal-operator-data';
export * from './lib/phrase/configuration/predicate/operator/in-operator';
export * from './lib/phrase/configuration/predicate/operator/in-operator-data';
export * from './lib/phrase/configuration/predicate/operator/lower-than-operator';
export * from './lib/phrase/configuration/predicate/operator/lower-than-operator-data';
export * from './lib/phrase/configuration/predicate/operator/lower-than-or-equal-operator';
export * from './lib/phrase/configuration/predicate/operator/lower-than-or-equal-operator-data';
export * from './lib/phrase/configuration/predicate/operator/number-comparison-operator';
export * from './lib/phrase/configuration/predicate/operator/operator';
export * from './lib/phrase/configuration/predicate/operator/operator-compiler';
export * from './lib/phrase/configuration/predicate/operator/operator-data';
export * from './lib/phrase/configuration/predicate/operator/reg-exp-operator';
export * from './lib/phrase/configuration/predicate/operator/reg-exp-operator-data';

export * from './lib/support/debug-context';

export * from './lib/testing/fake-bundle-repository';
export * from './lib/testing/fake-language-change-handler';
export * from './lib/testing/fake-language-source';

export * from './lib/translate/feature-translate.module';
export * from './lib/translate/global-translate.service';
export * from './lib/translate/root-translate.module';
export * from './lib/translate/translate.module';
export * from './lib/translate/translate.pipe';
export * from './lib/translate/translate.service';
export * from './lib/translate/translate.store';

export * from './lib/types';
