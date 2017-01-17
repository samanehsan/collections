import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  title () {return faker.lorem.words();},
  description () { return faker.lorem.sentences();},
  tags () { return faker.lorem.words().split(' ');},
  createdBy () { return faker.name.firstName() + ' ' + faker.name.lastName();},
  dateCreated () { return faker.date.past();},
  dateUpdated () { return faker.date.past();},
  items : []
});
