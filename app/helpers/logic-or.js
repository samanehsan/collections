import Ember from 'ember';

/**
 * logicOr helper
 *
 * @class logicOr
 * @param {Boolean} bool1
 * @param {Boolean} bool2
 * @return {Boolean} Is either boolean input true?
 */
export function logicOr(params/* , hash*/) {
    const [bool1, bool2] = params;
    return bool1 || bool2;
}

export default Ember.Helper.helper(logicOr);
