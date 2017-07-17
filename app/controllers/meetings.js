import Ember from 'ember';
import IndexController from './index';

export default IndexController.extend({
    actions: {
        loadMore() {
            this.set('loadingMore', true);
            this.store.query('meeting', {
                page: this.get('currentPage') + 1
            }).then((data) => {
                this.incrementProperty('currentPage');
                const currentModel = this.get('model').toArray();
                const arr = data.toArray();
                currentModel.pushObjects(arr);
                this.set('model', currentModel);
                this.set('loadingMore', false);
            });
        },
    }
});
