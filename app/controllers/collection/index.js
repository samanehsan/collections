import Ember from 'ember';
import faker from 'faker';

let types = ['project', 'preprint', 'registration', 'file', 'person'];

export default Ember.Controller.extend({
    searchGuid: '',
    loadingGuid: false,
    organizeMode: false,
    showAddItemDetails: false,
    fakeNewNode: {},
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
        addToList(){
            let list = this.get('model.list');
            list.addObject(this.get('fakeNewNode'));
            console.log(this.get('model'), list);
            this.set('showAddItemDetails', false);
            this.set('fakeNewNode', {});

        }
    }
});
