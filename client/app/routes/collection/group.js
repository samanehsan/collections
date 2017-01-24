import Ember from 'ember';

import faker from 'faker';

let model;
let generateFake = function (id) {
    let types = ['project', 'preprint', 'registration', 'file', 'person'];
    let item = {
        id: id,
        title: faker.lorem.words(),
        description: faker.lorem.sentences(),
        tags : faker.lorem.words().split(' '),
        type : types[Math.floor(Math.random()*types.length)],
        isGroup : false
    };
    return item;
};

let buildModel = function () {
    model = {
        title: faker.lorem.words(),
        description: faker.lorem.sentences(),
        tags : faker.lorem.words().split(' '),
        list : []
    };
    let recordTotal = 20;
    for(let i = 0; i < recordTotal; i++){
        model.list.push(generateFake(i));
    }
};

buildModel();
export default Ember.Route.extend({
    model(){
        return model;
    },
    breadCrumb: {
      title: model.title
    }
});
