import Ember from 'ember';

export default Ember.Component.extend({
    editMode : false,
    resetModalCache(){
        let model = this.get('model');
        return {
            title: model.get('title'),
            description: model.get('description'),
        };
    },
    modelCache : Ember.computed('model', function(){
        return this.resetModalCache();
    }),
    actions : {
        showEdit () {
            this.set('editMode', true);
        },
        cancelEdit() {
            this.set('editMode', false);
            this.set('modelCache', this.resetModalCache());
        },
        saveEdit (){
            let model = this.get('model');
            model.set('title', this.get('modelCache.title'));
            model.set('description', this.get('modelCache.description'));
            model.save();
            this.set('editMode', false);

        }
    }
});
