import Ember from 'ember';

export default Ember.Controller.extend({
    addMethod: 'select', // 'select' or 'create'
    methodSelected: false,
    urlTitle: '',
    urlAddress: '',
    urlDescription: '',
    urlSaveErrors: null,
    clearInputs () {
        this.set('urlTitle', '');
        this.set('urlAddress', '');
    },
    actions:{
        updateProperty(oldValue, newValue){
            this.set(oldValue, newValue);
            this.set('methodSelected', true); // Change view to show the methods
        },
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
