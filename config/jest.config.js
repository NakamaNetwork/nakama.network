const { join } = require('path');

module.exports = {
  collectCoverageFrom: ['src/**/*.(ts|tsx)'],
  coveragePathIgnorePatterns: ['__(.+?)__'],
  rootDir: process.cwd(),
  verbose: true,
  transform: {
    '.ts(x)?$': 'babel-jest'
  },
  moduleFileExtensions: ['js', 'json', 'ts', 'tsx'],
  testEnvironment: 'node'
};
