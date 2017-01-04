import Ember from 'ember';
import faker from 'faker';

export default Ember.Route.extend({
    generateFake () {
        let item = {
            title: faker.lorem.words(),
            description: faker.lorem.sentences(),
            tags : faker.lorem.words().split(' ')
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
