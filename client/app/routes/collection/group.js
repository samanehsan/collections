import Ember from 'ember';
import {formatDate} from 'collections/utils/formatDate';

export default Ember.Route.extend({
    model(params){
        return this.get('store').findRecord('group', params.group_id).then(group => {
            return formatDate(group);
        });
    }
});
