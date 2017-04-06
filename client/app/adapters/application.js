import Ember from 'ember';
import DS from 'ember-data';

$.ajaxSetup({
  crossOrigin:true,
  xhrFields: {
    withCredentials: true
  }
});

function getToken() {
    var token;
    var session = window.localStorage['ember_simple_auth:session'];
    if (session) {
        token = JSON.parse(session)['authenticated'];
        if ('attributes' in token) {
            return token['attributes']['accessToken'];
        }
        return token;
    }
}

export default DS.JSONAPIAdapter.extend({

    host: 'http://localhost:8001',
    namespace: 'api',
    headers: Ember.computed(function() {
        return {
            "AUTHORIZATION": getToken()
        };
    }).volatile()

});
