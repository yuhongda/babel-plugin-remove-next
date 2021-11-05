module.exports = {
  collectCoverageFrom: ['<rootDir>/packages/babel-plugin-removable-mock/src/**/*.{js,jsx,ts,tsx}'],
  testMatch: ['<rootDir>/packages/babel-plugin-removable-mock/**/__test__/**/*.(spec|test).{js,jsx,ts,tsx}'],
  // testEnvironment: 'enzyme',
  // setupFiles: ['<rootDir>/__test__/setup.js'],
  // setupFilesAfterEnv: ['<rootDir>/node_modules/jest-enzyme/lib/index.js'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx|mjs)$': ['<rootDir>/node_modules/babel-jest', { configFile: './__test__/jest.babelrc' }],
    '^.+\\.m\\.(less|scss)$': '<rootDir>/node_modules/jest-css-modules-transform',
    '^.+\\.(css|less|scss)$': '<rootDir>/__test__/cssTransform.js',
    '^(?!.*\\.(js|jsx|ts|tsx|css|less|scss|json)$)': '<rootDir>/__test__/fileTransform.js'
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!lodash-es/).+(js|jsx|ts|tsx|mjs)$'],
  coverageDirectory: '<rootDir>/__test__/coverage',
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx']
};
