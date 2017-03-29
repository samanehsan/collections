import Ember from 'ember';
import sampleLanding from 'collections/utils/sampleLandingSettings';

export default Ember.Route.extend({
  model (params) {
        return this.store.findRecord('collection', params.collection_id).then(data => {
            data.landingSettings = sampleLanding.collectionSettings;
            return data;
        }).catch( () => {
            this.transitionTo('/not-found');
        });
    }
});
