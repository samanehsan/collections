import Ember from 'ember';

export default Ember.Component.extend({
    editMode : false,
    actions : {
        toggleEdit () {
            this.toggleProperty('editMode');
        }
    }
});
