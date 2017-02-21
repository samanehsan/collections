import Ember from 'ember';
import config from 'ember-get-config';
import loadAll from 'ember-osf/utils/load-relationship';

export default Ember.Component.extend({
    wikiContent: null,
    store: Ember.inject.service(),
    session: Ember.inject.service(),
    formatWikiData: Ember.observer('item.node.wikis', function(){
        let node = this.get('item.node');
        let wikis = node.get('wikis');
        let item = this.get('item');
        if(wikis){
            wikis.then(function(result){
                if(item.hasWiki && result.objectAt(0)){
                    let url = result.objectAt(0).get('links.download');
                    let headers = {};
                    let authType = config['ember-simple-auth'].authorizer;
                    this.get('session').authorize(authType, (headerName, content) => {
                        headers[headerName] = content;
                    });

                    Ember.$.ajax({
                        method: 'GET',
                        headers,
                        url
                    }).done(data => {
                        this.set('wikiContent', data);
                    });
                }
            }.bind(this));
        }
    }),
    formatNodeData: Ember.observer('item.node', function() {
        // Cannot be called until node has loaded!
        const node = this.get('item.node');
        if (!node) { return [];}

        this.set('item.hasFile', true);
        const contributors = Ember.A();
        loadAll(node, 'contributors', contributors).then(() =>
            this.set('authors', contributors)
        );
    })
});
