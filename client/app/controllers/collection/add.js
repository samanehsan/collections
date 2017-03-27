import Ember from 'ember';

export default Ember.Controller.extend({
    addMethod: 'select', // 'select' or 'create'
    methodSelected: false,
    type: Ember.computed('model.settings', function(){
        let type = this.get('model.settings.collectionType').toLowerCase();
        return  type === 'preprint' || type === 'project' ? 'node' : type;
    }),
    actions:{
        updateProperty(oldValue, newValue){
            this.set(oldValue, newValue);
            this.set('methodSelected', true); // Change view to show the methods
        },
        transition(name, id){
            this.transitionToRoute(name, id);
        }
    }
});
