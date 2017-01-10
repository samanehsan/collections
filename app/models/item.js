import DS from 'ember-data';

export default DS.Model.extend({
    type: DS.attr('string'),
    identifier: DS.attr('string'),
    metadata: DS.attr('string'),
    url: DS.attr('string'),
    isDisplayed: DS.attr('boolean'),
    dateAdded: DS.attr('date'),
    collection: DS.belongsTo('collection')
});
