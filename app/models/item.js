import DS from 'ember-data';
import Ember from 'ember';
import moment from 'moment';

const {
    Model,
    attr,
    belongsTo,
} = DS;

export default Model.extend({
    source_id: attr('string'),
    title: attr('string'),
    description: attr('string'),
    type: attr('string'),
    status: attr('string'),
    url: attr('string'),
    metadata: attr('string'),
    dateAdded: attr('date'),
    dateUpdated: attr('date'),
    collection: belongsTo('collection-base'),
    group: belongsTo('group'),
    createdBy: belongsTo('user'),
    location: attr('string'),
    startTime: attr('date'),
    endTime: attr('date'),
    startTimeFormatted: Ember.computed('startTime', function () {
        let st = moment(this.get('startTime'));
        return st.format('h:mmA');
    }),
    endTimeFormatted: Ember.computed('startTime', function () {
        let st = moment(this.get('endTime'));
        return st.format('h:mmA');
    }),
    scheduleFilterText: Ember.computed('title', 'location', 'startTimeFormatted', 'userName', function () {
        return this.get('title') +
            this.get('location') + this.get('startTimeFormatted') + this.get('userName');
    })
});
