import Ember from 'ember';

export default Ember.Component.extend({
    item: null,
    isGroup: Ember.computed(function() {
       var type = this.get('item').get('type');
       return !type;
    }),
    type: Ember.computed(function() {
        var item = this.get('item');
        var type = item.get('type');
        return type ? type : 'group'
    }),
    selected: false,
    actions : {
        markSelected (item) {
            this.toggleProperty('selected');
            this.get('toggleSelectedList')(this.get('selected'), item);
        }
    }
});
