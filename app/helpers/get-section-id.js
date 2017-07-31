import Ember from 'ember';

/**
 * Formats a string into a more readable url-friendly anchor tag by replacing spaces
 * with underscores and removing punctuation.
 * @param params Section title
 * @returns {*} Title with spaces replaced by underscores, and all punctuation removed
 */

export function getSectionId(params/*, hash*/) {
  const sectionHeader = params[0];
  if (sectionHeader) {
    return sectionHeader.replace(/[.,/#!$%^&*;:{}=`~()]/g,'').replace(/\s/g, '_');
  }
}

export default Ember.Helper.helper(getSectionId);
