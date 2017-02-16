import Ember from 'ember';
import loadAll from 'ember-osf/utils/load-relationship';

export default Ember.Component.extend({
    getAuthors: Ember.observer('item.node', function() {
        // Cannot be called until node has loaded!
        const node = this.get('item.node');
        if (!node) { return [];}

        const contributors = Ember.A();
        loadAll(node, 'contributors', contributors).then(() =>
            this.set('authors', contributors)
        );
    })
});
