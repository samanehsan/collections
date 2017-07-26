import Ember from 'ember';
import _ from 'lodash';

export default Ember.Component.extend({
    session: Ember.inject.service(),
    store: Ember.inject.service(),
    data: Ember.computed('layout', function () {
        const dataSource = this.get('layout.data');
        return this.get('model.settings').data[dataSource];
    }),
    filterString: "",
    items: Ember.computed('model', function () {
        // fetches the items, sorts them into buckets by start time, returns them as a list
        return this.get('model.items').then((results) => {
            let tempList = [];
            results.forEach(function (i) {
                tempList.push(i);
            });
            let tempItems = tempList.sort(function (a, b) {
                if (a.get('startTime') === b.get('startTime')) {
                    if (a.get('endTime') === b.get('endTime')) {
                        return a.get('location') - b.get('location');
                    }
                    else {
                        return a.get('endTime') - b.get('endTime');
                    }
                }
                else {
                    return a.get('startTime') - b.get('startTime');
                }
            });
            // Archived!!!:
            let retList = [];
            tempItems.forEach(function (i) {
                if (retList.length == 0) {
                    retList.push([i]);
                }
                else if (retList[retList.length - 1][0].get('startTime').toISOString() === i.get('startTime').toISOString()) {
                    retList[retList.length - 1].push(i);
                }
                else {
                    retList.push([i]);
                }
            });
            return retList;
        });
    }),
    rooms: Ember.computed('model', function () {
        return this.get('model.items').then((results) => {
            let roomsList = [];
            results.forEach(function (i) {
                roomsList.push(i.get('location'));
            });
            return _.uniq(roomsList);
        });
    }),
    tracks: Ember.computed('model', function () {
        return this.get('model.items').then((results) => {
            let tracksList = [];
            results.forEach(function (i) {
                if (i.get('track')) {
                    tracksList.push(i.get('track'));
                }
            });
            return _.uniq(tracksList);
        });
    }),
    trackFilter: "",
    roomFilter: "",
    selectedItem: Ember.computed('selectedItemId', 'model', function() {
        let id = parseInt(this.get('selectedItemId'));
        if (id >= 0) {
            return this.get('store').findRecord('item', id).then((i) => {
                return i;
            });
        }
    }),
    selectedItemId: Ember.computed(function () {
        // return this.get('model.items').then((results) => {
        //     console.log(results.get('firstObject.id'));
        //     return results.get('firstObject.id');
        // });
        return 2;
    })
});
