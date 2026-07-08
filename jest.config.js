const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset({
  tsconfig: {
    module: 'commonjs',
    moduleResolution: 'node',
    esModuleInterop: true,
    strict: false,
    types: [
      "jest"
    ]
  },
}).transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
  moduleNameMapper: { '^(\\.{1,2}/.*)\\.js$': '$1', },
  setupFiles: ['<rootDir>/jest.setup.js'],
  /**
   * Just in case if the clearTestState() method is broken after an update of Realm
   * We can uncomment the line below to force the exit of the tests
   */
  // forceExit: true,
};
