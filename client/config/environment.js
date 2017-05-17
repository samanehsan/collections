/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'collections',
    environment: environment,
    rootURL: '/',
    apiBaseUrl: 'http://localhost:8000',
    osfHostUrl: 'http://localhost:8000',
    csrfCookie: 'csrftoken',
    locationType: 'auto',
    authorizationType: 'token',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
      usingCors: true,
      corsWithCreds: true,
      apiURL: 'http://localhost:8000/api'
    }
  };

  ENV.headerAuth = process.env.HEADER_AUTH;

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;

    ENV['osfHostUrl'] = 'https://staging-api.osf.io';
    ENV['ember-cli-mirage'] = {
      enabled: false
    };
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'stage') {
    ENV['osfHostUrl'] = 'https://staging-api.osf.io';

  }
  if (environment === 'production') {
    ENV['osfHostUrl'] = 'https://api.osf.io';

  }

  ENV['simple-auth'] = {
    crossOriginWhitelist: [ENV.APP.apiURL]
  };

  return ENV;
};
