import { Injectable } from '@angular/core';
import { Operator } from './operator';
import { BundleID } from '../../../../bundle/bundle-id';
import { LanguageID } from '../../../../language/language-id';
import { DebugContext } from '../../../../support/debug-context';
import { PhraseKey } from '../../../phrase-key';
import { GreaterThanOperator } from './greater-than-operator';
import { GreaterThanOrEqualOperator } from './greater-than-or-equal-operator';
import { LowerThanOperator } from './lower-than-operator';
import { LowerThanOrEqualOperator } from './lower-than-or-equal-operator';
import { EqualOperator } from './equal-operator';
import { InOperator } from './in-operator';
import { RegExpOperator } from './reg-exp-operator';
import { OperatorData } from './operator-data';

@Injectable({
  providedIn: 'root',
})
export class OperatorCompiler {

  /**
   * Converts operator source data to operator object model.
   * @param languageId Language name
   * @param bundleId Bundle name
   * @param phraseKey Phrase key
   * @param propertyName Property name in {@link Locals}
   * @param operatorData Operator sources
   * @throws {UnknownOperatorException}
   * @see EqualOperator
   * @see GreaterThanOperator
   * @see GreaterThanOrEqualOperator
   * @see InOperator
   * @see LowerThanOperator
   * @see LowerThanOrEqualOperator
   * @see RegExpOperator
   * @since 2.0.0
   */
  compile(
    languageId: LanguageID,
    bundleId: BundleID,
    phraseKey: PhraseKey,
    propertyName: string,
    operatorData: OperatorData,
  ): Operator {
    if ('$gt' in operatorData) {
      return new GreaterThanOperator(
        languageId,
        bundleId,
        phraseKey,
        propertyName,
        operatorData.$gt,
      );
    }

    if ('$gte' in operatorData) {
      return new GreaterThanOrEqualOperator(
        languageId,
        bundleId,
        phraseKey,
        propertyName,
        operatorData.$gte,
      );
    }

    if ('$lt' in operatorData) {
      return new LowerThanOperator(
        languageId,
        bundleId,
        phraseKey,
        propertyName,
        operatorData.$lt,
      );
    }

    if ('$lte' in operatorData) {
      return new LowerThanOrEqualOperator(
        languageId,
        bundleId,
        phraseKey,
        propertyName,
        operatorData.$lte,
      );
    }

    if ('$eq' in operatorData) {
      return new EqualOperator(
        languageId,
        bundleId,
        phraseKey,
        propertyName,
        operatorData.$eq,
      );
    }

    if ('$in' in operatorData) {
      return new InOperator(
        languageId,
        bundleId,
        phraseKey,
        propertyName,
        operatorData.$in,
      );
    }

    if ('$regexp' in operatorData) {
      return new RegExpOperator(
        languageId,
        bundleId,
        phraseKey,
        propertyName,
        operatorData.$regexp,
        operatorData.$flags,
      );
    }

    const debugContext = new DebugContext({
      languageId,
      bundleId,
      phraseKey,
      propertyName,
      operatorData,
    });

    throw new Error(`Cannot recognize operator by it's source; ${debugContext}`);
  }
}
