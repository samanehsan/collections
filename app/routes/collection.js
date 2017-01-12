import Ember from 'ember';

export default Ember.Route.extend({
  breadCrumb: {
      title: 'Some Collection Title Here'
  },
  model () {
      return [];
  }
});
