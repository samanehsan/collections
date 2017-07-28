import DS from 'ember-data';
import CollectionBaseModel from './collection-base';


export default CollectionBaseModel.extend({
    location: DS.attr('string'),
    address: DS.attr('string'),
    startDate: DS.attr('date'),
    endDate: DS.attr('date'),
    category: DS.attr('string')
});
