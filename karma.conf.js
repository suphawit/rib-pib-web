// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', 'angular-cli'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-remap-istanbul'),
      require('karma-mocha-reporter'),
      require('angular-cli/plugins/karma'),
      require('karma-phantomjs-launcher'),
    ],
    
    files: [

      { pattern: 'node_modules/babel-polyfill/browser.js', instrument: false},
      { pattern: './src/test.ts', watched: true },


     
    ],
    preprocessors: {
    //  './src/**/**.spec.ts': ['angular-cli']
    './src/test.ts': ['angular-cli']
    },

      polyfill: ['Promise', 'fetch'],
    remapIstanbulReporter: {
      reports: {
        html: 'coverage',
        lcovonly: './coverage/coverage.lcov'
      }
    },
    angularCli: {
      config: './angular-cli.json',
      environment: 'dev'
    },
    reporters: [
      'mocha', 'karma-remap-istanbul'
    ],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false
  });
};
