import Ember from 'ember';

export default Ember.Controller.extend({
    breadCrumb: Ember.computed("model.title", {
        get() {
          return this.get("model.title");
        }
      })
});
