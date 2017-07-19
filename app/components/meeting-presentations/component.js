import Ember from 'ember';

export default Ember.Component.extend({
    session: Ember.inject.service(),
    test: 4,
    data: Ember.computed('layout', function() {
        const dataSource = this.get('layout.data');
        return this.get('model.settings').data[dataSource];
    }),
    actions: {
    }
});
