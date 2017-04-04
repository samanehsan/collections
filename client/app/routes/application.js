import Ember from 'ember';

import OsfTokenLoginRouteMixin from 'ember-osf/mixins/osf-token-login-route';

export default Ember.Route.extend(OsfTokenLoginRouteMixin, {
    currentUser: Ember.inject.service('currentUser'),
    model(){
        return this.get('currentUser').load().then(function(result){
            return result.get('id') ? true : false;
        });
    }
});
