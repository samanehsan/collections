import Ember from 'ember';

export default Ember.Controller.extend({
    organizeMode: false,
    showDeleteConfirmation: false,
    actions : {
        deletePartial(){
            // for the moment this will do the same as deletefull.
        },
        deleteFull(){

        }

    }
});
