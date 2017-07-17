import Ember from 'ember';

export default Ember.Route.extend({
    session: Ember.inject.service(),
    model () {
        return this.store.query('meeting', {
            page: 1,
        }).then(function(data) {
            return data;
        });
    }
});
