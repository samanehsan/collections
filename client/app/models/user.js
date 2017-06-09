import DS from 'ember-data';

export default DS.Model.extend({
    username: DS.attr('string'),
    firstName: DS.attr('string'),
    lastName: DS.attr('string'),
    fullName: Ember.computed('firstName', 'lastName', function() {
      return `${this.get('firstName')} ${this.get('lastName')}`;
    })
});
