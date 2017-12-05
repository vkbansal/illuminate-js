module.exports = {
    rootDir: __dirname,
    testMatch: ['**/?(*.)(spec|test).ts?(x)'],
    moduleFileExtensions: ['ts', 'tsx', 'js'],
    roots: ['<rootDir>/src'],
    transform: {
        '^.+\\.tsx?$': '<rootDir>/node_modules/ts-jest/preprocessor.js'
    },
    collectCoverageFrom: ['<rootDir>/src/**/*.{ts,tsx}']
};
