import Application from './application';

export default Application.extend({
    buildURL(_, __, ___, requestType) {
        var defaultUrl = this._super(...arguments);
        // Embed linked_nodes
        if(requestType === 'createRecord'){
            return this.get('host') + '/api/collections/' + ___.record.get('collection').get('id') + '/items/';
        }
        return defaultUrl + '/';
    }
});
