import DS from 'ember-data';
import CollectionBaseModel from './collection-base';


export default CollectionBaseModel.extend({
    location: DS.attr('string'),
    startTime: DS.attr('date'),
    endTime: DS.attr('date'),
    category: DS.attr('string')
});
