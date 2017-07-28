import Ember from 'ember';

export default Ember.Component.extend({
    pickerValue: null,
    didInsertElement() {
        this.$('.datetimepicker').datetimepicker();
    }
});
