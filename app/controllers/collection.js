import Ember from 'ember';

export default Ember.Controller.extend({
    searchGuid : 'fkat6',
    loadingGuid : false,
    actions : {
        findNode () {
            this.set('loadingGuid', true);
            console.log(this.store.findRecord('node', this.get('searchGuid')));
        }
    }
});
