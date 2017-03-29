import Ember from 'ember';

export default Ember.Component.extend({
    buttonStyle: Ember.computed('branding.colors', function() {
       //var bgcolor = escapeCSS(this.get('branding.colors.primary'));
       return Ember.String.htmlSafe("background-color: " + this.get('branding.colors.primary'));
     })
});
