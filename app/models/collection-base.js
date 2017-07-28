import DS from 'ember-data';

const {
    Model,
    attr,
    hasMany,
    belongsTo,
} = DS;

export default Model.extend({
    title: attr('string'),
    description: attr('string'),
    tags: attr('string'),
    dateCreated: attr('date'),
    dateUpdated: attr('date'),
    settings: attr(),
    createdBy: belongsTo('user'),
    groups: hasMany('group'),
    items: hasMany('item'),
    groupsComputed: Ember.computed('groups', function() {
        const groups = this.get('groups');
        groups.forEach(function(group) {
            group.set('type', 'group');
        });
        return groups;
    }),
    list: Ember.computed.union('groupsComputed', 'items')
});
