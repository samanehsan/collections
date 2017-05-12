import Ember from 'ember';

export default Ember.Controller.extend({
    addMethod: 'select', // 'select' or 'create'
    methodSelected: false,
    type: Ember.computed('model.settings', function() {
        var collectionType = this.get('model.settings.collectionType') || 'project';
        return collectionType.toLowerCase();
    }),

    widgets: [],

    create_widget: function(parameters) {
        alert('action fired');
        return parameters;
    },

    updateWidgets: Ember.observer('state', function() {
        this.get('actions').forEach((action) => {

            // check if the action can fire.
            console.log(action);
            action.conditions;
            // action may fire
            var return_value = this.get(action.type)(action.parameters);
            console.log(return_value);
            if (action.type === 'create_widget') {
                let wdgs =  this.get('widgets');
                wdgs.pushObject(return_value);
                console.log(wdgs);
            }
        });
    }),

    actions: {
        updateProperty(oldValue, newValue) {
            this.set(oldValue, newValue);
            this.set('methodSelected', true); // Change view to show the methods
        },
        transition(name, id) {
            this.transitionToRoute(name, id);
        }
    }
});
