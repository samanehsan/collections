import Ember from 'ember';

export default Ember.Component.extend({

    listColumns: Ember.computed('componentSettings.data', function() {
        let column = {};
        let list = this.get('componentSettings.data');
        let splitIndex = Math.round(list.length/2);
        column.left = list.splice(0,splitIndex);
        column.right = list;
       return column;
     })
});
