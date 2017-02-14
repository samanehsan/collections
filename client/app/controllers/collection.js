import Ember from 'ember';

export default Ember.Controller.extend({
    searchGuid : 'fkat6',
    loadingGuid : false,
    organizeMode : false,
    actions : {
        toggleOrganizeMode () {
            this.toggleProperty('organizeMode');
        }
    }
});
