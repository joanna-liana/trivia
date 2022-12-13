module.exports = function (wallaby) {
  return {
    files: [
      'src/**/*.ts'
    ],

    tests: [
      'tests/**/*.test.ts'
    ],

    testFramework: 'mocha',

    env: {
      type: 'node'
    },
  };
};
