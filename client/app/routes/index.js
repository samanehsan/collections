import Ember from 'ember';
import faker from 'faker';

export default Ember.Route.extend({
    model () {
        return $.getJSON('http://127.0.0.1:8000/api/collections').then(result => {
             return result.data;
           });

    }
});
