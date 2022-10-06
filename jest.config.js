module.exports = {
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/index.js',
    '!**/serviceWorker.js',
    '!src/tests/fixtures/*.js',
  ],
  setupFilesAfterEnv: [
    '<rootDir>/src/setupTests.js',
  ],
  moduleNameMapper: {
    '\\.svg': '<rootDir>/src/__mocks__/svgrMock.js',
  },
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  moduleDirectories: ['node_modules', 'src'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  verbose: true,
};
