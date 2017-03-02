import Ember from 'ember';

export default Ember.Controller.extend({
    newCollectionTitle: '',
    modelCache : null,
    filterText : '',
    actions : {
        filter () {
            let model = this.get('model');
            let text = this.get('filterText').toLowerCase();
            if(this.get('modelCache') === null){
                this.set('modelCache', model);
            }
            this.set('model', this.get('modelCache').filter(function(item){
                return item.get('title').toLowerCase().includes(text);
            }));
        },
        addCollection () {
            let collection = this.store.createRecord('collection', {
                title: this.get('newCollectionTitle'),
                tags: '',
                description: ''
            });
            collection.save().then(record => {
                this.set('newCollectionTitle', '');
                this.set('filterText', '');
                this.transitionToRoute('collection', record);
            }
            );
        },
        clearFilter(){
            this.set('filterText', '');
        },
        enterPress(){
            this.get('actions').addCollection.call(this);
        }
    }
});
