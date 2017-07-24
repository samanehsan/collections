import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),
    session: Ember.inject.service(),
    test: 4,
    data: Ember.computed('layout', function() {
        const model = this.get('model');
        const dataSource = this.get('layout.data');
        return this.get('model.settings').data[dataSource];
    }),
    users: Ember.computed('model.items', function() {
        let items = this.get('model.items');
        let userIDs = [];
        for (var i=0; i < items.get('length'); i++) {
            const userID = items.objectAt(i).get('createdBy.id');
            if (userID !== undefined && userIDs.indexOf(userID) == -1) {
                userIDs.push(userID);
            }
        }
        let users = [];
        for (var j=0; j < userIDs.length; j++) {
            users.push(this.get('store').findRecord('user', userIDs[j]));
        }
        return users;
    }),

    actions: {
    }
});
