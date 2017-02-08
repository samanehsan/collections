import Ember from 'ember';

export default Ember.Route.extend({
    model () {
        return this.store.findAll('collection').then(function(data){
            return data;
        });
    }
});
