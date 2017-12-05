module.exports = {
    setupFiles: ['<rootDir>/jest.setup.js'],
    testMatch: ['**/?(*.)(spec|test).ts?(x)'],
    moduleFileExtensions: ['ts', 'tsx', 'js'],
    roots: ['<rootDir>/packages'],
    transform: {
        '^.+\\.tsx?$': '<rootDir>/node_modules/ts-jest/preprocessor.js'
    },
    snapshotSerializers: ['enzyme-to-json/serializer'],
    collectCoverageFrom: ['**/src/**/*.{ts,tsx}']
};
