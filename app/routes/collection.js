import Ember from 'ember';
import faker from 'faker';

export default Ember.Route.extend({
    generateFake () {
        let types = ['project', 'preprint', 'registration', 'file', 'person'];
        let item = {
            title: faker.lorem.words(),
            description: faker.lorem.sentences(),
            tags : faker.lorem.words().split(' '),
            type : types[Math.floor(Math.random()*types.length)]
        };
        return item;
    },
    model (params){
        let model = {
            title : 'Collection Title',
            id : params.collection_id,
            list : []
        };
        let recordTotal = 20;
        for(let i = 0; i < recordTotal; i++){
            model.list.push(this.generateFake());
        }
        return model;
    }
});
