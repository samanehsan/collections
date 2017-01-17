import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  title: faker.lorem.words(),
  description: undefined,
  tags : faker.lorem.words().split(' '),
  createdBy: faker.name.firstName() + ' ' + faker.name.lastName(),
  dateCreated : faker.date.past(),
  dateUpdated : faker.date.past(),
  items : []
});
