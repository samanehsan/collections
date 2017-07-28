import Ember from 'ember';

export function getSectionId(params/*, hash*/) {
  const sectionHeader = params[0];
  if (sectionHeader) {
    return sectionHeader.replace(/[.,/#!$%^&*;:{}=`~()]/g,'').replace(/\s/g, '_');
  }
}

export default Ember.Helper.helper(getSectionId);
