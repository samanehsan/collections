import Ember from 'ember';

export default Ember.Component.extend({
    editMode : false,
    modelCache : null,
    actions : {
        showEdit () {
            this.set('modelCache', Ember.copy(this.get('model'), true));
            console.log(this.get('modelCache'));
            this.set('editMode', true);
        },
        cancelEdit() {
            this.set('editMode', false);
        },
        saveEdit (){
            this.set('model', Ember.copy(this.get('modelCache'), true));
            this.set('modelCache', null);
            this.set('editMode', false);

        }
    }
});
