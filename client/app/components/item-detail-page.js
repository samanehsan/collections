import Ember from 'ember';
import loadAll from 'ember-osf/utils/load-relationship';

export default Ember.Component.extend({
    wikiContent: null,
    formatWikiData: Ember.observer('item.node.wikis', function(){
        let node = this.get('item.node');
        let wikis = node.get('wikis');
        let item = this.get('item');
        if(wikis){
            wikis.then(function(result){
                this.set('wikiContent', 'Wiki content will come here');
                // if(item.hasWiki && result.objectAt(0)){
                //     let url = result.objectAt(0).get('links.download');
                //     Ember.$.ajax({
                //         method: 'GET',
                //         url: url,
                //         xhrFields: {
                //             withCredentials: true
                //         }
                //     }).done(data => {
                //         this.set('wikiContent', data);
                //     });
                // }
            }.bind(this));
        }

    }),
    formatNodeData: Ember.observer('item.node', function() {
        // Cannot be called until node has loaded!
        const node = this.get('item.node');
        if (!node) { return [];}

        const contributors = Ember.A();
        loadAll(node, 'contributors', contributors).then(() =>
            this.set('authors', contributors)
        );
    })
});
