import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
    normalizeResponse(store, primaryModelClass, payload, id, requestType) {
      payload.data.attributes.settings = JSON.parse(payload.data.attributes.settings);

      return this._super(...arguments);
    },
});
