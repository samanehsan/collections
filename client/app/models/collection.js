import DS from 'ember-data';

export default DS.Model.extend({
    title: DS.attr('string'),
    description: DS.attr('string'),
    tags: DS.attr('string'),
    created_by: DS.attr('number'),
    dateCreated: DS.attr('date'),
    dateUpdated: DS.attr('date'),
    groups: DS.hasMany('group'),
    items: DS.hasMany('items')
});
