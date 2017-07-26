import Ember from 'ember';

export function getSectionId(params/*, hash*/) {
  const sectionHeader = params[0].split(' ');
  return sectionHeader[0].replace(',', '');
}

export default Ember.Helper.helper(getSectionId);
