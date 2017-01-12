import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('index', {path : '/'});
  this.route('collection', {path : '/collection/:collection_id'}, function() {
    this.route('item', {path : '/item/:item_id'});
  });
});

export default Router;
