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
    "no-unused-vars": 1, // 3 errors
    "consistent-return": 1, // 8 errors
    "import/no-dynamic-require": 1, // 1 error
    "comma-dangle": ["error", "never"]
  }
}  