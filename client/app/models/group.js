import DS from 'ember-data';

export default DS.Model.extend({
    title: DS.attr('string'),
    description: DS.attr('string'),
    collection: DS.belongsTo('collection'),
    tags: DS.attr('string'),
    created_by: DS.attr('number'),
    dateCreated: DS.attr('date'),
    dateUpdated: DS.attr('date')
});
