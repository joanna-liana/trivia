module.exports = function (wallaby) {
  return {
    files: [
      'src/**/*.ts'
    ],

    tests: [
      'tests/**/*.test.ts'
    ],

    testFramework: 'mocha',

    compilers: {
      '**/*.ts': wallaby.compilers.typeScript({
        "esModuleInterop": true
      })
    },

    env: {
      type: 'node'
    },
  };
};
