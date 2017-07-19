module.exports = {
  "extends": [
    "airbnb-base"
  ],
  "env": {
    "shelljs": true,
    "node": true
  },
  "rules": {
    // TODO: change these rules to errors and fix codebase
    "prefer-const": 1, // 4 errors
    "no-unused-vars": 1, // 3 errors
    "no-use-before-define": 1, // 7 errors
    "one-var": 1, // 8 errors
    "consistent-return": 1, // 8 errors
    "no-param-reassign": 1, // 2 errors
    "global-require": 1, // 2 errors
    "import/no-dynamic-require": 1 // 1 error
  }
}  