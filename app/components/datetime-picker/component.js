import Ember from 'ember';

export default Ember.Component.extend({
    date: null,
    pickerValue: null,
    changed: Ember.observer('date', function() {
        this.set('pickerValue', this.get('date'));
    }),
    didInsertElement() {
        this.$('.datetimepicker').datetimepicker();
    }
});
