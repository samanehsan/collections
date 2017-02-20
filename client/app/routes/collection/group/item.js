import Ember from 'ember';

const hasFileList = ['preprint', 'file', 'poster'];
const hasWikiList = ['project', 'registration'];
export default Ember.Route.extend({
    model (params){
      let self = this;
      return this.store.findRecord('item', params.group_item_id).then(function(item){
        item.set('hasFile', hasFileList.includes(item.get('type')));
        item.set('hasWiki', hasWikiList.includes(item.get('type')));
        self.get('store').findRecord('node', item.get('source_id')).then(function(node){
          item.set('node', node);
        });
        return item;
      });
    }
});
