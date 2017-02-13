import Ember from 'ember';

export default Ember.Component.extend({
    editMode : false,
    modelCache : Ember.computed('model', function(){
        let model = this.get('model');
        return {
            title: model.get('title'),
            description: model.get('description'),
            tags: model.get('tags')
        };
    }),
    formattedTags : Ember.computed('model.tags', function(){
        return this.get('model.tags').split(',');
    }),
    actions : {
        showEdit () {
            this.set('editMode', true);
        },
        cancelEdit() {
            this.set('editMode', false);
        },
        saveEdit (){
            let model = this.get('model');
            model.set('title', this.get('modelCache.title'));
            model.set('description', this.get('modelCache.description'));
            model.set('tags', this.get('modelCache.tags'));
            model.save();
            this.set('editMode', false);

        }
    }
});
