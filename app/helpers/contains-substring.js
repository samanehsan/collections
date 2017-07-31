import Ember from 'ember';

/**
 * containsSubstring helper
 *
 * @class containsSubstring
 * @param {String} string The string being searched through
 * @param {String} target The string being looked for
 * @return {Boolean} Does the target string exist inside the specified string?
 */
export function containsSubstring(params/* , hash*/) {
    const [string, target] = params;
    let stringLower = string.toLowerCase();
    let targetLower = target.toLowerCase();
    if (stringLower.length === 0) {
        return false;
    } else {
        return stringLower.indexOf(targetLower) !== -1;
    }
}

export default Ember.Helper.helper(containsSubstring);
