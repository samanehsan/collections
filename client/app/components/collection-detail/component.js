import Ember from 'ember';

export default Ember.Component.extend({
    editMode : false,
    resetModelCache(){
        let model = this.get('model');
        return {
            title: model.get('title'),
            description: model.get('description'),
            tags: model.get('tags')
        };
    },
    modelCache : Ember.computed('model', function(){
        return this.resetModelCache();
    }),
    formattedTags : Ember.computed('model.tags', function(){
        let tags = this.get('model.tags');
        if(tags){
            return this.get('model.tags').split(',');
        }
        return [];
    }),
    actions : {
        showEdit () {
            this.set('editMode', true);
        },
        cancelEdit() {
            this.set('editMode', false);
            this.set('modelCache', this.resetModelCache());
        },
        saveEdit (){
            let model = this.get('model');
            model.set('title', this.get('modelCache.title'));
            model.set('description', this.get('modelCache.description'));
            model.set('tags', this.get('modelCache.tags'));
            model.save();
            this.set('editMode', false);
        },
        deleteCollection(){
            this.get('model').destroyRecord().then(() => this.get('changeRoute')('/'));
        }
    }
});
