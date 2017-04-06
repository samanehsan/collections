import Ember from 'ember';

export default Ember.Component.extend({
    tagName: null,
    classNameBindings: ['rowSelected:item-row-selected'],
    cardView: true,
    item: null,
    selected: false,
    rowSelected: Ember.computed('organizeMode', 'selected', function(){
        return this.get('organizeMode') ? this.get('selected') : false;
    }),
    actions : {
        markSelected (item) {
            this.toggleProperty('selected');
            this.sendAction('toggleSelectedList', this.get('selected'), item);
        }
    }
});
