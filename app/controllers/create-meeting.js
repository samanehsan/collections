import Ember from 'ember';


export default Ember.Controller.extend({
    title: '',
    selectedType: 'Meeting',
    description: '',
    location: '',
    startDate: null,
    endDate: null,
    actions: {
        addCollection () {
            const selectedType = this.get('selectedType');
            let meeting = this.store.createRecord('meeting', {
                    title: this.get('title'),
                    tags: '',
                    settings: {collectionType: selectedType},
                    description: this.get('description'),
                    location: this.get('location'),
                    startDate: this.get('startDate'),
                    endDate: this.get('endDate')
                });
            meeting.save().then((record) => {
                this.set('newCollectionTitle', '');
                this.transitionToRoute('collection', record);
            });
        }
    }
});
