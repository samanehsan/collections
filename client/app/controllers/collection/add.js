import Ember from 'ember';

// Helper function to determine if discipline has changed (comparing list of lists)
function disciplineArraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; ++i) {
        if (a[i].length !== b[i].length) return false;
        for (let j = 0; j < a[i].length; ++j) {
            if (a[i][j] !== b[i][j]) return false;
        }
    }
    return true;
}

function subjectIdMap(subjectArray) {
    // Maps array of arrays of disciplines into array of arrays of discipline ids.
    return subjectArray.map(subjectBlock => subjectBlock.map(subject => subject.id));
}

export default Ember.Controller.extend({
    addMethod: 'select', // 'select' or 'create'
    methodSelected: false,
    type: Ember.computed('model.settings', function() {
        var collectionType = this.get('model.settings.collectionType') || 'project';
        return collectionType.toLowerCase();
    }),
    editMode: false,
    disciplineModifiedToggle: false,
    disciplineChanged: true,
    subjectsList: ['Math', 'Science'],
    actions:{
        updateProperty(oldValue, newValue){
            this.set(oldValue, newValue);
            this.set('methodSelected', true); // Change view to show the methods
        },
        transition(name, id){
            this.transitionToRoute(name, id);
        },
        updateData(data, componentName) {
          // Update section data
          console.log(data);
          this.set('subjectsList', data);
          this.toggleProperty('disciplineModifiedToggle');
          this.get('model').values[componentName] = data;
        },
        save() {
            // TODO: Save the collection model
            let model = this.get('model');
            //model.save();
        }
    }
});
