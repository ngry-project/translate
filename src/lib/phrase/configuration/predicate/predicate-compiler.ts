import { Injectable } from '@angular/core';
import { Language } from '../../../language/language';
import { BundleID } from '../../../bundle/bundle-id';
import { PhraseKey } from '../../phrase-key';
import { Predicate } from './predicate';
import { Operator } from './operator/operator';
import { OperatorCompiler } from './operator/operator-compiler';
import { OperatorData } from './operator/operator-data';
import { PredicateData } from './predicate-data';
import { Parameter } from '../../parameter';

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
   * @param language Language name
   * @param bundleId Bundle name
   * @param phraseKey Phrase key
   * @param predicateData Predicates source
   * @since 2.0.0
   */
  compile(language: Language, bundleId: BundleID, phraseKey: PhraseKey, predicateData: PredicateData): Predicate {
    return new Predicate(Object.entries(predicateData).reduce((conditions: Record<Parameter, Operator[]>, [property, operatorData]) => {
      const operatorsData: OperatorData[] = Array.isArray(operatorData) ? operatorData : [operatorData];

      conditions[property] = operatorsData.map(data => {
        return this.operatorCompiler.compile(language, bundleId, phraseKey, property, data);
      });

      return conditions;
    }, {}));
  }
}
