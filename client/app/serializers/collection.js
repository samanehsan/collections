import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  normalizeFindRecordResponse(store, type, payload) {
    // TODO: Fix format in API instead of here
    var collectionID = payload['data']['id'];
    payload['data']['relationships']['groups'] = {
        meta: payload['data']['relationships']['groups']['meta'],
        links: payload['data']['relationships']['groups']['links']
    };
    payload['data']['relationships']['items'] = {
        links: payload['data']['relationships']['items']['links'] = {
           'related': '/api/collections/' + collectionID + '/items/'
        }
    };
    return this._super(...arguments);
  }
});
