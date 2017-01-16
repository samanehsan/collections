import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  title: faker.lorem.words(),
  description: faker.lorem.sentences(),
  tags : faker.lorem.words().split(' '),
  dateCreated : faker.date.past(),
  dateUpdated : faker.date.past(),
  items : []
});
