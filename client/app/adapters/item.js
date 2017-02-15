import Application from './application';

export default Application.extend({
    buildURL(_, __, ___, requestType) {
        // Embed linked_nodes
        return this.get('host') + '/api/collections/' + ___.record.get('collection').get('id') + '/items/';
    }
});
