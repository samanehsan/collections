import Ember from 'ember';

// Format dates to be readable
function formatDate(obj){
    let dateCreated = new Date(obj.get('dateCreated'));
    obj.set('dateCreatedReadable', dateCreated.toDateString());
    let dateUpdated = new Date(obj.get('dateUpdated'));
    obj.set('dateUpdatedReadable', dateUpdated.toDateString());
    return obj;
}

export {formatDate};
