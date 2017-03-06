export default function() {
    this.namespace = '/api';

    this.get('/collections', (schema, request) => {
      return schema.collections.all();
    });

    this.post('/collections', (schema, request) => {
      let title = request.requestBody.split('&')[0].split('=')[1].split('+').join(' ');
      return schema.collections.create({
          title: title,
          dateCreated: new Date(),
          dateUpdated: new Date()
      });
    });

    this.get('/collections/:id', (schema, request) => {
      let collection = schema.collections.find(request.params.id);
      return collection;
    });
}
