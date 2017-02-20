import Ember from 'ember';

export default Ember.Controller.extend({
    organizeMode: false,
    selectedItems : Ember.A(),
    showDeleteGroupConfirmation: false, // Modal for deleting group
    showDeleteItemConfirmation: false, // Modal for deleting items
    actions : {
        clearSelected() {
            let selected = this.get('selectedItems');
            selected.clear();
        },
        clearModals() {
              this.set('showDeleteGroupConfirmation', false);
              this.set('showDeleteItemConfirmation', false);
          },
        deletePartial(){
            // for the moment this will do the same as deletefull.
        },
        deleteFull(){
            let collection = this.get('model.collection');
            this.get('model').destroyRecord().then(() =>
              this.transitionToRoute('collection', collection)
            );
        },
        deleteSelected() {
            let items = this.get('model.items');
            let selected = this.get('selectedItems');
            selected.forEach(item =>
                Ember.run.once(() =>
                  item.destroyRecord()
            ));
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

        }
    }
});
