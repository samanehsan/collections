import Ember from 'ember';

import OsfTokenLoginRouteMixin from 'ember-osf/mixins/osf-token-login-route';

export default Ember.Route.extend(OsfTokenLoginRouteMixin, {

    model() {
        //if (this.get('session.isAuthenticated')) {
        //    return this.store.findRecord('user', 'me').then(function(data) {
        //        return data;
        //    });
        //}
    }

});
