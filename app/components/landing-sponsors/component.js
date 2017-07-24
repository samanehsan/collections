import Ember from 'ember';

export default Ember.Component.extend({
    containerStyle: Ember.computed(function() {
        return 'background: #fff';
    }),
    data: Ember.computed('layout', function() {
        const dataSource = this.get('layout.data');
        return this.get('model.settings').data[dataSource];
    })
});
