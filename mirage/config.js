export default function() {
    this.namespace = '/api';

    this.get('/collections', (schema, request) => {
      return schema.collections.all();
    });

    this.post('/collections', (schema, request) => {
    console.log('requesr', request, schema);
      return schema.collections.create();
    });

    this.get('/collections/:id', (schema, request) => {
      let collection = schema.collections.find(request.params.id);
      return collection;
    });
}
