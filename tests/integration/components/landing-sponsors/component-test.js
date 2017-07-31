import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('landing-sponsors', 'Integration | Component | landing sponsors', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{landing-sponsors}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#landing-sponsors}}
      template block text
    {{/landing-sponsors}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
