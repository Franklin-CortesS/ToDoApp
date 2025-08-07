module.exports = function (config) {
  config.set({
    browserDisconnectTimeout: 60000,
    browserDisconnectTolerance: 3,
    captureTimeout: 120000,
    browserNoActivityTimeout: 120000,
    basePath: '',
    frameworks: ['jasmine'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-coverage-istanbul-reporter'),
      require('karma-jasmine-html-reporter'),
      require('karma-junit-reporter'),
      require('karma-coverage'),
      require('karma-typescript'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    preprocessors: {
      'src/**/*.ts': ['coverage']
    },
    client: {
      jasmine: {
      },
      clearContext: false
    },
    jasmineHtmlReporter: {
      suppressAll: true
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/app'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'lcov' },
        { type: 'text' }
      ]
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, './coverage/'),
      reports: ['html', 'lcovonly', 'text-summary', 'cobertura', 'clover'],
      fixWebpackSourcePaths: true,
      thresholds: {
        global: {
          statements: 85
        }
      },
    },
    junitReporter: {
      outputDir: './coverage',
      outputFile: 'junit-report.xml',
      useBrowserName: false
    },
    reporters: ['progress', 'coverage', 'junit', 'coverage-istanbul', 'kjhtml'],
    files: [
      'src/test.ts'
    ],
    browsers: ['ChromeHeadless'],
    autoWatch: true,
    singleRun: true,
    restartOnFileChange: true
  });
};
