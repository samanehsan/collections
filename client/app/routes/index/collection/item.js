import Ember from 'ember';
import faker from 'faker';

let types = ['project', 'preprint', 'registration', 'file', 'person'];
let item = {
    title: faker.lorem.words(),
    description: faker.lorem.sentences(),
    tags : faker.lorem.words().split(' '),
    type : types[Math.floor(Math.random()*types.length)],
    addedBy : faker.name.firstName() + faker.name.lastName(),
    dateAdded : faker.date.past()

};

export default Ember.Route.extend({
    model (){
        return item;
    },
    breadCrumb: {
      title: item.title
    }
});
