import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
    normalizeResponse(store, primaryModelClass, payload) {
        if(Array.isArray(payload.data)){
            payload.data.forEach(function(collection){
              collection.attributes.settings = JSON.parse(collection.attributes.settings);
            });
        } else {
            payload.data.attributes.settings = JSON.parse(payload.data.attributes.settings);
        }
        return this._super(...arguments);
    },
    serialize(){
        let json = this._super(...arguments);
        if(typeof json.data.attributes.settings !== 'string'){
            json.data.attributes.settings = JSON.stringify(json.data.attributes.settings);            
        }
        return json;
    }
});
