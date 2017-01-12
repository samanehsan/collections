import Ember from 'ember';
import faker from 'faker';

export default Ember.Route.extend({
    model (){
        let types = ['project', 'preprint', 'registration', 'file', 'person'];
        let item = {
            title: faker.lorem.words(),
            description: faker.lorem.sentences(),
            tags : faker.lorem.words().split(' '),
            type : types[Math.floor(Math.random()*types.length)]
        };
        return item;
    }
});
