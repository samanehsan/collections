import DS from 'ember-data';
import config from '../config/environment';


var getToken = function() {
    var token = JSON.parse(window.localStorage['ember_simple_auth-session'])['authenticated'];
    if ('attributes' in token) {
        return token['attributes']['accessToken'];
    }
    return token;
};

$.ajaxSetup({
  xhrFields: {
    withCredentials: true
  }
});


export default DS.JSONAPIAdapter.extend({
    host: 'http://127.0.0.1:8000',
    namespace: 'api',
    headers :{
        'Authorization': getToken()
    }
});
