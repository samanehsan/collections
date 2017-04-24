import Ember from 'ember';


export default Ember.Route.extend({
    session: Ember.inject.service(),
    model(){
        let model = {};
        model.authenticated =  this.get('session.isAuthenticated');
        return model;
    }
});
