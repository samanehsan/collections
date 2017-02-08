import Ember from 'ember';
import faker from 'faker';

let types = ['project', 'preprint', 'registration', 'file', 'person'];

export default Ember.Controller.extend({
    searchGuid: '',
    loadingGuid: false,
    organizeMode: false,
    showAddItemDetails: false,
    fakeNewNode: {},
    selectedItems : Ember.A(), // List of items selected for actions like delete
    showDeleteConfirmation: false, // Modal for deleting items
    showGroupConfirmation: false, // Modal for grouping
    groupTitle: '',
    clearSelected(){
        let selected = this.get('selectedItems');
        selected.clear();
    },
    clearModals (){
        this.set('showGroupConfirmation', false);
        this.set('showDeleteConfirmation', false);
        this.set('groupTitle', '');
    },
    actions: {
        findNode () {
            this.set('fakeNewNode',
            {
                title:  faker.lorem.words(),
                description: faker.lorem.sentences(),
                tags: faker.lorem.words().split(' '),
                type: types[Math.floor(Math.random()*types.length)],
                addedBy: faker.name.firstName() + faker.name.lastName()
            });
            this.toggleProperty('showAddItemDetails');

        },
        toggleOrganizeMode () {
            this.toggleProperty('organizeMode');
        },
        toggleDeleteConfirmation(){
            this.toggleProperty('showDeleteConfirmation');
        },
        deleteSelected(){
            let items = this.get('model.list');
            items.removeObjects(this.get('selectedItems'));
            this.clearSelected();
            this.clearModals();
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
            let list = this.get('model.list');
            list.unshiftObject(newGroup);
            // remove items that were put into the group;
            let items = this.get('model.list');
            let selected = this.get('selectedItems');
            items.removeObjects(selected);
            this.clearSelected();
            this.clearModals();
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
            let list = this.get('model.list');
            list.unshiftObject(this.get('fakeNewNode'));
            this.set('showAddItemDetails', false);
            this.set('fakeNewNode', {});

        }
    }
});
