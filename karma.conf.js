module.exports = function(config) {
  config.set({
    browsers: ['PhantomJS'],

    singleRun: !!process.env.CI,

    frameworks: ['mocha', 'chai'],

    files: [
    ],

    client: {
      mocha: {
        reporter: 'html'
      }
    },

    preprocessors: {},

    reporters: ['mocha'],

    plugins: [
      require('karma-webpack'),
      require('karma-chai'),
      require('karma-mocha'),
      require('karma-mocha-reporter'),
      require('karma-phantomjs-launcher'),
      require('karma-sourcemap-loader')
    ],

    webpack: require('./webpack/webpack.test'),

    webpackServer: {
      noInfo: true
    }
  });
};

