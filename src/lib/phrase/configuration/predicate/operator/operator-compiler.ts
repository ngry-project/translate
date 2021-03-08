import { Injectable } from '@angular/core';
import { Operator } from './operator';
import { BundleID } from '../../../../bundle/bundle-id';
import { Language } from '../../../../language/language';
import { DebugContext } from '../../../../support/debug-context';
import { Parameter } from '../../../parameter';
import { PhraseKey } from '../../../phrase-key';
import { GreaterThanOperator } from './greater-than-operator';
import { GreaterThanOrEqualOperator } from './greater-than-or-equal-operator';
import { LowerThanOperator } from './lower-than-operator';
import { LowerThanOrEqualOperator } from './lower-than-or-equal-operator';
import { EqualOperator } from './equal-operator';
import { InOperator } from './in-operator';
import { RegExpOperator } from './reg-exp-operator';
import { OperatorData } from './operator-data';

/**
 * Represents an operator compiler.
 * @since 2.0.0
 * @internal
 */
@Injectable({
  providedIn: 'root',
})
export class OperatorCompiler {

  /**
   * Converts operator source data to operator object model.
   * @throws {UnknownOperatorException}
   * @since 2.0.0
   */
  compile(
    language: Language,
    bundleId: BundleID,
    phraseKey: PhraseKey,
    property: Parameter,
    operatorData: OperatorData,
  ): Operator {
    if ('$gt' in operatorData) {
      return new GreaterThanOperator(
        language,
        bundleId,
        phraseKey,
        property,
        operatorData.$gt,
      );
    }

    if ('$gte' in operatorData) {
      return new GreaterThanOrEqualOperator(
        language,
        bundleId,
        phraseKey,
        property,
        operatorData.$gte,
      );
    }

    if ('$lt' in operatorData) {
      return new LowerThanOperator(
        language,
        bundleId,
        phraseKey,
        property,
        operatorData.$lt,
      );
    }

    if ('$lte' in operatorData) {
      return new LowerThanOrEqualOperator(
        language,
        bundleId,
        phraseKey,
        property,
        operatorData.$lte,
      );
    }

    if ('$eq' in operatorData) {
      return new EqualOperator(
        language,
        bundleId,
        phraseKey,
        property,
        operatorData.$eq,
      );
    }

    if ('$in' in operatorData) {
      return new InOperator(
        language,
        bundleId,
        phraseKey,
        property,
        operatorData.$in,
      );
    }

    if ('$regexp' in operatorData) {
      return new RegExpOperator(
        language,
        bundleId,
        phraseKey,
        property,
        operatorData.$regexp,
        operatorData.$flags,
      );
    }

    const debugContext = new DebugContext({
      language,
      bundleId,
      phraseKey,
      property,
      operatorData,
    });

    throw new Error(`Cannot recognize operator by it's source; ${debugContext}`);
  }
}
