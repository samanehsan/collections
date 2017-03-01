import Ember from 'ember';

export default Ember.Route.extend({
  model (params) {
      let self = this;
        return this.store.findRecord('collection', params.collection_id).then(function(data){
          return data;
        }).catch(function(error){
            self.transitionTo('not-found');
        });
    }
});
