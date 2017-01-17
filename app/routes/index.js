import Ember from 'ember';
import faker from 'faker';

export default Ember.Route.extend({
    model () {
        return $.getJSON('/api/collections').then(result => {
             return result.data;
           });
    }
});
