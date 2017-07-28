import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),
    session: Ember.inject.service(),
    data: Ember.computed('layout', function() {
        const dataSource = this.get('layout.data');
        return this.get('model.settings').data[dataSource];
    }),
    containerStyle: Ember.computed('layout', function() {
        return Ember.String.htmlSafe(`background-color: ${this.get('layout.background_color')}; color: ${this.get('layout.text_color')};`);
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
    })
});
