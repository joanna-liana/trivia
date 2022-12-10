module.exports = function () {
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
