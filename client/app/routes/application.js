import Ember from 'ember';

import OsfTokenLoginRouteMixin from 'ember-osf/mixins/osf-token-login-route';

export default Ember.Route.extend(OsfTokenLoginRouteMixin, {
    currentUser: Ember.inject.service('currentUser'),
    model(){
        let model = {};
        model.loggedIn = false;
        this.get('currentUser').load().then(function(result){
            if(result.get('id')){
                model.loggedIn = true;
            }
        });
        return model;
    }
});
