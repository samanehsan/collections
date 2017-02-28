import DS from 'ember-data';
import config from '../config/environment';


function getToken() {
    var token, session;
    if (session = window.localStorage['ember_simple_auth:session']) {
        token = JSON.parse(session)['authenticated'];
        if ('attributes' in token) {
            return token['attributes']['accessToken'];
        }
        return token;
    }
};

export default DS.JSONAPIAdapter.extend({

    host: 'http://127.0.0.1:8000',
    namespace: 'api',
    headers: Ember.computed(function() {
        return {
            "AUTHORIZATION": getToken()
        };
    }).volatile()

});
