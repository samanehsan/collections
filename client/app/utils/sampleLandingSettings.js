let collectionSettings = {
  branding: {
    colors: {
      primary: '#215264',
      secondary: '#eeeeee',
      background: '#e14b5a',
      backgroundText: '#ffffff'
    },
    logo: {
      label: 'socarxiv',
      url: 'https://osf.io/preprints/assets/img/provider_logos/socarxiv-small-8bb4e49d8c3bb92a90798039fd604ca680235083.png',
      height: '140px'
    }
  },
  landingComponents: [{
      type: 'landing-hero',
      title: 'You can override collection title here',
      tagline: 'Open archive of the social sciences',
      useLogo: true
    },
    {
      type: 'landing-list', // Corresponds to a component name in the app. Component expects data to fit it's template
      title: 'Subjects',
      data: [{
          name: 'Arts and Humanities',
          label: 'Fine Arts, History, Music, Philosophy, Religion',
          link: '/preprints/socarxiv/discover?subject=Arts%20and%20Humanities'
        },
        {
          name: 'Arts and Humanities',
          label: 'Fine Arts, History, Music, Philosophy, Religion',
          link: '/preprints/socarxiv/discover?subject=Arts%20and%20Humanities'
        },
        {
          name: 'Arts and Humanities',
          label: 'Fine Arts, History, Music, Philosophy, Religion',
          link: '/preprints/socarxiv/discover?subject=Arts%20and%20Humanities'
        },
        {
          name: 'Arts and Humanities',
          label: 'Fine Arts, History, Music, Philosophy, Religion',
          link: '/preprints/socarxiv/discover?subject=Arts%20and%20Humanities'
        },
      ]
    },
    {
      type: 'landing-board',
      title: 'Steering Committee',
      data: [{
        firstName: 'Donna',
        lastName: 'Brown',
        institution: 'Massachusetts Institute of Technology'
      }, {
        firstName: 'Maria',
        lastName: 'Gonzales',
        institution: 'University of North Carolina at Chapel Hill'
      }, {
        firstName: 'George',
        lastName: 'Wu',
        institution: 'Massachusetts Institute of Technology'
      }, {
        firstName: 'Donna',
        lastName: 'Brown',
        institution: 'University of Maryland, College Park'
      }, {
        firstName: 'Maria',
        lastName: 'Gonzales',
        institution: 'University of North Carolina at Chapel Hill'
      }, {
        firstName: 'George',
        lastName: 'Wu',
        institution: 'University of Maryland, College Park'
      }, {
        firstName: 'Maria',
        lastName: 'Gonzales',
        institution: 'University of North Carolina at Chapel Hill'
      }, {
        firstName: 'Maria',
        lastName: 'Gonzales',
        institution: 'University of North Carolina at Chapel Hill'
      }, {
        firstName: 'George',
        lastName: 'Wu',
        institution: 'University of Maryland, College Park'
      }, {
        firstName: 'Maria',
        lastName: 'Gonzales',
        institution: 'University of North Carolina at Chapel Hill'
      }, {
        firstName: 'Maria',
        lastName: 'Gonzales',
        institution: 'University of North Carolina at Chapel Hill'
      }, {
        firstName: 'George',
        lastName: 'Wu',
        institution: 'University of Maryland, College Park'
      }, {
        firstName: 'Maria',
        lastName: 'Gonzales',
        institution: 'University of North Carolina at Chapel Hill'
      }, ]
    },
    {
      type: 'landing-copyright',
      data: [{
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

export {
  collectionSettings
};
