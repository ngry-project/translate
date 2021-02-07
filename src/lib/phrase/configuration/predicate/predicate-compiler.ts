import { Injectable } from '@angular/core';
import { LanguageID } from '../../../language/language-id';
import { BundleID } from '../../../bundle/bundle-id';
import { PhraseKey } from '../../phrase-key';
import { Predicate } from './predicate';
import { Operator } from './operator/operator';
import { OperatorCompiler } from './operator/operator-compiler';
import { OperatorData } from './operator/operator-data';
import { PredicateData } from './predicate-data';

@Injectable({
  providedIn: 'root',
})
export class PredicateCompiler {

  constructor(
    private operatorCompiler: OperatorCompiler,
  ) {
  }

  /**
   * Converts predicate source data to predicate object model.
   * @param languageId Language name
   * @param bundleId Bundle name
   * @param phraseKey Phrase key
   * @param predicateData Predicates source
   * @since 2.0.0
   */
  compile(languageId: LanguageID, bundleId: BundleID, phraseKey: PhraseKey, predicateData: PredicateData): Predicate {
    return new Predicate(Object.entries(predicateData).reduce((conditions: Record<string, Operator[]>, [propertyName, operatorData]) => {
      const operatorsData: OperatorData[] = Array.isArray(operatorData) ? operatorData : [operatorData];

      conditions[propertyName] = operatorsData.map(data => {
        return this.operatorCompiler.compile(languageId, bundleId, phraseKey, propertyName, data);
      });

      return conditions;
    }, {}));
  }
}
