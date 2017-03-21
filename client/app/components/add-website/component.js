import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),
    urlTitle: '',
    urlAddress: '',
    urlDescription: '',
    urlSaveErrors: null,
    clearInputs () {
        this.set('urlTitle', '');
        this.set('urlAddress', '');
        this.set('urlDescription', '');
    },
    actions:{
        addWebsite (){
            let self = this;
            let item = this.get('store').createRecord('item', {
                title: this.get('urlTitle'),
                type: 'website',
                metadata: this.get('urlDescription'),
                status: 'pending',
                url: this.get('urlAddress'),
                source_id: this.get('urlAddress'),
                collection : this.get('model')
            });
            item.save().then(function(){
                self.transitionToRoute('collection', self.get('model.id'));
            }).catch(function(error){
                self.set('urlSaveErrors', error.errors);
            });
            this.clearInputs();
        }
    }
});
