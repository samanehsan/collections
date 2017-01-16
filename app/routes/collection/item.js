import Ember from 'ember';
import faker from 'faker';

let types = ['project', 'preprint', 'registration', 'file', 'person'];
let status = ['pending', 'approved', 'other'];
var item = Ember.Object.create({
        title: faker.lorem.words()
    });

export default Ember.Route.extend({
    model (params){
        item.set('id', parseInt(params.item_id));
        let id = item.get('id');
        item.set('nextId', id > -1 ? id + 1 : null);
        item.set('previousId', id > -1 ? id - 1 : null);
        item.set('title', faker.lorem.words());
        item.set('description', faker.lorem.sentences());
        item.set('tags', faker.lorem.words().split(' '));
        item.set('type', types[Math.floor(Math.random()*types.length)]);
        item.set('addedBy', faker.name.firstName() + faker.name.lastName());
        item.set('dateAdded', faker.date.past());
        item.set('status', status[Math.floor(Math.random()*status.length)]);
        return item;
    },
    breadCrumb: {
      title: item.title
    }
});
