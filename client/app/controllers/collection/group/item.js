import Ember from 'ember';

export default Ember.Controller.extend({
    breadCrumb: Ember.computed("model.title", function (){
          return this.get("model.title");
      })
});
