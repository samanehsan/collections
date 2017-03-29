import Ember from 'ember';

export default Ember.Component.extend({
    searchQuery: '',
    actions: {
        search(){
            this.get('changeRoute')('collection.search');
        }
    }
});
