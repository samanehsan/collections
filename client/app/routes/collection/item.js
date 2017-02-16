import Ember from 'ember';

export default Ember.Route.extend({
    model (params){
      let self = this;
      return this.store.findRecord('item', params.item_id).then(function(item){
        self.get('store').findRecord('node', item.get('source_id')).then(function(node){
          item.set('node', node);
        });
        return item;
      });
    }
});
