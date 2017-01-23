import Ember from 'ember';

export default Ember.Component.extend({
    editMode : false,
    modelCache : null,
    actions : {
        showEdit () {
            this.set('modelCache', Ember.copy(this.get('model'), true));
            this.set('editMode', true);
        },
        cancelEdit() {
            this.set('editMode', false);
        },
        saveEdit (){
            let tags = this.get('modelCache.attributes.tags').split(',');
            this.set('model', Ember.copy(this.get('modelCache'), true));
            this.set('model.attributes.tags', tags);
            this.set('modelCache', null);
            this.set('editMode', false);

        }
    }
});
