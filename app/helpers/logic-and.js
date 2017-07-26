import Ember from 'ember';

/**
 * logicAnd helper
 *
 * @class logicAnd
 * @param {Boolean} bool1
 * @param {Boolean} bool2
 * @return {Boolean} Are both boolean inputs true?
 */
export function logicAnd(params/* , hash*/) {
    const [bool1, bool2] = params;
    return bool1 && bool2;
}

export default Ember.Helper.helper(logicAnd);
