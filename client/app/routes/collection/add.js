import Ember from 'ember';

var settings = {
  sections: [
    {
      title: 'subject-picker',
      settings: {
        subjects: []
      }
    }
  ],
  values: {
    'subject-picker': {},
    'contributors': {}
  }
};

export default Ember.Route.extend({
    model() {
      return settings.sections[0].settings;
    }
});
