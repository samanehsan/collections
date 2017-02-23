import Ember from 'ember';

export default Ember.Component.extend({
    addActive: 'add-project',
    actions: {
        setActive(mode){
            this.set('addActive', mode);
        }
    }
});
