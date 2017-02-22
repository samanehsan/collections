import Ember from 'ember';
import {itemRoute} from 'collections/utils/itemRoute';

export default Ember.Route.extend({
    model (params){
        return itemRoute.call(this, params, 'group_item_id');
    }
});
