import Ember from 'ember';

export default Ember.Route.extend({
    model () {
        return this.store.findAll('collection').then(function(data){
            return data;
        });

        // return $.getJSON('http://127.0.0.1:8000/api/collections').then(result => {
        //      return result.data;
        //    });

    }
});
