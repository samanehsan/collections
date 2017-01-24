import Ember from 'ember';
import faker from 'faker';

let generateFake = function (id) {
    let types = ['project', 'preprint', 'registration', 'file', 'person'];
    let status = ['pending', 'approved', 'other'];
    let item = {
        id: id,
        title: faker.lorem.words(),
        description: faker.lorem.sentences(),
        tags : faker.lorem.words().split(' '),
        type : types[Math.floor(Math.random()*types.length)],
        status:  status[Math.floor(Math.random()*status.length)],
        isGroup: faker.random.boolean()
    };
    return item;
};

export default Ember.Route.extend({
  model (params) {
      // Get actual collections

      return $.getJSON('/api/collections/' + params.collection_id).then(result => {
           let model = result.data;
           model.list = [];
           for(let i = 0; i < 20; i++){
               model.list.push(generateFake(i));
           }
           return model;
         });
  }
});
