import Application from './application';

export default Application.extend({
    buildURL(collection, id, snapshot, requestType) {
        let collectionId = snapshot.record.belongsTo('collection').parent._id;
        return this.get('host') + '/api/collections/' + collectionId + '/groups/' + id + '/';
    }
});
