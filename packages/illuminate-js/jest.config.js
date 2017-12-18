module.exports = {
    rootDir: __dirname,
    testMatch: ['**/?(*.)(spec|test).ts?(x)'],
    moduleFileExtensions: ['ts', 'tsx', 'js'],
    roots: ['<rootDir>/src'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    collectCoverageFrom: ['<rootDir>/src/**/*.{ts,tsx}']
};
