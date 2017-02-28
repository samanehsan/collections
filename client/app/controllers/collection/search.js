import Ember from 'ember';

export default Ember.Controller.extend({
    searchText: '',
    results: Ember.A(),
    actions: {
        search () {
            let self = this;
            let text = this.get('searchText');
            this.get('store').query('item', {
              filter: {
                title: text
              }
            }).then(function(results) {
              self.set('results', results);
            });
        }
    }
});
