import Ember from 'ember';
import moment from 'moment';

export default Ember.Component.extend({
    meetingDates: Ember.computed('model.startDate', function() {
        const startDate = this.get('model.startDate');
        const endDate = this.get('model.endDate');
        if (moment(startDate).format("MM D YY") === moment(endDate).format("MM D YY")) {
            return moment(startDate).format("MMMM D");
        }
        return moment(startDate).format("MMMM D") + ' - ' + moment(endDate).format("MMMM D")
    })
});
