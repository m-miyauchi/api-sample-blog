module.exports = {
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
    },
  },
  testMatch: ['**/__tests__/*.+(ts|tsx|js)'],
  preset: 'ts-jest',
};
