import Ember from 'ember';

export default Ember.Controller.extend({
    organizeMode : false,
    actions : {
        toggleOrganizeMode () {
            this.toggleProperty('organizeMode');
        }
    }
});
