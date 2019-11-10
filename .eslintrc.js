module.exports = {
  "extends": [
    "airbnb-base"
  ],
  "env": {
    "shelljs": true,
    "jest": true,
    "node": true
  },
  "parserOptions": {
       "sourceType": "script"
    },
  "rules": {
    // TODO: change these rules to errors and fix codebase
    "prefer-const": "error", // 4 errors
    "no-unused-vars": "error", // 3 errors
    "no-use-before-define": "error", // 7 errors
    "one-var": "error", // 8 errors
    "consistent-return": "error", // 8 errors
    "no-param-reassign": "error", // 2 errors
    "global-require": "error", // 2 errors
    "import/no-dynamic-require": 1, // 1 error
    "comma-dangle": ["error", "never"]
  }
}  