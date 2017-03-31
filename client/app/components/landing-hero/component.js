import Ember from 'ember';

export default Ember.Component.extend({
    data: Ember.computed('layout', function(){
        let dataSource = this.get('layout.data');
        return this.get('model.settings').data[dataSource];
    }),
    searchQuery: '',
    actions: {
        search(){
            this.get('changeRoute')('collection.search');
        }
    },
    containerStyle: Ember.computed('branding.colors', function() {
       return Ember.String.htmlSafe("background-color: " + this.get('branding.colors.background') + "; color: " + this.get('branding.colors.backgroundText'));
   }),
   logoStyle: Ember.computed('branding.logo', function() {
      return Ember.String.htmlSafe("background: url(" + this.get('branding.logo.url') + ") center no-repeat; height: " + this.get('branding.logo.height'));
    })
});
