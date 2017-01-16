export default function() {
    this.namespace = 'api';

    this.get('/collections', (schema, request) => {
      return schema.collections.all();
    });
}
