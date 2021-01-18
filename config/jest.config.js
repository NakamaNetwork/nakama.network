const { join } = require('path');

module.exports = {
  collectCoverageFrom: ['src/**/*.(ts|tsx)'],
  coveragePathIgnorePatterns: ['__(.+?)__'],
  rootDir: process.cwd(),
  roots: ['<rootDir>/src'],
  verbose: true,
  testMatch: ['**/__tests__/**/*.test.[jt]s?(x)'],
  transform: {
    '.ts(x)?$': 'babel-jest'
  },
  moduleFileExtensions: ['js', 'json', 'ts', 'tsx'],
  testEnvironment: 'node'
};
