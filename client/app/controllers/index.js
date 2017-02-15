import Ember from 'ember';

export default Ember.Controller.extend({
    newCollectionTitle: '',
    modelCache : null,
    filterText : '',
    actions : {
        filter () {
            let model = this.get('model');
            let text = this.get('filterText').toLowerCase();
            if(this.get('modelCache') === null){
                this.set('modelCache', model);
            }
            this.set('model', this.get('modelCache').filter(function(item){
                return item.get('title').includes(text);
            }));
        },
        addCollection () {

            let coll = {
                title: this.get('newCollectionTitle'),
                tags: '',
                description: '',
                createdBy: 'Marcia Gonzales',
                dateCreated:  new Date(),
                dateUpdated: new Date(),
                items: []
            };
            $.post('/api/collections', coll).then(result => {
                 console.log('returned', result);
                 this.transitionToRoute('/collection/' + result.data.id);
               });


        }

    }
});
