import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),
    session: Ember.inject.service(),
    data: Ember.computed('layout', function() {
        const dataSource = this.get('layout.data');
        return this.get('model.settings').data[dataSource];
    }),
    actions: {
    }
});
