import Ember from 'ember';

export default Ember.Component.extend({
    tagName: null,
    classNameBindings: ['selected:item-row-selected'],
    cardView: true,
    item: null,
    selected: false,
    actions : {
        markSelected (item) {
            this.toggleProperty('selected');
            this.sendAction('toggleSelectedList', this.get('selected'), item);
        }
    }
});
