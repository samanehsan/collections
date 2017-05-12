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

            function condition_dispatcher(condition) {

                console.log('Checking Condition');
                console.log('condition.parameter: ' + condition.parameter);
                console.log('condition.state: ' + condition.state);

                // Check if its a regular condition
                if (condition.parameter !== undefined &&
                    typeof condition.state === 'array'
                ) {
                    // actualy check the condition is met;
                    // the parameter has to have the given state.
                    return this.get('state.' + condition.parameter).state
                        // check that the state exists for this item
                        .some((state_item) => state_item === condition.state)
                }

                // Check if its an 'all' composite condition
                if (condition.all !== undefined &&
                    typeof condition.all === 'array'
                ) {
                    // if any conditions fail, the whole check fails.
                    return check_all(condition.all);
                }

                // Check if its an 'any' composite condition
                if (condition.any !== undefined &&
                    typeof condition.any === 'array'
                ) {
                    // if any conditions are met, the whole check passes.
                    return check_any(condition.any);
                }

                // Check if its a 'none' composite condition
                if (condition.none !== undefined &&
                    typeof condition.none ==='array'
                ) {
                    // if any conditions are met, the whole check fails.
                    return !check_any(condition.none);
                }

            }

            function check_all(conditions) {
                console.log(conditions);
                // if any conditions fail, the whole check fails.
                return !action.conditions.some((condition) => !condition_dispatcher(condition));
            }

            function check_any(conditions) {
                // if any conditions are met, the whole check passes.
                return action.conditions.some(condition_dispatcher)
            }

            // check if the action can fire.
            console.log('Checking if action can fire.');
            const may_fire = check_all(action.conditions);

            if (!may_fire) { return; }

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
