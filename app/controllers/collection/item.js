import Ember from 'ember';

export default Ember.Controller.extend({
    actions : {
        findNode () {
            this.set('loadingGuid', true);
            console.log(this.store.findRecord('node', this.get('searchGuid')));
        }
    }
});
