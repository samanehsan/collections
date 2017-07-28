import Ember from 'ember';

export default Ember.Component.extend({
    session: Ember.inject.service(),
    data: Ember.computed('layout', function() {
        const dataSource = this.get('layout.data');
        return this.get('model.settings').data[dataSource];
    }),
    actions: {
    },
    containerStyle: Ember.computed('layout', 'branding', function() {
        // if image is specified for background, use that
        // otherwise, check if a background color has been specified.
            // if so, use that. if not, use the branding background color
        // if text color is specified, use that. otherwise, use branding text color
        let bgColor = this.get('layout.background_color') ? this.get('layout.background_color') : this.get('branding.colors.background');
        let bgImage = this.get('layout.img_url');
        let bg = bgImage ? "background:url(" + bgImage + ") no-repeat left center; background-size: cover;" : "background-color:" + bgColor + ";";
        let textColor = this.get('layout.text_color') ? this.get('layout.text_color') : this.get('branding.colors.text');
        textColor = "color:" + textColor + ";";
        return Ember.String.htmlSafe(bg + textColor);
    }),
    titleColor: Ember.computed('layout', function() {
        return Ember.String.htmlSafe(this.get('layout.title_color') ? `color: ${this.get('layout.title_color')};` : "");
    }),
    taglineColor: Ember.computed('layout', function() {
        return Ember.String.htmlSafe(this.get('layout.tagline_color') ? `color: ${this.get('layout.tagline_color')};` : "");
    }),
    logoStyle: Ember.computed('branding.logo', function() {
        return Ember.String.htmlSafe(`background-image: url(${this.get('branding.logo.url')}); height: ${this.get('branding.logo.height')}`);
    }),
});
