import Ember from 'ember';

var settings = {
  sections: [
    {
      title: 'subject-picker',
      settings: {
        selected: ['math', 'science', 'art']
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
      return settings;
    }
});
