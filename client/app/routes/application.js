import Ember from 'ember';

import OsfTokenLoginRouteMixin from 'ember-osf/mixins/osf-token-login-route';

export default Ember.Route.extend(OsfTokenLoginRouteMixin, {
    session: Ember.inject.service(),
    model(){
        let model = {};
        model.authenticated =  this.get('session.isAuthenticated');
        return model;
    }
});
