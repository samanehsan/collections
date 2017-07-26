import Ember from 'ember';

export default Ember.Component.extend({
    session: Ember.inject.service(),
    data: Ember.computed('layout', function() {
        const dataSource = this.get('layout.data');
        return this.get('model.settings').data[dataSource];
    }),
    actions: {
    },
    containerStyle: Ember.computed('branding.colors', function() {
        return Ember.String.htmlSafe(`background-color: ${this.get('branding.colors.background')}; color: ${this.get('branding.colors.backgroundText')}`);
    }),
    titleColor: Ember.computed('layout', function() {
        return Ember.String.htmlSafe(`color: ${this.get('layout.settings.titlecolor')};`);
    }),
    taglineColor: Ember.computed('layout', function() {
        return Ember.String.htmlSafe(`color: ${this.get('layout.settings.taglinecolor')};`);
    }),
    logoStyle: Ember.computed('branding.logo', function() {
        return Ember.String.htmlSafe(`background-image: url(${this.get('branding.logo.url')}); height: ${this.get('branding.logo.height')}`);
    }),
});
