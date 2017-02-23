import Ember from 'ember';

export default Ember.Component.extend({
    addActive: 'node',
    actions: {
        setActive(mode){
            this.set('addActive', mode);
        }
    }
});
