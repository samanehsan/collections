import Ember from 'ember';

function itemRoute (params, itemIdName) {
    let self = this;
    const hasFileList = ['preprint', 'file', 'poster'];
    const hasWikiList = ['project', 'registration'];
    return this.store.findRecord('item', params[itemIdName]).then(function(item){
      item.set('hasFile', hasFileList.includes(item.get('type')));
      item.set('hasWiki', hasWikiList.includes(item.get('type')));
      self.get('store').findRecord('node', item.get('source_id')).then(function(node){
        if(node.get('tags').length === 0){  // To differentiate between empty and nonexistent
            node.set('tags', true);
        }
        item.set('node', node);
        node.get('preprints').then(result => {
            if(result.objectAt(0)){
                result.objectAt(0).get('primaryFile').then(pf => {
                    item.set('downloadUrl', pf.get('links').download);
                    item.set('hasFile', true);
                });
            }
         });
      });
      return item;
    });}

export {itemRoute};
