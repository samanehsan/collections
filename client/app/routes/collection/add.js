import Ember from 'ember';


export default Ember.Route.extend({
    panelActions: Ember.inject.service('panelActions'),
    model() {
        return {
            submission_form_name: 'Preprints Submission Form',
            sections: [
              {name: 'upload', divId: 'preprint-form-upload', param: 'upload_section'},
              {name: 'disciplines', divId: 'preprint-form-subjects', param: 'disciplines_section'},
              {name: 'basic info', divId: 'preprint-form-basics', param: 'basic_info_section'},
              {name: 'authors', divId: 'preprint-form-authors', param: 'authors_section'},
              {name: 'submit', divId: 'preprint-form-submit', param: 'submit_button'}
            ],
            initial_parameters: {
                upload_section: {
                    state: ['unsaved', 'editing'],
                    allowOpen: true,
                    open: true,
                    value: undefined
                },
                disciplines_section: {
                    state: ['disabled'],
                    allowOpen: true,
                    open: false,
                    value: undefined
                },
                basic_info_section: {
                    state: ['disabled'],
                    allowOpen: true,
                    open: false,
                    value: undefined
                },
                authors_section: {
                    state:  ['disabled'],
                    allowOpen: true,
                    open: false,
                    value: undefined
                },
                submit_button: {
                    state: ['disabled'],
                    allowOpen: true,
                    open: false,
                    value: undefined
                },
                preprint_file_upload_widget: {
                    state: ['undefined'],
                    value: undefined
                },
                preprint_title_widget: {
                    state: ['undefined'],
                    value: undefined
                },
                save_upload_section_widget: {
                    state: ['undefined'],
                    value: undefined
                },
                subject_picker_widget: {
                    state: ['undefined'],
                    value: undefined
                },
                basic_info_widget: {
                    state: ['undefined'],
                    value: undefined
                }
            },
            initial_widgets: [],
            actions: [{
                id: '5db3456b-cef7-4c87-bb60-16a04ee89bad',
                type: 'upload_file',
                parameters: {
                    file_data: 'preprint_file_data',
                    file_name: 'preprint_file_name',
                    node: 'preprint_node'
                },
                output_parameter: 'preprint_file_url',
            }, {
                type: 'create_widget',
                args: {
                    widget_component: 'file-uploader',
                    description: 'Choose the preprint file to upload',
                    section: 'upload',
                },
                parameters: {
                    output_parameter: 'preprint_file_data'
                },
                output_parameter: 'preprint_file_upload_widget',
                conditions: [{
                    all: [{
                        parameter: 'upload_section',
                        state: 'unsaved',
                    }, {
                        parameter: 'preprint_file_upload_widget',
                        state: 'undefined'
                    }]
                }]
            }, {
                type: 'create_widget',
                args: {
                    widget_component: 'text-field',
                    description: 'Enter the title for this preprint',
                    section: 'upload',
                },
                parameters: {
                    output_parameter: 'preprint_file_name'
                },
                output_parameter: 'preprint_title_widget',
                conditions: [{
                    all: [{
                        parameter: 'preprint_title_widget',
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
                args: {
                    widget_component: 'button-widget',
                    description: 'Save this section',
                    section: 'upload',
                    action_id: '5db3456b-cef7-4c87-bb60-16a04ee89bad'
                },
                parameters: {
                    output_parameter: 'preprint_file_url',
                },
                output_parameter: 'save_upload_section_widget',
                conditions: [{
                    all: [{
                        parameter: 'save_upload_section_widget',
                        state: 'undefined',
                    }, {
                        parameter: 'preprint_file_data',
                        state: 'defined',
                    }, {
                        parameter: 'preprint_file_name',
                        state: 'defined'
                    }, {
                        parameter: 'upload_section',
                        state: 'editing',
                    }],
                }]
            }, {
                type: 'create_widget',
                args: {
                    widget_component: 'subject-picker',
                    description: 'Save this section',
                    section: 'disciplines'
                },
                parameters: {
                    output_parameter: 'selected_subjects'
                },
                output_parameter: 'subject_picker_widget',
                conditions: [{
                    all: [{
                        parameter: 'subject_picker_widget',
                        state: 'undefined'
                    }]
                }]
            },{
                type: 'create_widget',
                args: {
                    widget_component: 'preprint-basics',
                    description: 'License and other things',
                    section: 'basic info'
                },
                parameters: {
                    output_parameter: 'basic_info'
                },
                output_parameter: 'basic_info_widget',
                conditions: [{
                    all: [{
                        parameter: 'basic_info_widget',
                        state: 'undefined'
                    }]
                }]
            }]
        };
    },

    setupController(controller, model) {

        // Set up state defined on the model.
        controller.set('sections', model.sections);
        controller.set('parameters', model.initial_parameters);

        // Hydrate actions in preperation for engine ignition
        const actions = model.actions.map(controller.hydrate_action.bind(controller));
        controller.set('formActions', actions);

        // Start the engine.
        controller.updateState.call(controller, actions);

    }

});
