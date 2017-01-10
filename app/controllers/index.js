import Ember from 'ember';

export default Ember.Controller.extend({
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
                return item.title.includes(text);
            }));
        }
    }
});
