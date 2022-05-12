const nxPreset = require('@nrwl/jest/preset').default;

module.exports = {
  ...nxPreset,
  moduleNameMapper: {
    '^lodash-es$': 'lodash',
  },
};
