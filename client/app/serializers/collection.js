import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
    normalizeResponse(store, primaryModelClass, payload, id, requestType) {

        if(Array.isArray(payload.data)){
            payload.data.forEach(function(collection){
              collection.attributes.settings = JSON.parse(collection.attributes.settings);
            });
        } else {
            payload.data.attributes.settings = JSON.parse(payload.data.attributes.settings);
        }
        return this._super(...arguments);
    }
});
