import Ember from 'ember';
import faker from 'faker';

let types = ['project', 'preprint', 'registration', 'file', 'person'];

export default Ember.Controller.extend({
    searchGuid: '',
    loadingGuid: false,
    organizeMode: false,
    showAddItemDetails: false,
    newItemNode: Ember.Object.create(),
    selectedItems : Ember.A(), // List of items selected for actions like delete
    showDeleteConfirmation: false, // Modal for deleting items
    showGroupConfirmation: false, // Modal for grouping
    groupTitle: '',
    groups: Ember.computed('model.groups', function() {
      let groups = this.get('model.groups');
      groups.forEach(function(group) {
        group.type = 'group';
      });
      return groups;
    }),
    list: Ember.computed.union('groups', 'model.items'),
    actions: {
        findNode () {
            let self = this;
            let node = this.store.findRecord('node', this.get('searchGuid')).then(function(item){
                let nodeObject = self.get('newItemNode');
                nodeObject.setProperties({
                    title:  item.get('title'),
                    description: item.get('description'),
                    type: item.get('category'),
                    link: item.get('links.html')
                });
                self.toggleProperty('showAddItemDetails');
            });

        },
        toggleOrganizeMode () {
            this.toggleProperty('organizeMode');
        },
        toggleDeleteConfirmation(){
            this.toggleProperty('showDeleteConfirmation');
        },
        clearSelected() {
            let selected = this.get('selectedItems');
            selected.clear();
        },
        clearModals() {
            this.set('showGroupConfirmation', false);
            this.set('showDeleteConfirmation', false);
            this.set('groupTitle', '');
        },
        deleteSelected(){
            let items = this.get('list');
            let selected = this.get('selectedItems');
            selected.forEach(item =>
                Ember.run.once(() =>
                  item.destroyRecord()
            ));
            items.removeObjects(selected);
            this.send('clearSelected');
            this.send('clearModals');
        },
        toggleGroupConfirmation ( ){
            this.toggleProperty('showGroupConfirmation');
        },
        groupSelected(){
            let newGroup = {
                id: 123,
                title: this.get('groupTitle'),
                description: faker.lorem.sentences(),
                tags : faker.lorem.words().split(' '),
                type : types[Math.floor(Math.random()*types.length)],
                isGroup : true
            };
            let list = this.get('list');
            list.unshiftObject(newGroup);
            // remove items that were put into the group;
            let items = this.get('list');
            let selected = this.get('selectedItems');
            items.removeObjects(selected);
            this.send('clearSelected');
            this.send('clearModals');
        },
        // Adds or removes item to the selectedItems list
        toggleSelectedList(selected, item){
            let currentList = this.get('selectedItems');
            if(!selected){
                currentList.removeObject(item);
            } else {
                currentList.addObject(item);
            }

        },
        addToList(){
            let nodeObject = this.get('newItemNode');
            let item = this.store.createRecord('item', {
                title: nodeObject.get('title'),
                type: nodeObject.get('type'),
                metadata: '',
                status: 'pending',
                url: nodeObject.get('link'),
                source_id: this.get('model.id'),
                collection : this.get('model')
            });
            item.save();
            this.set('showAddItemDetails', false);
        }
    }
});
