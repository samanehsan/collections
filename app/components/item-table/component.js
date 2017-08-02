import Ember from 'ember';
import _ from 'lodash';

export default Ember.Component.extend({
    theadStyle: Ember.computed('layout', function() {
        const headerColor = this.get('layout.header_color') ? this.get('layout.header_color') : this.get('branding.colors.primary');
        const textColor = this.get('layout.text_color') ? this.get('layout.text_color') : this.get('branding.colors.text');
        return Ember.String.htmlSafe(`background-color: ${headerColor}; color: ${textColor};`);
    }),
    filterString: "",
    eventFilter: "",
    eventTypes: Ember.computed('model', function () {
        return this.get('model.items').then((results) => {
            let eventsList = [];
            results.forEach(function (i) {
                eventsList.push(i.get('type'));
            });
            return _.uniq(eventsList).sort();
        });
    })
});
