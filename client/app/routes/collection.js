import Ember from 'ember';
import faker from 'faker';


let formatData = function (collection){
    let tags = collection.get('tags').split(',');
    let newTags = tags.splice(0,tags.length-1);
    collection.set('formattedTags', newTags);
    return collection;
};

export default Ember.Route.extend({
  model () {
    return this.store.findRecord('collection', 1).then(function(data){
        console.log(data);
        return formatData(data);
    });
  }
});
