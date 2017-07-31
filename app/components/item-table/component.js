import Ember from 'ember';

export default Ember.Component.extend({
    theadStyle: Ember.computed('layout', function() {
        const headerColor = this.get('layout.header_color') ? this.get('layout.header_color') : this.get('branding.colors.primary');
        const textColor = this.get('layout.text_color') ? this.get('layout.text_color') : this.get('branding.colors.text');
        return Ember.String.htmlSafe(`background-color: ${headerColor}; color: ${textColor};`);
    })
});
