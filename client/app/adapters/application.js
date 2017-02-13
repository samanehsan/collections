import DS from 'ember-data';
import config from '../config/environment';

export default DS.JSONAPIAdapter.extend({
    host: 'http://127.0.0.1:8000',
    namespace: 'api',
    headers :{
        'Authorization' : config.headerAuth
    }
});
