/*  Utility function to combine different route needs for same view of
 *  item detail page.
 */
function itemRoute (params, itemIdName) {
    let self = this;
    const hasFileList = ['preprint', 'file', 'poster'];
    const hasWikiList = ['project', 'registration'];
    return this.store.findRecord('item', params[itemIdName]).then(function(item){
        let type = item.get('type');
        let apiType = item.get('type') === 'registration' ? 'registration' : 'node';
        item.set('hasFile', hasFileList.includes(type));
        item.set('hasWiki', hasWikiList.includes(type));
        self.get('store').findRecord(apiType, item.get('source_id')).then(function(node){
            let tags = node.get('tags');
            if(tags && tags.length === 0){  // To differentiate between empty and nonexistent
                node.set('tags', true);
            }
            item.set('node', node);
            if(item.get('type') === 'preprint'){
                node.get('preprints').then(result => {
                    if(result.objectAt(0)){
                        result.objectAt(0).get('primaryFile').then(pf => {
                            item.set('downloadUrl', pf.get('links').download);
                            item.set('hasFile', true);
                        });
                    }
                });
            }
        });
        return item;
    });
}

export {itemRoute};
