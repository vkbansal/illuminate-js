module.exports = {
    rootDir: __dirname,
    setupFiles: ['<rootDir>/jest.setup.js'],
    testMatch: ['**/?(*.)(spec|test).ts?(x)'],
    moduleFileExtensions: ['ts', 'tsx', 'js'],
    roots: ['<rootDir>/src'],
    transform: {
        '^.+\\.tsx?$': '<rootDir>/node_modules/ts-jest/preprocessor.js'
    },
    snapshotSerializers: ['enzyme-to-json/serializer'],
    collectCoverageFrom: ['**/src/**/*.{ts,tsx}']
};
