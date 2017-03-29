import Application from './application';

export default Application.extend({
    buildURL() {
        // Embed linked_nodes
        var base = this._super(...arguments);
        return `${base}/`;
    }
});
