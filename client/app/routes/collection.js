import Ember from 'ember';

let formatData = function (collection){
    // Split tags string into array
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
  model () {
    return this.store.findRecord('collection', 1).then(function(data){
        return formatData(data);
    });
  }
});
