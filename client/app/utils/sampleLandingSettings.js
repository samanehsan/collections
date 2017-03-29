let collectionSettings = {
    branding : {
        colors: {
            primary: '#ffffff',
            secondary: '#eeeeee'
        },
        logo: {
            text: 'Some Service',
            url: '/images/logo.png'
        }
    },
    landingComponents: [
        {
            type: 'landing-hero'
        },
        {
            type: 'landing-list', // Corresponds to a component name in the app. Component expects data to fit it's template
            title: 'Subjects',
            data: ['Biology', 'Geology']
        },
        {
            type:  'landing-board',
            title: 'Board of this Service',
            data: [
                {firstName: 'Donna', lastName: 'Brown'},
                {firstName: 'Maria', lastName: 'Gonzales'},
                {firstName: 'George', lastName: 'Wu'}
            ]
        },
        {
            type: 'landing-copyright',
            links: [
                {
                    label: 'Support',
                    url: '/support'
                },
                {
                    label: 'Contact',
                    url: '/contact'
                },
                {
                    label: 'Twitter',
                    url: '/twitter/somearchive',
                    icon: 'fa-twitter'
                }
            ]
        }

    ]
};

export {collectionSettings};
