import Ember from 'ember';
import faker from 'faker';


let formatData = function (collection){
    // Split tags into array
    let tags = collection.get('tags').split(',');
    let newTags = tags.splice(0,tags.length-1);
    collection.set('formattedTags', newTags);
    //Format dates
    let dateCreated = new Date(collection.get('dateCreated'));
    collection.set('dateCreatedReadable', dateCreated.toDateString());
    let dateUpdated = new Date(collection.get('dateUpdated'));
    collection.set('dateUpdatedReadable', dateUpdated.toDateString());
    return collection;
};

export default Ember.Route.extend({
  model (params) {
    return this.store.findRecord('collection', params.collection_id).then(function(data){
      return formatData(data);
    });
  }
});
