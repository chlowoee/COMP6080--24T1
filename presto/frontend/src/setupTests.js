import '@testing-library/jest-dom';

module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  },
  setupFilesAfterEnv: [
    './jest.setup.js'
  ]
};
