import Ember from 'ember';
import {formatDate} from 'collections/utils/formatDate';

export default Ember.Route.extend({
  model (params) {
    return this.store.findRecord('collection', params.collection_id).then(function(data){
      return formatDate(data);
    });
  }
});
