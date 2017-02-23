import Ember from 'ember';

export default Ember.Component.extend({
    newItemNode: Ember.Object.create(),
    store: Ember.inject.service(),
    searchGuid: '',
    searchFilter: '',
    loadingItem: false,
    showAddItemDetails: false,
    findItemError: null,
    results: null,
    showResults: false,
    clearFilters(){
        this.set('searchGuid', '');
        this.set('searchFilter', '');
    },
    clearView(){
        this.set('loadingItem', false);
        this.set('showAddItemDetails', false);
        this.set('findItemError', null);
        this.set('results', null);
        this.set('showResults', false);
    },
    buildNodeObject (item){
        this.get('newItemNode').setProperties({
            title:  item.get('title'),
            description: item.get('description'),
            type: item.get('category'),
            source_id: item.get('id'),
            link: item.get('links.html')
        });
    },
    actions: {
        findNode () {
            let self = this;
            if(!this.get('searchGuid')){
                return;
            }
            this.clearView();
            this.set('loadingItem', true);
            this.get('store').findRecord('node', this.get('searchGuid')).then(function(item){
                self.buildNodeObject(item);
                self.set('showAddItemDetails', true);
                self.set('loadingItem', false);
            }).catch(function(error){
                self.clearView();
                self.clearFilters();
                self.set('findItemError', error.errors);
            });

        },
        addItem(node){
            if(node){
                this.buildNodeObject(node);
            }
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
            this.clearView();
            this.clearFilters();
        },
        searchNode () {
            let self = this;
            let filterText = this.get('searchFilter');
            if(!filterText){
                return;
            }
            this.clearView();
            this.set('loadingItem', true);
            this.get('store').query('node', { 'filter[title]': filterText}).then(function(results){
                self.set('results', results);
                self.set('loadingItem', false);
                self.set('showResults', true);
            }).catch(function(error){
                self.clearView();
                self.clearFilters();
                self.set('findItemError', error.errors);
            });
        },
        enterPressSearch(){
            this.get('actions').searchNode.call(this);
        },
        enterPressGuid(){
            this.get('actions').findNode.call(this);
        }
    }

});
