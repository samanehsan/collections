import Ember from 'ember';

export default Ember.Component.extend({
    containerStyle: Ember.computed('layout', function() {
        return Ember.String.htmlSafe(`background-color: ${this.get('layout.background_color')}; color: ${this.get('layout.settings.text_color')}`);
    }),
    data: Ember.computed('layout', function() {
        const dataSource = this.get('layout.data');
        return this.get('model.settings').data[dataSource];
    })
});
