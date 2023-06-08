module.exports = {
  collectCoverageFrom: ['src/**/*.(ts|tsx)'],
  coveragePathIgnorePatterns: ['__(.+?)__'],
  verbose: true,
  testMatch: ['**/__tests__/**/*.test.[jt]s?(x)'],
  transform: {
    '.ts(x)?$': 'babel-jest'
  },
  moduleFileExtensions: ['js', 'json', 'ts', 'tsx'],
  testEnvironment: 'node'
};
