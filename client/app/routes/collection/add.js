import Ember from 'ember';

export default Ember.Route.extend({

    model() {
        return {
            submission_form_name: 'Preprints Submission Form',
            sections: [
                'upload',
                'disciplines',
                'basic info',
                'authors',
                'submit'
            ],
            initial_state: {
                upload_section: {
                    state: ['unsaved', 'editing'],
                    value: undefined
                },
                disciplines_section: {
                    state: ['disabled'],
                    value: undefined
                },
                basic_info_section: {
                    state: ['disabled'],
                    value: undefined
                },
                authors_section: {
                    state:  ['disabled'],
                    value: undefined
                },
                submit_button: {
                    state: ['disabled'],
                    value: undefined
                },
                preprint_file_upload_widget: {
                    state: ['undefined'],
                    value: undefined
                }
            },
            actions: [{
                type: 'create_widget',
                parameters: {
                    widget_component: 'text-field',
                    description: 'Enter the title for this preprint',
                    section: 'upload'
                },
                output: 'preprint_title_widget',
                conditions: [{
                    all: [{
                        parameter: 'preprint_file_upload_widget',
                        state: 'undefined',
                    }, {
                        parameter: 'preprint_file_data',
                        state: 'defined',
                    }, {
                        parameter: 'upload_section',
                        state: 'editing',
                    }],
                }]
            }, {
                type: 'create_widget',
                parameters: {
                    widget_component: 'file-uploader',
                    description: 'Choose the preprint file to upload',
                    section: 'upload',
                    output: 'preprint_file_data'
                },
                output: 'preprint_file_upload_widget',
                conditions: [{
                    all: [{
                        parameter: 'upload_section',
                        state: 'unsaved',
                    }, {
                        parameter: 'preprint_file_upload_widget',
                        state: 'undefined'
                    }]
                }]
            }]
        };
    },

    setupController(controller, model) {
        controller.set('form_config', model);
        controller.set('actions', model.actions);
        controller.set('sections', model.sections);
        controller.set('state', model.initial_state);
    }

});
