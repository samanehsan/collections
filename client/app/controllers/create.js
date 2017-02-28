import Ember from 'ember';

export default Ember.Controller.extend({
    typeList : Ember.A(['Project', 'Registration', 'Preprint', 'File', 'Meeting', 'Mixed']),
    title: '',
    selectedType: 'Preprint',
    description: '',
    actions : {
        addCollection () {
            let collection = this.store.createRecord('collection', {
                title: this.get('title'),
                tags: '',
                description: this.get('description')
            });
            collection.save().then(record => {
                this.set('newCollectionTitle', '');
                this.transitionToRoute('collection', record);
            }
            );
        },
        updateType (value){
            this.set('selectedType', value);
            console.log(this.get('selectedType'));
        }
    }
});
