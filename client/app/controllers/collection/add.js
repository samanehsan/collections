import Ember from 'ember';


export default Ember.Controller.extend({
    addMethod: 'select', // 'select' or 'create'
    methodSelected: false,
    type: Ember.computed('model.settings', function() {
        var collectionType = this.get('model.settings.collectionType') || 'project';
        return collectionType.toLowerCase();
    }),
    actions:{
        updateProperty(oldValue, newValue){
            this.set(oldValue, newValue);
            this.set('methodSelected', true); // Change view to show the methods
        },
        transition(name, id){
            this.transitionToRoute(name, id);
        },
        saveSubjects(currentSubjects, subjectMap, disciplineChanged) {
          // Update section data
          let model = this.get('model');
            // Current subjects saved so UI can be restored in case of failure
          let subjects = Ember.$.extend(true, [], subjectMap);
          if (disciplineChanged) {
              this.set('model.subjects', subjects);
              //model.save()
              //    .then(() => {
              //        this.send('next', this.get('_names.1'));
              //    })
              //    .catch(() => {
              //        model.set('subjects', currentSubjects);
              //        this.get('toast').error(this.get('i18n').t('submit.disciplines_error'));
              //    });
          }
          //else {
          //    this.send('next', this.get('_names.1'));
          //}
        }
    }
});
