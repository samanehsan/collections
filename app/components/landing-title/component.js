import Ember from 'ember';

export default Ember.Component.extend({
    session: Ember.inject.service(),
    data: Ember.computed('layout', function() {
        const dataSource = this.get('layout.data');
        return this.get('model.settings').data[dataSource];
    }),
    actions: {
    },
    containerStyle: Ember.computed('branding', 'layout', function() {
        let bgColor = "";
        let textColor = "";
        if (!(this.get('layout.background_color'))) {
            bgColor = this.get('branding.background_color');
        } else {
            bgColor = this.get('layout.background_color');
        }
        if (!(this.get('layout.text-color'))) {
            textColor = this.get('branding.text_color');
        } else {
            textColor = this.get('layout.text_color');
        }
        return Ember.String.htmlSafe(`background-color: ${bgColor}; color: ${textColor}`);
    }),
    titleColor: Ember.computed('layout', function() {
        if (!(this.get('layout.title_color'))) {
            return Ember.String.htmlSafe(`color: ${this.get('layout.title_color')};`);
        }
        else {return Ember.String.htmlSafe(`color: ${this.get('layout.title_color')};`);}
    }),
    taglineColor: Ember.computed('layout', function() {
        if (!(this.get('layout.tagline_color'))) {
            return Ember.String.htmlSafe(`color: ${this.get('layout.tagline_color')};`);
        }
        else {return Ember.String.htmlSafe(`color: ${this.get('layout.tagline_color')};`);}    }),
    logoStyle: Ember.computed('branding.logo', function() {
        return Ember.String.htmlSafe(`background-image: url(${this.get('branding.logo.url')}); height: ${this.get('branding.logo.height')}`);
    }),
});
