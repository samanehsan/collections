import Ember from 'ember';

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
    items2: [
        [
            {
                title: "item1",
                description: "description1"
            },
            {
                title: "item2",
                description: "description2"
            }
        ]
    ]
});
