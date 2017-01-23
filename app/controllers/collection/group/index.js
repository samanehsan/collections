import Ember from 'ember';

export default Ember.Controller.extend({
    showDeleteConfirmation: false,
    actions : {
        toggleDeleteConfirmation(){
            this.toggleProperty('showDeleteConfirmation');
        },
        deletePartial(){
            // for the moment this will do the same as deletefull.
        },
        deleteFull(){

        }

    }
});
