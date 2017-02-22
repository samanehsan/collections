import Ember from 'ember';

export default Ember.Component.extend({
    newItemNode: Ember.Object.create(),
    store: Ember.inject.service(),
    searchGuid: '',
    loadingItem: false,
    showAddItemDetails: false,
    actions: {
        findNode () {
            let self = this;
            if(!this.get('searchGuid')){
                return;
            }
            this.set('loadingItem', true);
            this.get('store').findRecord('node', this.get('searchGuid')).then(function(item){
                let nodeObject = self.get('newItemNode');
                nodeObject.setProperties({
                    title:  item.get('title'),
                    description: item.get('description'),
                    type: item.get('category'),
                    source_id: item.get('id'),
                    link: item.get('links.html')
                });
                self.set('loadingItem', false);
                self.toggleProperty('showAddItemDetails');

            });

        },
        addToList(){
            let nodeObject = this.get('newItemNode');
            let item = this.get('store').createRecord('item', {
                title: nodeObject.get('title'),
                type: nodeObject.get('type'),
                metadata: '',
                status: 'pending',
                url: nodeObject.get('link'),
                source_id: nodeObject.get('source_id'),
                collection : this.get('model')
            });
            item.save();
            this.set('showAddItemDetails', false);
            this.set('searchGuid', '');
        },
    }

});
