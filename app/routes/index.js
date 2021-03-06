import Ember from 'ember';
import faker from 'faker';

export default Ember.Route.extend({
    generateFake (id) {
        let item = {
            title: faker.lorem.words(),
            description: faker.lorem.sentences(),
            tags : faker.lorem.words().split(' '),
            id: id
        };
        return item;
    },
    model () {
        let list = [];
        let recordTotal = 20;
        for(let i = 0; i < recordTotal; i++){
            list.push(this.generateFake(i));
        }
        return list;
    }
});
