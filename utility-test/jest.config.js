module.exports = {
  rootDir: '../',
  automock: false,
  globals: {
    __DEV__: true,
    __TEST__: true,
  },
  testURL: 'http://localhost/',
  testPathIgnorePatterns: [
    '/node_modules/',
  ],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.jsx?$', // __test__ folder or end with spec or test
  transform: {
    '^.+\\.(js|jsx)$': '<rootDir>/node_modules/babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(auth0-js)/)'
    // '<rootDir>/node_modules'
  ],
  moduleFileExtensions: ['js', 'json', 'jsx'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
        '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|scss|less)$': '<rootDir>/__mocks__/styleMock.js'
  },
  setupTestFrameworkScriptFile: '<rootDir>/utility-test/setup/setupTests.js',
  snapshotSerializers: ['enzyme-to-json/serializer'],
  // testEnvironment: 'node',
  unmockedModulePathPatterns: [
    'react',
    'expect',
    'immutable',
    'auth0-js',
  ],
  collectCoverage: true, // This will slow down test when run
  coverageDirectory: 'coverage', // Covearge is the default
  reporters: ['default', [
    'jest-junit', {
      suiteName: 'jest tests',
      output: 'artifacts/junit.xml',
      classNameTemplate: '{classname} - {title}',
      titleTemplate: '{classname} - {title}',
      ancestorSeparator: ' > ',
      usePathForSuiteName: 'true'
    }
  ]],
};
