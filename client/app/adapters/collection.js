import Application from './application';

export default Application.extend({
    buildURL(_, __, ___, requestType) {
        // Embed linked_nodes
        var base = this._super(...arguments);
        return `${base}/`;
    }
});
